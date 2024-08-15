import Token from "@/constants/Token";
import { View, StyleSheet, Text } from "react-native";
import { format } from "date-fns";

import type { ITransaction } from "../shared/static-data/types";

export default function Card({
  timestamp,
  fromSymbol,
  toSymbol,
  fromValue,
  toValue,
  status,
}: ITransaction) {
  const statusColor = status === 'OPEN' ? Token.color.uiBluePrimary : Token.color.uiDarkSecondary;

  return (
    <View style={styles.wrapper}>
      <View>
        <Text style={[styles.secondary, styles.leftContainer]}>{format(timestamp, 'dd/MM/yyyy')}</Text>
        <Text>{`${fromSymbol} -> ${toSymbol}`}</Text>
      </View>
      <View>
        <Text style={[styles.secondary, styles.rightContainer]}>{`${fromValue} ${fromSymbol}`}</Text>
        <Text style={styles.rightContainer}>{`${toValue} ${toSymbol}`}</Text>
        <Text style={[styles.secondary, styles.rightContainer, { color: statusColor }]}>{status}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: Token.spacing.m,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Token.color.uiLightStain,
    borderRadius: 4,
  },
  secondary: {
    fontSize: Token.fontSize.tiny,
    color: Token.color.uiDarkSecondary,
  },
  leftContainer: { textAlign: 'left' },
  rightContainer: { textAlign: 'right' },
});
