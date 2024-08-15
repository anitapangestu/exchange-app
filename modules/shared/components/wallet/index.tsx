import Token from "@/constants/Token";
import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { UserContext } from "../../userContext";

export default function Wallet() {
  const { wallet } = useContext(UserContext);

  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <Text>{'Wallet (USD)'}</Text>
        <Text>{`${wallet.USD} USD`}</Text>
      </View>
      <View style={styles.row}>
        <Text>{'Wallet (BTC)'}</Text>
        <Text>{`${wallet.BTC} BTC`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: Token.spacing.m,
    gap: Token.spacing.xs,
    backgroundColor: Token.color.uiBlueLight,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});