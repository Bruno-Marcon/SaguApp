declare module 'react-native-user-avatar' {
    import { Component } from 'react';
    import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
  
    interface Props {
      name: string;
      size?: number;
      color?: string;
      bgColor?: string;
      src?: string;
      style?: ViewStyle;
      textStyle?: TextStyle;
      imageStyle?: ImageStyle;
    }
  
    export default class UserAvatar extends Component<Props> {}
  }
  