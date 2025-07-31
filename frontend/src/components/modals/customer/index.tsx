import React, { useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, InpText, InpMail } from "@/components/ui";
import Checkbox from "@/components/ui/input/checkbox";
import { ICustomer } from "@/types/global";
import { useMutation } from "@tanstack/react-query";
import { remoteInstance } from "@/http/axios";
import ENDPOINTS from "@/http/endpoints";
import { useToast } from "@/providers/SonnerProvider";
import styles from "./styles.module.css";

const TAG_VALUES = [
  { label: "Yüksek Öncelikli", value: "Yüksek Öncelikli" },
  { label: "Öncelikli", value: "Öncelikli" },
  { label: "Normal", value: "Normal" },
] as const;

const TAG_ENUM_VALUES = TAG_VALUES.map((tag) => tag.value);

const customerSchema = z.object({
  name: z
    .string()
    .min(2, "Ad en az 2 karakter olmalı")
    .max(30, "Ad en fazla 30 karakter olabilir"),
  email: z
    .string()
    .email("Geçerli bir e-posta girin")
    .max(254, "E-posta çok uzun"),
  phone: z
    .string()
    .min(10, "Telefon numarası en az 10 karakter olmalı")
    .max(11, "Telefon numarası maksimum 11 karakter olabilir")
    .regex(/^\d+$/, "Telefon numarası sadece rakamlardan oluşmalı"),
  tag: z.string().refine((val) => TAG_ENUM_VALUES.includes(val), {
    message: "Lütfen geçerli bir etiket seçiniz",
  }),
});

type CustomerFormData = z.infer<typeof customerSchema>;

interface CustomerModalProps {
  customer?: ICustomer | null;
  setCustomers: React.Dispatch<React.SetStateAction<ICustomer[]>>;
  isOpen: boolean;
  onClose: () => void;
}

const CustomerModal: React.FC<CustomerModalProps> = ({
  isOpen,
  onClose,
  customer,
  setCustomers,
}) => {
  const { showToast } = useToast();

  const defaultValues = React.useMemo(
    () => ({
      name: customer?.name ?? "",
      email: customer?.email ?? "",
      phone: customer?.phone ?? "",
      tag: customer?.tag ?? "",
    }),
    [customer]
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues,
  });

  const customerMutation = useMutation({
    mutationFn: async (data: CustomerFormData) => {
      if (customer?._id) {
        const response = await remoteInstance.post(
          ENDPOINTS.customer.postAddCustomer,
          {
            _id: customer._id,
            ...data,
          }
        );
        return response.data;
      } else {
        const response = await remoteInstance.post(
          ENDPOINTS.customer.postAddCustomer,
          data
        );
        return response.data;
      }
    },
    onSuccess: (newOrUpdatedCustomer: ICustomer) => {
      showToast("Başarılı", "Müşteri başarıyla kaydedildi.");
      reset();

      if (customer?._id) {
        setCustomers((prev) =>
          prev.map((c) =>
            c._id === newOrUpdatedCustomer._id ? newOrUpdatedCustomer : c
          )
        );
      } else {
        setCustomers((prev) => [...prev, newOrUpdatedCustomer]);
      }

      onClose();
    },
    onError: (error: Error) => {
      console.error("Hata:", error);
      showToast("Hata", error.message);
    },
  });

  const onSubmit = (data: CustomerFormData) => {
    customerMutation.mutate(data);
  };

  React.useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const handleCancel = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>{customer ? "Müşteri Düzenle" : "Müşteri Ekle"}</h2>
          <div
            role="button"
            onClick={handleCancel}
            className={styles.btnClose}
            aria-label="Kapat"
          >
            X
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.formContainer}
          noValidate
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <InpText {...field} label="Ad" error={errors.name?.message} />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <InpMail
                {...field}
                label="E-posta"
                error={errors.email?.message}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => {
              const handleChange = (val: string) => {
                const onlyDigits = val.replace(/\D/g, "");
                field.onChange(onlyDigits);
              };
              return (
                <InpText
                  {...field}
                  label="Telefon"
                  inputMode="numeric"
                  maxLength={15}
                  error={errors.phone?.message}
                  onChange={handleChange}
                  value={field.value}
                />
              );
            }}
          />

          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>Etiket</label>
            {errors.tag && (
              <p className={styles.errorMessage}>{errors.tag.message}</p>
            )}
            {TAG_VALUES.map(({ label, value }) => (
              <Controller
                key={value}
                name="tag"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    label={label}
                    checked={field.value === value}
                    onChange={() => field.onChange(value)}
                  />
                )}
              />
            ))}
          </div>

          <div className={styles.btnContainer}>
            <Button type="submit" text="Kaydet" disabled={isSubmitting} />
            <Button text="Vazgeç" variant="danger" onClick={handleCancel} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(CustomerModal);
