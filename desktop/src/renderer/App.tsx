import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ipcClient, ipc } from "./ipc";
import { Suspense, useState } from "react";
import ConnectAndSelectShowGate from "./ConnectAndSelectShowGate";
import MainScreen from "./MainScreen";
import { Provider } from "react-redux";
import { store } from "./state";
import { PreflightGate } from "./PreflightGate";

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <ipc.Provider client={ipcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PreflightGate>
            <ConnectAndSelectShowGate>
              <Suspense fallback={<div>Loading...</div>}>
                <MainScreen />
              </Suspense>
            </ConnectAndSelectShowGate>
          </PreflightGate>
        </Provider>
      </QueryClientProvider>
    </ipc.Provider>
  );
}
