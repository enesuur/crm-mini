"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui";
import Textarea from "@/components/ui/input/textarea";
import { ICustomer } from "@/types/global";
import { useToast } from "@/providers/SonnerProvider";
import { useMutation } from "@tanstack/react-query";
import ENDPOINTS from "@/http/endpoints";
import { remoteInstance } from "@/http/axios";
import styles from "./styles.module.css";

const noteSchema = z.object({
  note: z
    .string()
    .min(1, "Not boş olamaz")
    .max(500, "Not 500 karakterden fazla olamaz."),
  date: z.string().min(1, "Tarih seçilmelidir"),
});

type NoteFormValues = z.infer<typeof noteSchema>;

interface INoteModalProps {
  isOpen: boolean;
  customer: ICustomer | null;
  setCustomers: React.Dispatch<React.SetStateAction<ICustomer[]>>;
  onClose: () => void;
}

const NoteModal = ({
  isOpen,
  onClose,
  customer,
  setCustomers,
}: INoteModalProps) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const defaultValues = React.useMemo(
    () => ({
      note: customer?.note ? customer.note : "",
      date: customer?.date
        ? new Date(customer.date).toISOString().split("T")[0]
        : "",
    }),
    [customer]
  );
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema),
    defaultValues,
  });

  const { showToast } = useToast();

  const { mutate } = useMutation({
    mutationFn: async (data: NoteFormValues) => {
      if (!customer) throw new Error("Müşteri bilgisi yok");

      if (isDeleting) {
        const response = await remoteInstance.delete(
          ENDPOINTS.customer.postCustomerNote(customer._id)
        );
        return response.data;
      } else {
        const response = await remoteInstance.post(
          ENDPOINTS.customer.postCustomerNote(customer._id),
          {
            note: data.note,
            date: data.date,
          }
        );
        return response.data;
      }
    },
    onSuccess: (data) => {
      showToast("Başarılı", "İşlem başarılı");
      if (isDeleting) {
        reset();
      }
      setCustomers((prev) =>
        prev.map((item) => {
          if (!customer || !data) return item;
          if (item._id !== customer._id) return item;
          return {
            ...item,
            ...(typeof data.note !== "undefined" ? { note: data.note } : {}),
            ...(typeof data.date !== "undefined" ? { date: data.date } : {}),
          };
        })
      );

      setIsDeleting(false);
      onClose();
    },
    onError: () => {
      showToast("Hata", isDeleting ? "Not silinemedi." : "Not kaydedilemedi.");
      setIsDeleting(false);
    },
  });

  const onSubmit = (data: NoteFormValues) => {
    mutate(data);
  };

  React.useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Not Ekle</h2>
          <button onClick={onClose} className={styles.btnClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Controller
            name="note"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                label="Not"
                error={errors.note?.message}
                rows={4}
                className={styles.textArea}
              />
            )}
          />

          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <div className={styles.inputGroup}>
                <label htmlFor="note-date" className={styles.label}>
                  Tarih
                </label>
                {errors.date && (
                  <p className={styles.error}>{errors.date.message}</p>
                )}
                <input
                  id="note-date"
                  type="date"
                  className={styles.dateInput}
                  {...field}
                />
              </div>
            )}
          />

          <div className={styles.btnContainer}>
            <Button type="submit" text="Kaydet" disabled={isSubmitting}>
              Kaydet
            </Button>
            <Button
              type="submit"
              variant="danger"
              text="Sil"
              disabled={isSubmitting}
              onClick={() => {
                setIsDeleting(true);
              }}
            >
              Sil
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
