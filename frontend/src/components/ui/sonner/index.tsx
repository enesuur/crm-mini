import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from "./styles.module.css";

interface ISonnerProps {
  isOpen: boolean;
  message: string;
  title: string;
  onClose: () => void;
  type?: "success" | "alert" | "danger" | "warn" | "default";
  position?:
    | "bottom-center"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "top-left"
    | "top-right";
}

const Sonner: React.FC<ISonnerProps> = ({
  isOpen,
  message,
  onClose,
  title,
  position = "bottom-center",
  type = "default",
}) => {
  const [visible, setVisible] = useState<boolean>(isOpen);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleClose = useCallback(() => {
    setVisible(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(handleClose, 3500);
    } else {
      setVisible(false);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isOpen, handleClose]);

  if (!visible) return null;

  const positionClass = styles[position] || "";
  const typeClass = styles[type] || "";

  return (
    <div className={`${styles.sonnerBox} ${positionClass} ${typeClass}`}>
      <p className={styles.messageBox}>
        <span className={styles.titleText}>{title}</span>{" "}
        <span className={styles.messageText}>{message}</span>
      </p>
    </div>
  );
};

export default React.memo(Sonner);
