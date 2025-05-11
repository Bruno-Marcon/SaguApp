import { getToken } from "../../storage/secureToken";
import Constants from "expo-constants";
import { getStudentById } from "../studentes/studentsServices";

const apiUrl = Constants.expoConfig?.extra?.apiUrl;
const apiKey = Constants.expoConfig?.extra?.apiKey;

export interface Occurrence {
  id: string;
  type: string;
  attributes: {
    title: string;
    description: string;
    status: string;
    severity: string;
    kind?: string;
    created_at: string;
  };
  relationships: {
    student: {
      data: {
        id: string;
      };
    };
  };
}

export interface OccurrencePayload {
  id: string;
  title: string;
  description: string;
  kind: string;
  severity: string;
  status: string;
  student_id: string;
  responsible_id: string;
}

export const getOccurrences = async (): Promise<Occurrence[]> => {
  try {
    const authToken = await getToken();
    if (!authToken) throw new Error("Token de autenticação não encontrado.");

    const response = await fetch(`${apiUrl}/api/v1/occurrencies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
        "X-API-KEY": apiKey,
      },
    });

    const data = await response.json();
    const allOccurrences = data.data;

    if (!Array.isArray(allOccurrences) || allOccurrences.length === 0) {
      throw new Error("Nenhuma ocorrência encontrada.");
    }

    const lastThree = await Promise.all(
      allOccurrences
        .sort(
          (a: any, b: any) =>
            new Date(b.attributes.created_at).getTime() - new Date(a.attributes.created_at).getTime()
        )
        .slice(0, 5)
        .map(async (item: any) => {
          const studentId = item.relationships.student.data.id;
          const student = await getStudentById(studentId);

          return {
            id: item.id,
            type: item.type,
            attributes: {
              title: item.attributes.title,
              description: item.attributes.description,
              status: item.attributes.status,
              severity: item.attributes.severity,
              created_at: item.attributes.created_at,
            },
            relationships: {
              student: {
                data: {
                  id: studentId,
                },
              },
            },
          };
        })
    );

    return lastThree;
  } catch (error) {
    console.error("Erro ao buscar dados da ocorrência:", error);
    throw new Error("Erro ao buscar dados da ocorrência");
  }
};

export const getOccurrencesByStudentId = async (
  studentId: string
): Promise<Occurrence[]> => {
  try {
    const authToken = await getToken();
    if (!authToken) throw new Error("Token de autenticação não encontrado.");

    const response = await fetch(
      `${apiUrl}/api/v1/occurrencies?filter[student_id]=${studentId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
          "X-API-KEY": apiKey,
        },
      }
    );

    const data = await response.json();
    const occurrences = data.data;

    if (!Array.isArray(occurrences)) return [];

    const result = await Promise.all(
      occurrences.map(async (item: any) => {
        const studentId = item.relationships.student.data.id;
        const student = await getStudentById(studentId);

        return {
          id: item.id,
          type: item.type,
          attributes: {
            title: item.attributes.title,
            description: item.attributes.description,
            kind: item.attributes.kind ?? null,
            severity: item.attributes.severity,
            status: item.attributes.status,
            created_at: item.attributes.created_at,
          },
          relationships: {
            student: item.relationships.student,
            relator: item.relationships.relator,
            responsible: item.relationships.responsible,
            events: item.relationships.events,
          },
        };
      })
    );

    return result;
  } catch (error) {
    console.error("Erro ao buscar ocorrências por aluno:", error);
    throw new Error("Erro ao buscar ocorrências por aluno");
  }
};

export const getOccurrenceById = async (id: string): Promise<Occurrence> => {
  try {
    const authToken = await getToken();
    if (!authToken) throw new Error("Token de autenticação não encontrado.");

    const response = await fetch(`${apiUrl}/api/v1/occurrencies/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
        "X-API-KEY": apiKey,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erro ao buscar ocorrência por ID:", errorData);
      throw new Error("Erro ao buscar ocorrência");
    }

    const data = await response.json();
    const item = data.data;

    return {
      id: item.id,
      type: item.type,
      attributes: {
        title: item.attributes.title,
        description: item.attributes.description,
        kind: item.attributes.kind ?? null,
        severity: item.attributes.severity,
        status: item.attributes.status,
        created_at: item.attributes.created_at,
      },
      relationships: item.relationships,
    };
  } catch (error) {
    console.error("Erro ao buscar ocorrência por ID:", error);
    throw error;
  }
};

export const createOccurrence = async (
  payload: OccurrencePayload
): Promise<void> => {
  try {
    const authToken = await getToken();
    if (!authToken) throw new Error("Token de autenticação não encontrado.");

    const response = await fetch(`${apiUrl}/api/v1/occurrencies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
        "X-API-KEY": apiKey,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erro ao criar ocorrência:", errorData);
      throw new Error("Erro ao criar ocorrência");
    }
  } catch (error) {
    console.error("Erro ao criar ocorrência:", error);
    throw error;
  }
};

export const updateOccurrence = async (
  id: string,
  payload: {
    responsible_id?: string;
    status?: string;
    kind?: string;
    severity?: string;
  }
): Promise<void> => {
  try {
    const authToken = await getToken();
    if (!authToken) throw new Error("Token de autenticação não encontrado.");

    const response = await fetch(`${apiUrl}/api/v1/occurrencies/${id}_responsible`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
        "X-API-KEY": apiKey,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erro ao atualizar ocorrência:", errorData);
      throw new Error("Erro ao atualizar ocorrência");
    }
  } catch (error) {
    console.error("Erro ao atualizar ocorrência:", error);
    throw error;
  }
};
