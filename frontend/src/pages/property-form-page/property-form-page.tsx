import { PropertyForm } from "../../features/property-form/property-form";

export const PropertyFormPage = () => {
  return (
    <div className="form-card">
      <div className="form-header">
        <h2>Добавить Объявление</h2>
        <p>Заполните параметры объекта недвижимости</p>
      </div>
      <PropertyForm />
    </div>
  );
};
