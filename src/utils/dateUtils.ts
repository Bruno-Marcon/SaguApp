import { format } from "date-fns";

export const formatDate = (dateInput: string | Date): string => {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  
  if (isNaN(date.getTime())) {
    console.warn("Invalid date provided to formatDate:", dateInput);
    return "Data inválida";
  }

  return format(date, "dd/MM/yyyy HH:mm");
};