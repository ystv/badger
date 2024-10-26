import { ReactNode } from "react";
import type { PreflightTask } from "../main/preflight";
import { useAppSelector } from "./state";

function PreflightShell(props: { status: string; tasks: PreflightTask[] }) {
  return (
    <div className="absolute bg-primary-4 w-full h-full m-0 p-0">
      <div className="w-144 h-24 m-auto p-8">
        <h1 className="text-5xl text-light">🦡 Badger</h1>
        <div className="m-2 p-4 bg-light text-dark rounded">
          {props.status}
          {props.tasks.map((task) => (
            <div key={task.name}>
              {task.status === "success"
                ? "✅"
                : task.status === "error"
                  ? "❌"
                  : "⏳"}
              &nbsp;{task.name}
              {task.error && <div className="text-red-500">{task.error}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PreflightGate(props: { children: ReactNode }) {
  const state = useAppSelector((state) => state?.preflight);
  // If we have no state at all, we're still loading
  if (!state || Object.keys(state).length === 0) {
    return (
      <PreflightShell
        status="Badger is starting up, please wait..."
        tasks={[]}
      />
    );
  }

  if (!state.done) {
    return (
      <PreflightShell
        status="Badger is starting up, please wait..."
        tasks={state.tasks}
      />
    );
  }
  return props.children;
}
