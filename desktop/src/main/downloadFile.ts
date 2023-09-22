import * as wget from "wget-improved";
import { spawn } from "child_process";
import which from "which";
import invariant from "../common/invariant";

type Downloader = (
  url: string,
  outputPath: string,
  progress?: (percent: number) => unknown,
) => Promise<void>;

const NodeDownloader: Downloader = async function NodeDownloader(
  url,
  outputPath,
  progressCB,
) {
  console.log("Using node downloader");
  const download = wget.download(url, outputPath, {
    // @ts-expect-error typings wrong, `download` does accept this
    gunzip: true,
  });

  if (progressCB) {
    download.on("progress", (progress: number) => {
      progressCB(progress * 100);
    });
  }
  await new Promise<void>((resolve, reject) => {
    download.on("error", reject);
    download.on("end", resolve);
  });
};

let curlPath: string | null;

const CurlDownloader: Downloader = async function CurlDownloader(
  url,
  outputPath,
  progressCB,
) {
  invariant(curlPath, "no curl path");
  console.log("Using curl downloader");
  const proc = spawn(curlPath, ["-f", "--compressed", "-o", outputPath, url]);
  if (progressCB) {
    let buf = "";
    proc.stderr.on("data", (data) => {
      buf += data.toString();
      if (buf.includes("\r")) {
        const split = buf.split("\r");
        const last = split.pop();
        if (last) {
          buf = last;
        }
        for (const line of split) {
          const parts = line.replace(/\s+/g, " ").split(" ");
          /*
            % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                    Dload  Upload   Total   Spent    Left  Speed
          */
          if (parts[1] === "%") {
            continue;
          }
          progressCB(parseFloat(parts[1]));
        }
      }
    });
  }
  await new Promise<void>((resolve, reject) => {
    proc.on("error", reject);
    proc.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`curl exited with code ${code}`));
      }
    });
  });
};

export async function downloadFile(
  url: string,
  outputPath: string,
  progress?: (percent: number) => unknown,
) {
  curlPath = await which(process.platform === "win32" ? "curl.exe" : "curl", {
    nothrow: true,
  });
  const downloader = curlPath ? CurlDownloader : NodeDownloader;
  await downloader(url, outputPath, progress);
}
