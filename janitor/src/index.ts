import "dotenv-flow/config";
import { Server } from "node:http";
import { registry } from "./metrics";
import { tickPeriodicJobs } from "./jobSchedules";

let periodicJobTimeout: NodeJS.Timeout | null = null;

async function doTick() {
  await tickPeriodicJobs();
  periodicJobTimeout = setTimeout(doTick, 60 * 1000);
}

async function main() {
  const httpServer = new Server(async (req, res) => {
    const url = new URL(`http://${process.env.HOST ?? "localhost"}${req.url}`);
    switch (url.pathname) {
      case "/":
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Hello from Badger Janitor!");
        break;
      case "/metrics": {
        res.writeHead(200, { "Content-Type": registry.contentType });
        const metrics = await registry.metrics();
        res.end(metrics);
        break;
      }
      default:
        res.writeHead(404);
        res.end("Not found");
    }
  });
  const host = process.env.HOST ?? "localhost";
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;
  httpServer.listen(port, host, () => {
    console.log(`Server listening on http://${host}:${port}`);
  });
  await doTick();
}

main();
