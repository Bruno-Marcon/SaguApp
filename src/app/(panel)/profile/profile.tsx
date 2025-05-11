import { ProfileTemplate } from "@//components/templates/profile/profileTemplate"
import { useUserProfile } from "@//hook/useUserProfile"
import { renderErrorState, renderLoadingState, validateUserData } from "@//utils/profileUtils"


export default function ProfileScreen() {
  const { userData, loading, error } = useUserProfile()

  if (loading) return renderLoadingState()
  if (error) return renderErrorState(error)
  if (!validateUserData(userData)) return renderErrorState('Dados inválidos')

  return (
    <ProfileTemplate 
      name={userData!.name} 
      email={userData!.email} 
    />
  )
}