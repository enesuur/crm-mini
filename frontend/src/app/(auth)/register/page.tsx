import React from "react";
import clsx from "@/lib/cn";
import RegisterForm from "../_forms/register-form";
import type { Metadata } from "next";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Register | Mini CRM",
  description: "A simple mini CRM project built with Next.js 13+",
  keywords: "register, signup, CRM, customers, contacts, sales, management",
};

const RegisterPage = () => {
  return (
    <section>
      <div className={clsx("container")}>
        <RegisterForm />
      </div>
    </section>
  );
};

export default RegisterPage;
