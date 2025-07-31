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

export const registerSchema = z
  .object({
    email: z
      .string()
      .trim()
      .nonempty("E-posta zorunludur!")
      .email("Geçerli bir e-posta adresi giriniz!")
      .min(5, "E-posta en az 5 karakter olmalıdır!")
      .max(100, "E-posta en fazla 100 karakter olabilir!"),
    password: z
      .string()
      .trim()
      .nonempty("Şifre zorunludur!")
      .min(6, "Şifre en az 6 karakter olmalıdır!")
      .max(64, "Şifre en fazla 64 karakter olabilir!"),
    confirmPassword: z.string().nonempty("Şifre tekrarı zorunludur!"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Şifreler eşleşmiyor!",
    path: ["confirmPassword"],
  });

type IRegisterFormData = z.infer<typeof registerSchema>;

interface IRegisterForm {
  containerClassname?: string;
  containerStyle?: React.CSSProperties;
  innerContainerClassname?: string;
  innerContainerStyle?: React.CSSProperties;
}

const RegisterForm: React.FC<IRegisterForm> = ({
  containerClassname,
  containerStyle,
  innerContainerClassname,
  innerContainerStyle,
}) => {
  const { control, handleSubmit, reset, formState } =
    useForm<IRegisterFormData>({
      resolver: zodResolver(registerSchema),
      mode: "all",
      defaultValues: {
        email: "",
        password: "",
        confirmPassword: "",
      },
    });

  const { errors, isSubmitting } = formState;
  const { showToast } = useToast();
  const router = useRouter();

  const registerMutation = useMutation({
    mutationFn: async (data: IRegisterFormData) => {
      const { password, email } = data;
      const response = await remoteInstance.post(ENDPOINTS.auth.register, {
        email,
        password,
      });
      return response;
    },
    onSuccess: () => {
      showToast(
        "Başarılı",
        "Kayıt işlemi başarılı! Panele yönlendiriliyorsunuz."
      );
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
      reset();
    },
    onError: (error) => {
      showToast(
        "Hata",
        error?.message || "Bir hata oluştu. Lütfen tekrar deneyiniz."
      );
    },
  });

  const onSubmit = (data: IRegisterFormData) => {
    registerMutation.mutate(data);
  };

  return (
    <div className={clsx(containerClassname)} style={containerStyle}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={clsx(styles.formBox, innerContainerClassname)}
        style={innerContainerStyle}
      >
        <h1 className={styles.authTitle}>Kayıt Ol</h1>
        <p className={styles.authSubtitle}>
          Yeni bir hesap oluşturmak için bilgilerinizi giriniz.
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

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <InpPassword
              {...field}
              label="Şifre Tekrar"
              placeholder="Şifrenizi tekrar giriniz."
              error={errors.confirmPassword?.message}
            />
          )}
        />

        <Button
          type="submit"
          text={isSubmitting ? "Kayıt Olunuyor..." : "Kayıt Ol"}
          isLoading={isSubmitting}
          disabled={isSubmitting}
          className={styles.btnSubmit}
        />

        <Divider text="veya" />
        <div className={styles.formFooter}>
          <span>Zaten hesabınız var mı?</span>
          <Link href={"/login"} className="link">
            {" "}
            Giriş yapmak için
          </Link>
        </div>
      </form>
    </div>
  );
};

export default React.memo(RegisterForm);
