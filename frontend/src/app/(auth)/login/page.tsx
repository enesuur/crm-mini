import React from "react";
import clsx from "@/lib/cn";
import LoginForm from "../_forms/login-form";
import type { Metadata } from "next";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Login | Mini CRM",
  description: "A simple mini CRM project built with Next.js 13+",
  keywords: "login,authenticate,CRM, customers, contacts, sales, management",
};

const LoginPage = () => {
  return (
    <section>
      <div className={clsx("container")}>
        <LoginForm />
      </div>
    </section>
  );
};

export default LoginPage;
