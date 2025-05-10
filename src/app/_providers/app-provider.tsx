"use client";
import { ThemeProvider } from "@/features/theme/theme-provider";
import { queryClient } from "@/shared/lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
// import { Provider } from "react-redux";
// import { store } from "../store";

export function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeProvider>
        {/* <Provider store={store}> */}
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
        {/* </Provider> */}
      </ThemeProvider>
    </>
  );
}
