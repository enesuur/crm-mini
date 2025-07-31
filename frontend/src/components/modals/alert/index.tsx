"use client";
import React, { useCallback } from "react";
import Button from "@/components/ui/button";
import { ICON_STYLES } from "@/helpers";
import { X, TriangleAlert } from "lucide-react";
import styles from "./styles.module.css";

interface IAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  callBack: (confirmed: boolean) => void;
  title: string;
  text: string;
}

const AlertModal: React.FC<IAlertModalProps> = ({
  isOpen,
  onClose,
  callBack,
  title,
  text,
}) => {
  const handleDecision = useCallback(
    (confirmed: boolean) => {
      callBack(confirmed);
      onClose();
    },
    [callBack, onClose]
  );

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>
            <TriangleAlert {...ICON_STYLES} />
            {title}
          </h2>
          <X
            onClick={() => handleDecision(false)}
            className={styles.btnClose}
            role="button"
            aria-label="Close the dialog "
          />
        </div>
        <div className={styles.modalBody}>
          <h3>{text}</h3>
          <div className={styles.btnContainer}>
            <Button
              text="Tamam"
              onClick={() => handleDecision(true)}
              aria-label="Confirm action"
            />
            <Button
              text="İptal"
              variant="danger"
              onClick={() => handleDecision(false)}
              aria-label="Deny Action"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AlertModal);
