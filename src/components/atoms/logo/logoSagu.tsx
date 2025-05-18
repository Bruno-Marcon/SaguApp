import { Image, ImageProps, ImageSourcePropType } from "react-native"

type LogoIFCProps = {
  className?: string
  source?: ImageSourcePropType
} & Partial<ImageProps>

export default function LogoSagu({
  className = "w-20 h-20",
  source,
  ...rest
}: LogoIFCProps) {
  return (
    <Image
      source={source ?? require("../../../assets/images/logo-sagu-mobile-brancoBg.png")}
      className={className}
      resizeMode="contain"
      {...rest}
    />
  )
}
