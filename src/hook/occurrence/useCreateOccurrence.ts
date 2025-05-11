import { createOccurrence, OccurrencePayload } from "@//services/occurrence/occurrenceService";
import { useState } from "react";

export const useCreateOccurrence = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (payload: OccurrencePayload) => {
    setLoading(true);
    setError(null);

    try {
      await createOccurrence(payload);
    } catch (err) {
      console.error("Erro ao criar ocorrência:", err);
      setError("Erro ao criar ocorrência");
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
};