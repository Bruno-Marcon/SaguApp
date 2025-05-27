import React from 'react';
import { Text, TextProps } from 'react-native';

type Props = TextProps & {
  variant?: 'title' | 'subtitle' | 'body';
  className?: string;
};

export const TextAtom = ({ variant = 'body', className, ...props }: Props) => {
  const baseStyle = {
    title: 'text-white text-xl font-bold',
    subtitle: 'text-green-500 text-lg',
    body: 'text-white text-base',
  };

  return <Text className={`${baseStyle[variant]} ${className ?? ''}`} {...props} />;
};
