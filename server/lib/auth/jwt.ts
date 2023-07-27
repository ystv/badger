let _signingKey: CryptoKey | null = null;

async function signingKey() {
  if (_signingKey) return _signingKey;
  return (_signingKey = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(process.env.JWT_SIGNING_KEY!),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  ));
}

function stringToUrlsafeBase64(str: string) {
  return global
    .btoa(str)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

function arrayBufferToUrlsafeBase64(buffer: ArrayBuffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return global
    .btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

function decodeUrlsafeBase64(str: string) {
  return global.atob(
    str.replace(/-/g, "+").replace(/_/g, "/").replace(/=/g, ""),
  );
}

function urlsafeBase64ToArrayBuffer(str: string) {
  const binary = global.atob(
    str.replace(/-/g, "+").replace(/_/g, "/").replace(/=/g, ""),
  );
  // @ts-ignore
  return Uint8Array.from(binary, (m) => m.codePointAt(0));
}

export async function makeJWT(claims: Record<string, unknown>) {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };
  const payload = JSON.stringify(claims);
  const headerEncoded = stringToUrlsafeBase64(JSON.stringify(header));
  const payloadEncoded = stringToUrlsafeBase64(payload);
  const data = `${headerEncoded}.${payloadEncoded}`;
  const signature = await crypto.subtle.sign(
    "HMAC",
    await signingKey(),
    new TextEncoder().encode(data),
  );
  const signatureEncoded = arrayBufferToUrlsafeBase64(signature);
  return `${data}.${signatureEncoded}`;
}

interface RequiredClaims {
  iss: string;
  exp?: boolean;
  nbf?: boolean;
}

export async function parseAndVerifyJWT(
  jwt: string,
  requiredClaims: RequiredClaims,
): Promise<Record<string, unknown>> {
  const [header, payload, signature] = jwt.split(".");
  const headerDecoded = JSON.parse(decodeUrlsafeBase64(header));
  if (headerDecoded.alg !== "HS256") {
    throw new Error("Invalid algorithm");
  }
  const payloadDecoded = JSON.parse(decodeUrlsafeBase64(payload));
  const signatureDecoded = urlsafeBase64ToArrayBuffer(signature);
  console.log("Decode: signature:", signatureDecoded);
  const data = `${header}.${payload}`;
  console.log("Decode: data:", data);
  const signatureValid = await crypto.subtle.verify(
    "HMAC",
    await signingKey(),
    signatureDecoded,
    new TextEncoder().encode(data),
  );
  if (!signatureValid) {
    throw new Error("Invalid signature");
  }
  if (payloadDecoded.iss !== requiredClaims.iss) {
    throw new Error("Invalid issuer");
  }
  if (requiredClaims.exp !== false) {
    const now = Math.floor(Date.now() / 1000);
    if (typeof payloadDecoded.exp !== "number" || payloadDecoded.exp < now) {
      throw new Error("Token expired");
    }
  }
  if (requiredClaims.nbf !== false) {
    const now = Math.floor(Date.now() / 1000);
    if (typeof payloadDecoded.nbf !== "number" || payloadDecoded.nbf > now) {
      throw new Error("Token not yet valid");
    }
  }
  return payloadDecoded;
}
