"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from "react";
import AlertModal from "@/components/modals/alert";

interface AlertState {
  isOpen: boolean;
  title: string;
  text: string;
  callBack: (confirmed: boolean) => void;
}

interface IAlertContext {
  showAlert: (
    title: string,
    text: string,
    callBack: (confirmed: boolean) => void
  ) => void;
}

const AlertContext = createContext<IAlertContext | undefined>(undefined);

export const useAlert = (): IAlertContext => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alertState, setAlertState] = useState<AlertState | null>(null);

  const showAlert = useCallback(
    (title: string, text: string, callBack: (confirmed: boolean) => void) => {
      setAlertState({
        isOpen: true,
        title,
        text,
        callBack,
      });
    },
    []
  );

  const handleClose = useCallback(() => {
    setAlertState((prev) => prev && { ...prev, isOpen: false });
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alertState && (
        <AlertModal
          isOpen={alertState.isOpen}
          onClose={handleClose}
          callBack={alertState.callBack}
          title={alertState.title}
          text={alertState.text}
        />
      )}
    </AlertContext.Provider>
  );
};
