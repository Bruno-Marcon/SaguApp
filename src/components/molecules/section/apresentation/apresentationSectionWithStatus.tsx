import { View } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { PrimaryTitle } from '@//components/atoms/title/primaryTitle';
import StatusCard from '@//components/organisms/card/card';
import Animated, { FadeInUp } from 'react-native-reanimated';

interface StatusCardItem {
  iconName: React.ComponentProps<typeof Feather>['name'];
  title: string;
  subtitle: string;
  iconColor?: string;
}

interface ApresentationSectionProps {
  name: string;
  subtitle: string;
  statusCards: ReadonlyArray<StatusCardItem>;
  containerClassName?: string;
  backgroundClassName?: string;
}

export const ApresentationSection = ({
  name,
  subtitle,
  statusCards,
  containerClassName = 'px-5 pt-6 pb-4',
  backgroundClassName = 'bg-[#0E7C4A]',
}: ApresentationSectionProps) => {
  return (
    <View className={`${containerClassName} ${backgroundClassName} rounded-b-3xl`}>
      <PrimaryTitle
        name={name}
        subtitle={subtitle}
        className="text-xl font-bold text-white"
        subtitleClassName="text-sm text-emerald-100"
      />

      <View className="flex-row justify-between gap-x-3 mt-5">
        {statusCards.map((card, index) => (
          <Animated.View
            key={`status-card-${index}`}
            entering={FadeInUp.duration(400).delay(index * 100)}
          >
            <StatusCard
              icon={
                <Feather name={card.iconName} size={20} color={card.iconColor || '#16A34A'} />
              }
              title={card.title}
              subtitle={card.subtitle}
            />
          </Animated.View>
        ))}
      </View>
    </View>
  );
};
