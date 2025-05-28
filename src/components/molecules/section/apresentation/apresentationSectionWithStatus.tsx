import { View } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { PrimaryTitle } from '@//components/atoms/title/primaryTitle';
import StatusCard from '@//components/organisms/card/card';
import StatusCardSkeleton from '@//components/Skeleton/statusCardSkeleton';

interface StatusCardItem {
  iconName: React.ComponentProps<typeof Feather>['name'];
  title: string;
  subtitle: string;
  iconColor?: string;
}

interface ApresentationSectionProps {
  name: string;
  subtitle: string;
  statusCards?: ReadonlyArray<StatusCardItem>; // Deixa opcional para validar ausência
  containerClassName?: string;
  backgroundClassName?: string;
  isLoading?: boolean; // Flag opcional para controlar loading
}

export const ApresentationSection = ({
  name,
  subtitle,
  statusCards = [],
  containerClassName = 'px-5 pt-6 pb-4',
  backgroundClassName = 'bg-emerald-700 dark:bg-emerald-800',
  isLoading = false,
}: ApresentationSectionProps) => {
  const renderCards = () => {
    if (isLoading || statusCards.length === 0) {
      return [...Array(3)].map((_, index) => (
        <StatusCardSkeleton key={`status-card-skeleton-${index}`} />
      ));
    }

    return statusCards.map((card, index) => (
      <StatusCard
        key={`status-card-${index}`}
        icon={
          <Feather
            name={card.iconName}
            size={20}
            color={card.iconColor || '#16A34A'}
          />
        }
        title={card.title}
        subtitle={card.subtitle}
      />
    ));
  };

  return (
    <View
      className={`${containerClassName} ${backgroundClassName} rounded-b-3xl`}
    >
      <PrimaryTitle
        name={name}
        subtitle={subtitle}
        className="text-xl font-bold text-white"
        subtitleClassName="text-sm text-emerald-100"
      />

      <View className="flex-row justify-between gap-x-3 mt-5">
        {renderCards()}
      </View>
    </View>
  );
};
