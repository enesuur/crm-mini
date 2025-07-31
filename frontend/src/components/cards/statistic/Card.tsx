import React from "react";
import styles from "./styles.module.css";

interface CardProps {
  title?: string;
  count: number;
  icon?: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  title = "Toplam Kullanıcı",
  count,
  icon,
  className = "",
}) => {
  return (
    <div className={`${styles.card} ${className}`}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <div>
        <p className={styles.title}>{title}</p>
        <p className={styles.count}>{count.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default Card;
