"use client";
import React, { useReducer, useCallback } from "react";
import { Eye, EyeOff } from "lucide-react";
import styles from "./styles.module.css";

interface InpPasswordProps {
  label: string;
  name: string;
  placeholder: string;
  error?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

type State = {
  isVisible: boolean;
};

type Action = { type: "TOGGLE_VISIBILITY" };

const passwordReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "TOGGLE_VISIBILITY":
      return { ...state, isVisible: !state.isVisible };
    default:
      return state;
  }
};

const InpPassword: React.FC<InpPasswordProps> = ({
  label,
  name,
  placeholder,
  error,
  value,
  onChange,
}) => {
  const [state, dispatch] = useReducer(passwordReducer, { isVisible: false });

  const toggleVisibility = useCallback(() => {
    dispatch({ type: "TOGGLE_VISIBILITY" });
  }, []);

  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      {error && (
        <div className={styles.errorContainer}>
          <span>{error}</span>
        </div>
      )}
      <div className={styles.inputContainer}>
        <input
          id={name}
          name={name}
          type={state.isVisible ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${styles.input} ${error ? styles.inputError : ""}`}
          required
        />
        <span className={styles.eyeBtn} onClick={toggleVisibility}>
          {state.isVisible ? <EyeOff /> : <Eye />}
        </span>
      </div>
    </div>
  );
};

export default InpPassword;
