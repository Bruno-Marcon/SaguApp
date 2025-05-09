import { TouchableOpacity } from 'react-native';
import { CustomText } from '../text/text';

const variantClasses = {
  primary: 'bg-green-500',
  secondary: 'bg-gray-100',
};

const sizeClasses = {
  lg: 'py-3 px-6',
  md: 'py-2 px-4',
};

type ButtonProps = React.ComponentProps<typeof TouchableOpacity> & {
  variant?: 'primary' | 'secondary';
  size?: 'lg' | 'md';
  title: string;
  onPress: () => void;
};

export const Button = ({
  variant = 'primary',
  size = 'md',
  title,
  onPress,
  className = '',
  ...props
}: ButtonProps) => {
  const classes = `rounded-lg ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <TouchableOpacity
      className={classes}
      {...props}
      onPress={onPress}
    >
      <CustomText variant="button" size={size === 'lg' ? 'lg' : 'base'}>
        {title}
      </CustomText>
    </TouchableOpacity>
  );
};
