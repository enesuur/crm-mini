import React from "react";
import { Pencil, StickyNote, Trash2 } from "lucide-react";
import { truncateWithTrail } from "@/helpers";
import styles from "./styles.module.css";

interface ICustomerCardProps {
  _id: string;
  name: string;
  email: string;
  tag: string;
  phone: string;
  note?: string;
  onEdit?: () => void;
  onNote?: () => void;
  onDelete?: () => void;
}

const getTagClass = (tag: string) => {
  switch (tag) {
    case "Yüksek Öncelikli":
      return styles.highPriority;
    case "Öncelikli":
      return styles.mediumPriority;
    case "Normal":
      return styles.lowPriority;
    default:
      return styles.defaultPriority;
  }
};

const CustomerCard: React.FC<ICustomerCardProps> = ({
  name,
  email,
  phone,
  note,
  tag,
  onEdit,
  onNote,
  onDelete,
}) => {
  return (
    <div className={styles.cardBox}>
      <div className={styles.info}>
        <div className={styles.row}>
          <span className={styles.label}>Ad:</span>
          <span className={styles.value}>{truncateWithTrail(name, 25)}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Mail:</span>
          <span className={styles.value}>{truncateWithTrail(email, 20)}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Telefon:</span>
          <span className={styles.value}>{truncateWithTrail(phone, 25)}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Etiket:</span>
          <span className={`${styles.value} ${getTagClass(tag)}`}>
            {truncateWithTrail(tag, 25)}
          </span>
        </div>

        {note && (
          <div className={styles.noteRow}>
            <StickyNote size={16} />
            <span className={styles.noteText}>
              {truncateWithTrail(note, 50)}
            </span>
          </div>
        )}
      </div>
      <div className={styles.actionsBox}>
        <div
          className={styles.btnIcon}
          role="button"
          onClick={onEdit}
          title="Müşteriyi düzenle"
          aria-label="Müşteriyi düzenle"
        >
          <Pencil size={18} />
        </div>
        <div
          className={styles.btnIcon}
          role="button"
          onClick={onNote}
          title={note ? "Notu Sil" : "Not Ekle"}
          aria-label={note ? "Notu Sil" : "Not Ekle"}
        >
          <StickyNote size={18} />
        </div>
        <div
          className={styles.btnIcon}
          role="button"
          onClick={onDelete}
          title="Müşteriyi sil"
          aria-label="Müşteriyi sil"
        >
          <Trash2 size={18} />
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;
