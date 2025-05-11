import { getUserInfo } from "@//storage/SecureUser"
import { useEffect, useState } from "react"
import { Avatar } from "react-native-elements"

const getRandomColor = () => {
  const letters = "0123456789ABCDEF"
  let color = "#"
  for (let i = 0;i < 6 ;i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

type Props = {
  size?: number
  onPress?: () => void
}

const InitialsAvatar = ({ size = 40, onPress }: Props) => {
  const [name, setName] = useState<string | null>(null)
  const [bgColor, setBgColor] = useState<string>(getRandomColor())
  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getUserInfo()
      if (userInfo) {
        setName(userInfo.name)
      }
    }
    fetchUserInfo()
  }, [])

  const getInitials = (name: string): string => {
    const names = name.trim().split(" ")
    const initials = names.length >= 2
      ? names[0][0] + names[names.length - 1][0]
      : names[0][0]
    return initials.toUpperCase()
  }

  return (
    <Avatar
      rounded
      size={size}
      title={name ? getInitials(name) : ""}
      containerStyle={{ backgroundColor: bgColor }}
      onPress={onPress}
      icon={{ name: 'person', type: 'ionicon', color: 'white' }} 
    />
  )
}

export default InitialsAvatar
