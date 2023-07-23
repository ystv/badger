import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ipcClient, ipc } from "./ipc";
import { Suspense, useState } from "react";
import ConnectAndSelectShowGate from "./ConnectAndSelectShowGate";
import MainScreen from "./MainScreen";

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <ipc.Provider client={ipcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ConnectAndSelectShowGate>
          <Suspense fallback={<div>Loading...</div>}>
            <MainScreen />
          </Suspense>
        </ConnectAndSelectShowGate>
      </QueryClientProvider>
    </ipc.Provider>
  );
}
