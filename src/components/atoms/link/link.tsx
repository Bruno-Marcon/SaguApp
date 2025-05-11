import { Pressable } from "react-native"
import { SubTitle } from "../../atoms/subtitle/subtitle"

type LinkProps = {
  text?: string
  className?: string
}

export default function Links({
  text = "Esqueceu sua senha?",
  className = "text-sm text-gray-500",
}: LinkProps) {
  return (
    <Pressable className="mt-4 items-center mb-6">
      <SubTitle text={text} className={className} />
    </Pressable>
  )
}
