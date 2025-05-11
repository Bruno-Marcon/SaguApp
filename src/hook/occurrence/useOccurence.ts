import { getOccurrences, Occurrence } from "@//services/occurrence/occurrenceService";
import { useEffect, useState } from "react";

export const useOccurrence = () => {
  const [occurrences, setOccurrences] = useState<Occurrence[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOccurrences();
        setOccurrences(data);
      } catch (err) {
        setError("Erro ao carregar as ocorrências");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { occurrences, loading, error };
};
