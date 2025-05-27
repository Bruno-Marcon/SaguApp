import { Text } from 'react-native';
import React from 'react';

type PrimaryTitleProps = {
  name: string;
  subtitle?: string;
  selectedStudent?: string;
  className?: string;
  subtitleClassName?: string;
};

export const PrimaryTitle = ({
  name,
  subtitle,
  selectedStudent,
  className = 'text-2xl font-semibold text-gray-900 dark:text-white mb-2',
  subtitleClassName = 'text-base font-normal text-gray-500 dark:text-gray-300',
}: PrimaryTitleProps) => {
  return (
    <>
      <Text className={className}>
        {name}
        {selectedStudent ? `, ${selectedStudent}!` : ''}
      </Text>
      {subtitle && <Text className={subtitleClassName}>{subtitle}</Text>}
    </>
  );
};
