import { SubTitle } from "./subtitle"
import React from "react"

type SubTitleSemiBoldProps = {
    text: string
    className?: string
}

const SubTitleSemiBold: React.FC<SubTitleSemiBoldProps> = ({text, className = 'text-lg font-semibold mb-4'}) => {
    return <SubTitle text={text} className={className}/>

}

export default SubTitleSemiBold