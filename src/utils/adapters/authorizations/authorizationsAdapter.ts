import { Authorization } from '@//services/authorizations/authorizationsService'
import { AuthorizationItem } from '../../../../types/authorizations'

export const mapAuthorizationToItem = (authorization: Authorization): AuthorizationItem => {
  return {
    title: authorization.attributes.description,
    description: authorization.attributes.status || 'Sem status',
    createdAt: authorization.attributes.created_at,
    status: authorization.attributes.status || undefined, 
    category: 'Autorização',
    iconName: 'check-circle',
    iconColor: '#16a34a',
    borderColor: '#d1fae5',
    studentId: authorization.relationships.student.data.id,
    authorName: '',
  }
}
