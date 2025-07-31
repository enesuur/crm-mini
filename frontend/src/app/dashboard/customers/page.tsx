"use client";
import React, { useState, useMemo } from "react";
import CustomerCard from "@/components/cards/customer/CustomerCard";
import { Button } from "@/components/ui";
import { Plus } from "lucide-react";
// import { mockCustomer } from "./_data/index";  // MOCK DATA
import CustomerModal from "@/components/modals/customer";
import NoteModal from "@/components/modals/note";
import useDebounce from "@/hooks/use-debounce";
import { ICustomer } from "@/types/global";
import { useGetCustomer } from "./hooks/useGetCustomers";
import Spinner from "@/components/ui/spinner";
import { useToast } from "@/providers/SonnerProvider";
import { useAlert } from "@/providers/AlertProvider";
import styles from "./_styles/page.module.css";
import { useMutation } from "@tanstack/react-query";
import { remoteInstance } from "@/http/axios";
import ENDPOINTS from "@/http/endpoints";

const TAG_VALUES = [
  { label: "Tümü", value: "Tümü" },
  { label: "Yüksek Öncelikli", value: "Yüksek Öncelikli" },
  { label: "Öncelikli", value: "Öncelikli" },
  { label: "Normal", value: "Normal" },
];

const Page = () => {
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("Tümü");
  const { data: fetchedCustomers = [], isLoading, error } = useGetCustomer();
  const [customers, setCustomers] = useState<ICustomer[]>(fetchedCustomers);

  const { showToast } = useToast();
  const { showAlert } = useAlert();

  const debouncedSearchTerm = useDebounce(searchTerm, 400);
  const filteredCustomer = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        customer.name
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase()) ||
        customer.tag.toLowerCase().includes(debouncedSearchTerm.toLowerCase());

      const matchesTag = selectedTag === "Tümü" || customer.tag === selectedTag;

      return matchesSearch && matchesTag;
    });
  }, [customers, debouncedSearchTerm, selectedTag]);

  const deleteCustomerMutation = useMutation({
    mutationFn: async (customerId: string) => {
      const response = await remoteInstance.delete(
        ENDPOINTS.customer.deleteCustomerById(customerId)
      );
      return response.data;
    },
    onSuccess: (_, customerId) => {
      showToast("Başarılı", "Müşteri başarıyla silindi.");
      setCustomers((prev) => prev.filter((c) => c._id !== customerId));
    },
    onError: (error: Error) => {
      console.error("Silme Hatası:", error);
      showToast("Hata", error.message || "Silme işlemi başarısız oldu.");
    },
  });

  React.useEffect(() => {
    if (error) {
      showToast("Hata", error.message);
    }
  }, [error, showToast]);

  React.useEffect(() => {
    setCustomers(fetchedCustomers);
  }, [fetchedCustomers]);

  return (
    <div>
      <section>
        <Button
          text="Müşteri Ekle"
          icon={<Plus />}
          onClick={() => {
            setSelectedCustomer(null);
            setIsCustomerModalOpen(true);
          }}
        />
      </section>

      <section className={styles.filterSection}>
        <input
          type="text"
          placeholder="İsim veya etiket ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Müşteri Ara"
        />

        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          aria-label="Etiket Filtrele"
        >
          {TAG_VALUES.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </section>

      <section>
        <div>
          <h2 className={styles.title}>Müşteriler</h2>

          {isLoading ? (
            <Spinner />
          ) : filteredCustomer.length === 0 ? (
            <p className={styles.emptyMessage}>
              Hiç müşteri yok. Yeni müşteri ekleyin.
            </p>
          ) : (
            <div className={styles.userGrid}>
              {filteredCustomer.map((customer: ICustomer) => (
                <CustomerCard
                  key={customer._id}
                  _id={customer._id}
                  name={customer.name}
                  email={customer.email}
                  phone={customer.phone}
                  tag={customer.tag}
                  onEdit={() => {
                    setSelectedCustomer(customer);
                    setIsCustomerModalOpen(true);
                  }}
                  onNote={() => {
                    setSelectedCustomer(customer);
                    setIsNoteModalOpen(true);
                  }}
                  onDelete={() => {
                    showAlert(
                      "Silme Onayı",
                      "Bu müşteriyi silmek istediğinize emin misiniz?",
                      (confirmed) => {
                        if (confirmed) {
                          deleteCustomerMutation.mutate(customer._id);
                        }
                      }
                    );
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <CustomerModal
        isOpen={isCustomerModalOpen}
        onClose={() => setIsCustomerModalOpen(false)}
        setCustomers={setCustomers}
        customer={selectedCustomer}
      />

      <NoteModal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        customer={selectedCustomer}
        setCustomers={setCustomers}
      />
    </div>
  );
};

export default Page;
