"use client";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { remoteInstance } from "@/http/axios";
import ENDPOINTS from "@/http/endpoints";
import { Button, Divider, InpMail, InpPassword } from "@/components/ui";
import clsx from "@/lib/cn";
import { useToast } from "@/providers/SonnerProvider";
import Link from "next/link";
import styles from "../_styles/form-shared-styles.module.css";

export const signinSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty("E-posta zorunludur!")
    .email("Geçerli bir e-posta adresi giriniz!")
    .min(5, "E-posta en az 6 karakter olmalıdır!")
    .max(256, "E-posta en fazla 256 karakter olabilir!"),

  password: z
    .string()
    .trim()
    .nonempty("Şifre zorunludur!")
    .min(6, "Şifre en az 6 karakter olmalıdır!")
    .max(256, "Şifre en fazla 256 karakter olabilir!"),
});

type IFormData = z.infer<typeof signinSchema>;

interface ISigninForm {
  containerClassname?: string;
  containerStyle?: React.CSSProperties;
  innerContainerClassname?: string;
  innerContainerStyle?: React.CSSProperties;
}

const SigninForm: React.FC<ISigninForm> = ({
  containerClassname,
  containerStyle,
  innerContainerClassname,
  innerContainerStyle,
}) => {
  const { control, handleSubmit, reset, formState } = useForm<IFormData>({
    resolver: zodResolver(signinSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { errors, isSubmitting } = formState;
  const { showToast } = useToast();
  const router = useRouter();

  const signinMutation = useMutation({
    mutationFn: async (data: IFormData) => {
      return remoteInstance.post(ENDPOINTS.auth.login, data);
    },
    onSuccess: (data) => {
      showToast("Başarılı", "Panele yönlendiriliyorsunuz.");
      setTimeout(() => {
        router.push("/");
      }, 1000);
      reset();
    },
    onError: (error) => {
      console.error("Error:", error);
      showToast("Hata", error.message);
    },
  });

  const onSubmit = (data: IFormData) => {
    signinMutation.mutate(data);
  };

  return (
    <div className={clsx(containerClassname)} style={containerStyle}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={clsx(styles.formBox, innerContainerClassname)}
        style={innerContainerStyle}
      >
        <h1 className={styles.authTitle}>Hoş geldiniz!</h1>
        <p className={styles.authSubtitle}>
          Panele erişim sağlamak için lütfen kimlik bilgileriniz ile giriş
          yapınız.
        </p>

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InpMail
              {...field}
              label="Mail Adresiniz"
              placeholder="Lütfen mail adresinizi giriniz."
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <InpPassword
              {...field}
              label="Şifreniz"
              placeholder="Lütfen şifrenizi giriniz."
              error={errors.password?.message}
            />
          )}
        />

        <Button
          type="submit"
          text={isSubmitting ? "Signing in..." : "Sign In"}
          isLoading={isSubmitting}
          disabled={isSubmitting}
          className={styles.btnSubmit}
        />
        <Divider text="veya" />
        <div className={styles.formFooter}>
          <span>Hesabınız yok mu ?</span>
          <Link href={"/register"} className="link">
            {" "}
            Kayıt olmak için
          </Link>
        </div>
      </form>
    </div>
  );
};

export default React.memo(SigninForm);
