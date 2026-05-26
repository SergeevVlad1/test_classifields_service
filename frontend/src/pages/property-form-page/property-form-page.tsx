import { PropertyForm } from "../../features/property-form";
import styles from "./property-form-page.module.scss";

export const PropertyFormPage = () => {
  return (
    <div className={styles.formCard}>
      <div className={styles.formHeader}>
        <h2>Добавить Объявление</h2>
        <p>Заполните параметры объекта недвижимости</p>
      </div>
      <PropertyForm />
    </div>
  );
};
