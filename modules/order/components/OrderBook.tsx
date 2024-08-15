import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import useOrderBook from "../useOrderBook";
import Token from "@/constants/Token";
import OrderColumn from "./OrderColumn";

export default function OrderBook() {
  const { askBook, bidBook, isLoading, isError } = useOrderBook();

  if (isLoading) {
    return <ActivityIndicator size={'large'} style={styles.wrapper} />;
  }

  if (isError) {
    return (
      <View style={[styles.wrapper, styles.errorContainer]}>
        <Text>{'There was an error fetching the order book'}</Text>
      </View>
    )
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{'BID'}</Text>
        <Text style={styles.title}>{'ASK'}</Text>
      </View>
      <View style={styles.content}>
        <OrderColumn book={bidBook} type={'BID'} style={styles.column} />
        <OrderColumn book={askBook} type={'ASK'} style={styles.column} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    minHeight: 200,
  },
  content: {
    gap: 10,
    flexDirection: 'row',
  },
  titleContainer: {
    flexDirection: 'row',
    marginBottom: Token.spacing.xs,
  },
  title: { 
    flex: 1, 
    textAlign: 'center',
    fontSize: Token.fontSize.small,
    fontWeight: Token.fontWeight.medium,
  },
  column: { flex: 1 },
  errorContainer: {
    backgroundColor: Token.color.uiLightStain,
    borderRadius: 4,
  },
});