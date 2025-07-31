"use client";
import React from "react";
import { Mail } from "lucide-react";
import styles from "./styles.module.css";

interface IMailInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
}

const MailInput: React.FC<IMailInputProps> = ({
  label,
  name,
  type = "mail",
  placeholder = "",
  value = "",
  error = "",
  onChange,
}) => {
  return (
    <div className={styles.container}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      {error && (
        <div className={styles.errorContainer}>
          <span>{error}</span>
        </div>
      )}

      <div style={{ position: "relative" }}>
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={`${styles.input} ${error ? styles.inputError : ""}`}
        />
        <Mail className={styles.mailBox} />
      </div>
    </div>
  );
};

export default React.memo(MailInput);
