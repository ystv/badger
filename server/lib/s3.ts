import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
  throw new Error("AWS_ACCESS_KEY_ID or AWS_SECRET_ACCESS_KEY not set");
}

const client: S3Client = new S3Client({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function getPresignedURL(
  key: string,
  expiresInSeconds = 3600,
): Promise<string> {
  return getSignedUrl(
    client,
    new GetObjectCommand({
      Bucket: process.env.STORAGE_BUCKET,
      Key: key,
    }),
    {
      expiresIn: expiresInSeconds,
    },
  );
}
