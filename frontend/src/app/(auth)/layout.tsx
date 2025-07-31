import React from "react";
import styles from "./_styles/layout.module.css";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <main className={styles.layout}>{children}</main>
    </React.Fragment>
  );
};

export default AuthLayout;
