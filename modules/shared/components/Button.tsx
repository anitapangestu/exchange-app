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
  type: 'PRIMARY' | 'DESTRUCTIVE';
  style?: ViewStyle | Array<ViewStyle | undefined>;
  textStyle?: TextStyle;
  onPress: () => void;
}) {
  const buttonColor = type === 'PRIMARY' ? Token.color.uiBluePrimary : Token.color.uiRedSecondary;

  return (
    <Pressable style={({ pressed }) => [
      styles.button, 
      { backgroundColor: buttonColor },
      pressed && { opacity: 0.8 },
      style]} 
      onPress={onPress}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
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