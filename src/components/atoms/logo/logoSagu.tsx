import {ImageProps, ImageSourcePropType } from "react-native"
import { Image } from 'expo-image';

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
      source={source ?? require("../../../assets/images/logo-sagu-mobile-borda-branca.png")}
      className={className}
      style={{ width: 60, height: 60}}
      contentFit="contain"
      transition={100}
    />
  )
}
