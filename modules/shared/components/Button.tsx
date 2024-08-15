import Token from "@/constants/Token";
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

export default function Button({
  title,
  type = 'PRIMARY',
  style,
  textStyle,
  onPress,
}: {
  title: string;
  type: 'PRIMARY' | 'DESTRUCTIVE' | 'OUTLINE';
  style?: ViewStyle | Array<ViewStyle | undefined>;
  textStyle?: TextStyle;
  onPress: () => void;
}) {
  let buttonColor;
  switch (type) {
    case 'PRIMARY':
      buttonColor = Token.color.uiBluePrimary;
      break;
    case 'OUTLINE':
      buttonColor = 'transparent';
      break;
    default:
      buttonColor = Token.color.uiRedSecondary;
      break;
  }
  const textColor = type === 'OUTLINE' ? Token.color.uiBluePrimary : Token.color.uiLightPrimary;
  
  return (
    <Pressable style={({ pressed }) => [
      styles.button, 
      { backgroundColor: buttonColor },
      pressed && { opacity: 0.8 },
      style]} 
      onPress={onPress}
    >
      <Text style={[
        styles.text,
        { color: textColor },
        textStyle
      ]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Token.spacing.xs,
    paddingHorizontal: Token.spacing.l,
    borderRadius: 4,
  },
  text: {
    fontSize: Token.fontSize.medium,
    fontWeight: Token.fontWeight.medium,
    color: Token.color.uiLightPrimary,
  },
});