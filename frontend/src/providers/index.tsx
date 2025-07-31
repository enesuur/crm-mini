"use client";
import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/redux/store";
import { SonnerProvider } from "./SonnerProvider";
import { AlertProvider } from "./AlertProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <AlertProvider>
          <SonnerProvider>{children}</SonnerProvider>
        </AlertProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
};

export default Providers;
