import React from "react";
import Sidebar from "@/components/sidebar";
import Topbar from "@/components/topbar";
import styles from "./_styles/layout.module.css";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <main className={styles.layout}>
        <Sidebar />
        <div className={styles.dashboard}>
          <Topbar />
          {children}
        </div>
      </main>
    </React.Fragment>
  );
};

export default DashboardLayout;
