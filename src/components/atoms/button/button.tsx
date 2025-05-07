import { TouchableOpacity } from 'react-native';
import { CustomText } from '../text/text';

const variantClasses = {
  primary: 'bg-blue-500',
  secondary: 'bg-gray-200',
};

const sizeClasses = {
  lg: 'py-3 px-6',
  md: 'py-2 px-4',
};

type ButtonProps = React.ComponentProps<typeof TouchableOpacity> & {
  variant?: 'primary' | 'secondary';
  size?: 'lg' | 'md';
  title: string;
};

export const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  title, 
  className = '', 
  ...props 
}: ButtonProps) => {
  const classes = `rounded-lg ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  return (
    <TouchableOpacity className={classes} {...props}>
      <CustomText variant="button" size={size === 'lg' ? 'lg' : 'base'}>
        {title}
      </CustomText>
    </TouchableOpacity>
  );
};