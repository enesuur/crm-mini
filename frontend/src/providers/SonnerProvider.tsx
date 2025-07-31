"use client";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import Sonner from "@/components/ui/sonner";

interface ISonnerToast {
  isOpen: boolean;
  title: string;
  message: string;
}

interface ISonnerContext {
  showToast: (title: string, message: string) => void;
}

const ToastContext = createContext<ISonnerContext | undefined>(undefined);

export const useToast = (): ISonnerContext => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a SonnerProvider");
  }
  return context;
};

export const SonnerProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ISonnerToast>({
    isOpen: false,
    title: "",
    message: "",
  });

  const showToast = useCallback((title: string, message: string) => {
    setToast({ isOpen: true, title, message });
  }, []);

  const onClose = useCallback(() => {
    setToast((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Sonner
        isOpen={toast.isOpen}
        title={toast.title}
        message={toast.message}
        onClose={onClose}
      />
    </ToastContext.Provider>
  );
};
