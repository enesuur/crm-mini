"use client";
import React from "react";
import styles from "./styles.module.css";

const Topbar = () => {
  return (
    <header className={styles.headerBox}>
      <div className="container">
        <p style={{ textAlign: "center" }}>Welcome,Admin</p>
      </div>
    </header>
  );
};

export default Topbar;
