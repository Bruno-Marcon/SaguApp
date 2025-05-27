import React from 'react';
import { Text, TextProps, useColorScheme } from 'react-native';

type Props = TextProps & {
  variant?: 'title' | 'subtitle' | 'body';
  className?: string;
};

export const TextAtom = ({ variant = 'body', className, ...props }: Props) => {
  const theme = useColorScheme();
  const isDark = theme === 'dark';

  const baseStyle = {
    title: `${isDark ? 'text-white' : 'text-black'} text-xl font-bold`,
    subtitle: `${isDark ? 'text-green-400' : 'text-green-600'} text-lg`,
    body: `${isDark ? 'text-gray-200' : 'text-gray-800'} text-base`,
  };

  return (
    <Text
      className={`${baseStyle[variant]} ${className ?? ''}`}
      {...props}
    />
  );
};
