import { useCallback, useState } from "react";
import { ipc } from "../ipc";
import { Button } from "@badger/components/button";

export default function OBSDevToolsScreen() {
  const connState = ipc.obs.getConnectionState.useQuery();
  const [req, setReq] = useState("");
  const [args, setArgs] = useState("{}");
  const execute = ipc.obs.dev.callArbitrary.useMutation();
  const doExecute = useCallback(async () => {
    let argsJSON;
    try {
      argsJSON = JSON.parse(args);
    } catch (e) {
      alert("Invalid args JSON");
      return;
    }
    execute.mutate({ req, params: argsJSON });
  }, [req, args, execute]);

  return (
    <div>
      <h1 className="text-xl">OBS Dev Tools</h1>
      <div className="space-y-2">
        <label className="block border-2 p-1">
          Request
          <select
            value={req}
            onChange={(e) => setReq(e.target.value)}
            className="border-2 border-black"
          >
            {connState.data?.availableRequests
              ?.sort((a, b) => a.localeCompare(b))
              ?.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              )) || null}
          </select>
        </label>
        <label className="blockborder-2 p-1">
          Parameters (JSON)
          <textarea
            value={args}
            onChange={(e) => setArgs(e.target.value)}
            className="border-2 mx-4 my-2 p-1 block"
          />
        </label>
        <Button onClick={doExecute}>Execute</Button>
      </div>
      <div className="mt-4">
        <h2 className="text-lg">Response</h2>
        <pre className="max-w-[80%] max-h-48 overflow-y-scroll overflow-x-scroll">
          {JSON.stringify(execute.data, null, 2)}
        </pre>
      </div>
      {execute.error && (
        <div className="mt-4">
          <h2 className="text-lg text-danger-4">Error</h2>
          <pre className="max-w-[80%] max-h-48 overflow-y-scroll">
            {JSON.stringify(execute.error, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
