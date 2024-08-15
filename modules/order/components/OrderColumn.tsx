import Token from "@/constants/Token";
import { ViewStyle, View, StyleSheet, Text } from "react-native";

import type { TBookData } from "../useOrderBook";

type TAlign = 'left' | 'center' | 'right';

export default function OrderColumn({ 
  book,
  type,
  style
}: { book: TBookData[]; type: 'ASK' | 'BID'; style: ViewStyle }) {
  let color = ['red', 'black', 'black'];
  let title = ['Price', 'Count', 'Amount'];
  let align: TAlign[] = ['right', 'center', 'left'];
  let flex = [3, 2, 4];
  let bgColor = Token.color.uiRedLight;

  if (type === 'BID') {
    color = ['black', 'black', 'black'];
    bgColor = Token.color.uiGreenLight
    align.reverse();
    flex.reverse();
    title.reverse();
  }

  return (
    <View style={[
      styles.orderContainer,
      { backgroundColor: bgColor },
      style
    ]}>
      <View style={[styles.item, styles.itemHeader]}>
        <Text style={[
          styles.orderBookLabel, 
          styles.header, 
          {
            textAlign: 'left',
            flex: flex[0],
          }
        ]}>
          {title[0]}
        </Text>
        <Text style={[
          styles.orderBookLabel,
          styles.header, 
          {
            textAlign: 'center',
            flex: flex[1],
          }
        ]}>
          {title[1]}
        </Text>
        <Text style={[
          styles.orderBookLabel,
          styles.header,
          {
            flex: flex[2],
            textAlign: 'right',
          }
        ]}>
          {title[2]}
        </Text>
      </View>
      {
        book.map(({ price, count, amount }) => {
          const label = [price, count, amount];
          if (type === 'BID') {
            label.reverse();
          }

          return (
            <View key={price} style={styles.item}>
              <Text style={[styles.orderBookLabel, {
                textAlign: 'left',
                flex: flex[0],
                color: color[0],
              }]}>{label[0]}</Text>
              <Text style={[styles.orderBookLabel, {
                textAlign: 'center',
                flex: flex[1],
                color: color[1],
              }]}>{label[1]}</Text>
              <Text style={[styles.orderBookLabel, {
                flex: flex[2],
                textAlign: 'right',
                color: color[2],
              }]}>{label[2]}</Text>
            </View>
          )
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  header: {
    fontWeight: Token.fontWeight.medium,
    fontSize: Token.fontSize.micro,
  },
  itemHeader: { marginBottom: Token.spacing.xxs },
  orderContainer: { 
    backgroundColor: Token.color.uiLightNeutral,
    padding: 10,
    borderRadius: 4,
  },
  orderBookLabel: {
    fontSize: Token.fontSize.tiny,
    justifyContent: 'space-between'
  },
});