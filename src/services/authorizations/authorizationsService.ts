import { getToken } from "../../storage/secureToken"
import Constants from "expo-constants"
import { getStudentById } from "../studentes/studentsServices"

const apiUrl = Constants.expoConfig?.extra?.apiUrl
const apiKey = Constants.expoConfig?.extra?.apiKey

export interface Authorization {
  id: string
  type: string
  attributes: {
    date: string
    description: string
    status: string | null
    created_at: string
  }
  relationships: {
    student: {
      data: {
        id: string
        type: string
      }
    }
    parent: {
      data: {
        id: string
        type: string
      }
    }
  }
}

export interface AuthorizationPayload {
  id: string
  title: string
  description: string
  status: string
  student_id: string
}

export const getAuthorizations = async (limitLastFive: boolean = false): Promise<Authorization[]> => {
  try {
    const authToken = await getToken()
    if (!authToken) throw new Error("Token de autenticação não encontrado.")

    const response = await fetch(`${apiUrl}/api/v1/authorizations`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
        "X-API-KEY": apiKey,
      },
    })

    const data = await response.json()
    const allAuthorizations = data.data

    if (!Array.isArray(allAuthorizations) || allAuthorizations.length === 0) {
      throw new Error("Nenhuma autorização encontrada.")
    }

    if (limitLastFive) {
      return allAuthorizations
        .sort(
          (a: any, b: any) =>
            new Date(b.attributes.created_at).getTime() - new Date(a.attributes.created_at).getTime()
        )
        .slice(0, 5)
    }

    return allAuthorizations
  } catch (error) {
    console.error("Erro ao buscar dados de autorizações:", error)
    throw new Error("Erro ao buscar dados de autorizações")
  }
}

