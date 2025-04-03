import { Image } from "react-native";

export default function LogoIFC({ className = "w-20 h-20" }) {
  return (
    <Image
      source={require("../../../assets/images/logo-ifc.png")}
      className={`${className}`}
      resizeMode="contain"
    />
  );
}
