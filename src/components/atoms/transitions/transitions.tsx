import React from 'react';
import { Text, Button } from 'react-native';
import Animated, { withSpring } from 'react-native-reanimated';

interface AnimatedViewProps {
  animation: any;
  layoutClasses: string;
  children: React.ReactNode;
}

const AnimatedView: React.FC<AnimatedViewProps> = ({ animation, layoutClasses, children }) => {
  return (
    <Animated.View
      style={{ transform: [{ translateX: animation }] }}
      className={layoutClasses}
    >
      {children}
    </Animated.View>
  );
};

const SlideScreen = () => {
  const slideIn = withSpring(0, { damping: 2, stiffness: 100 });

  return (
    <AnimatedView 
      animation={slideIn}
      layoutClasses="flex-1 justify-center items-center"
    >
      <Text className="text-xl mb-4">Esta tela tem uma animação de slide!</Text>
    </AnimatedView>
  );
};

export default SlideScreen;
