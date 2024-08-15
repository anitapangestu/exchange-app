import { View, Text, StyleSheet, ActivityIndicator, ViewStyle } from "react-native";
import useTicker from "./useTicker";
import Token from "@/constants/Token";

export default function Ticker({ style }: { style?: ViewStyle }) {
  const { ticker, isLoading } = useTicker();

  if (isLoading) {
    return <ActivityIndicator style={[styles.wrapper, style]} />;
  }

  let color = Token.color.uiGreenSecondary;
  if (ticker?.dailyChangePercentage && ticker.dailyChangePercentage < 0) {
    color = Token.color.uiRedPrimary;
  }

  const percentage = ticker?.dailyChangePercentage && Math.abs(ticker.dailyChangePercentage * 100).toFixed(2) || 0;

  return (
    <View style={[styles.wrapper, style]}>
      <Text style={styles.symbol}>{'BTC/USD'}</Text>
      <View style={styles.container}>
        <Text style={[styles.lastPrice, { color }]}>{ticker?.lastPrice}</Text>
        {
          ticker?.dailyChangePercentage &&
          <Text style={[styles.symbol, , { color }]}>{`${percentage} %`}</Text>
        }
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    minHeight: 50,
    marginTop: Token.spacing.m,
    zIndex: 10,
  },
  symbol: {
    fontSize: 12,
    color: 'gray',
  },
  lastPrice: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  }
});