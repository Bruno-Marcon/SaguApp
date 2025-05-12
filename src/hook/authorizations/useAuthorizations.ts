// hooks/useAuthorizationsWithNames.ts
import { useEffect, useState } from 'react'
import { getAuthorizations } from '@//services/authorizations/authorizationsService'
import { mapAuthorizationToItem } from '@//utils/adapters/authorizations/authorizationsAdapter'
import { getStudentById } from '@//services/studentes/studentsServices'
import { AuthorizationItem } from '../../../types/authorizations'


export const useAuthorizationsWithNames = () => {
  const [data, setData] = useState<AuthorizationItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const rawAuthorizations = await getAuthorizations()

      const items = await Promise.all(
        rawAuthorizations.map(async (auth) => {
          const item = mapAuthorizationToItem(auth)

          const student = await getStudentById(item.studentId)

          // Transforma os dados para garantir que o status não seja null
          const transformedItem = {
            ...item,
            authorName: student.name,
            status: item.status || ''
          }

          return transformedItem
        })
      )

      setData(items)
      setLoading(false)
    }

    fetchData()
  }, [])

  return { data, loading }
}
