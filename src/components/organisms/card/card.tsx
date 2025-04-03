import { View,Text, Image } from "react-native";
import SubTitleSemiBold from "../../atoms/subtitle/subtitleSemiBold";
import CounterCard from "../../molecules/counterCard/counterCard";
import { SubTitle } from "../../atoms/subtitle/subtitle";

type CountItem = {
    count: string
    label: string
    colorClass?: string
    countClassName?: string
    labelClassName?:string
}

type CountCardProps = {
    title: string
    number:string
    info: string
    className?: string
    counts: CountItem[]
}

const CountCard: React.FC<CountCardProps> = ({
title,
number,
info,
counts,
className,
}) => {
    return(
        <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
            <SubTitleSemiBold text={title}/>
            
            <View className="flex-row justify-between items-center">
                {counts.map((item, index) =>
                    <CounterCard
                    key={index}
                    count={item.count}
                    label={item.label}
                    colorClass={item.colorClass}
                    countClassName={item.countClassName}
                    labelClassName={item.labelClassName}
                    className= {className}
                    />
                )}
              
              <View className="items-center justify-center w-14 h-14 rounded-full bg-green-100">
                <SubTitleSemiBold text={number}/>
              </View>
            </View>
            <SubTitle text={info} className='text-sm mt-4'/>
          </View>
    )
}

export default CountCard