import { Text } from 'react-native';

type TextProps = React.ComponentProps<typeof Text> & {
  variant?: 'primary' | 'secondary' | 'button';
  size?: 'xl' | 'lg' | 'base' | 'sm';
};

const variantClasses = {
  primary: 'text-gray-800',
  secondary: 'text-gray-500',
  button: 'text-white font-medium',
  error: ''
};

const sizeClasses = {
  xl: 'text-2xl',
  lg: 'text-lg',
  base: 'text-base',
  sm: 'text-sm',
};

export const CustomText = ({ 
  variant = 'primary', 
  size = 'base', 
  className = '', 
  ...props 
}: TextProps) => {
  const classes = `${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  return <Text className={classes} {...props} />;
};