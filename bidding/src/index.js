import React from "react";
import { render } from "react-dom";
import App from "./App";
import { AuthProvider } from "./Auth";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </AuthProvider>
  </QueryClientProvider>,
  document.getElementById("root")
);
