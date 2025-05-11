import { View } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import { PrimaryTitle } from '@//components/atoms/title/primaryTitle'
import StatusCard from '@//components/organisms/card/card'

type FeatherIconName = React.ComponentProps<typeof Feather>['name']

type StatusCardItem = {
  iconName: FeatherIconName
  title: string
  subtitle: string
  iconColor?: string
}

type ApresentationSectionProps = {
  name: string
  subtitle: string
  statusCards: ReadonlyArray<StatusCardItem>
  containerClassName?: string
  backgroundClassName?: string
}

export const ApresentationSection = ({
  name,
  subtitle,
  statusCards,
  containerClassName = 'p-7',
  backgroundClassName = 'bg-green-600'
}: ApresentationSectionProps) => {
  return (
    <View className={`${containerClassName} ${backgroundClassName}`}>
      <PrimaryTitle
        name={name}
        subtitle={subtitle}
      />

      <View className="flex-row gap-x-4 justify-center">
        {statusCards.map((card, index) => (
          <StatusCard
            key={`status-card-${index}`}
            icon={<Feather name={card.iconName} size={24} color={card.iconColor || '#16A34A'} />}
            title={card.title}
            subtitle={card.subtitle}
          />
        ))}
      </View>
    </View>
  )
}