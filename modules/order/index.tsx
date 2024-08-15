import { useContext, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import OrderBook from "./components/OrderBook";
import Token from "@/constants/Token";
import Ticker from "../shared/components/ticker";
import Wallet from "../shared/components/wallet";
import Button from "../shared/components/Button";
import TradeForm from "./components/TradeForm";
import { UserContext } from "../shared/userContext";

export default function Order() {
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const { wallet, setBuyHistory, setSellHistory, setWallet } = useContext(UserContext);

  const resetForm = () => {
    setPrice('');
    setAmount('');
  }

  const isValid = () => {
    return price !== '' && amount !== '';
  }

  const handleBuy = () => {
    if (!isValid()) {
      Alert.alert('Failed', 'Please input price and amount');
      return;
    }

    const totalPrice = wallet.USD - (parseFloat(price) * parseFloat(amount))

    if (totalPrice < 0) {
      Alert.alert('Failed', 'Balance not enough');
      return;
    }

    setBuyHistory(prevHistory => {
      return [
        {
          id: Math.random(),
          fromValue: parseFloat(price),
          toValue: parseFloat(amount),
          type: 'BUY',
          timestamp: new Date().getTime(),
          status: 'OPEN',
          toSymbol: 'BTC',
          fromSymbol: 'USD',

        },
        ...prevHistory,
      ]
    })

    setWallet(prevWallet => {
      return {
        ...prevWallet,
        USD: totalPrice,
      }
    })

    resetForm();
    Alert.alert('Success', 'Your order has been placed');
  }

  const handleSell = () => {
    if (!isValid()) {
      Alert.alert('Failed', 'Please input price and amount');
      return;
    }

    const totalPrice = wallet.BTC -  parseFloat(amount);

    if (totalPrice < 0) {
      Alert.alert('Failed', 'Balance not enough');
      return;
    }

    setSellHistory(prevHistory => {
      return [
        {
          id: Math.random(),
          toValue: parseFloat(price),
          fromValue: parseFloat(amount),
          type: 'SELL',
          timestamp: new Date().getTime(),
          status: 'OPEN',
          toSymbol: 'USD',
          fromSymbol: 'BTC',

        },
        ...prevHistory,
      ]
    });

    setWallet(prevWallet => {
      return {
        ...prevWallet,
        BTC: totalPrice,
      }
    })

    resetForm();
    Alert.alert('Success', 'Your order has been placed');
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <Ticker style={styles.padding} />
        <Wallet />
        <View style={styles.padding}>
          <TradeForm
            price={price}
            vol={amount} 
            setPrice={setPrice}
            setVol={setAmount}
          />
        </View>
        <View style={styles.bookContainer}>
          <View style={styles.bookContent}>
            <OrderBook />
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Button type={'PRIMARY'} style={styles.button} title={'Buy'} onPress={handleBuy} />
        <Button type={'DESTRUCTIVE'} style={styles.button} title={'Sell'} onPress={handleSell} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { 
    flex: 1,
    backgroundColor: Token.color.uiLightPrimary
  },
  container: {
    flexGrow: 1,
    paddingBottom: Token.spacing.l,
  },
  bookContainer: {
    backgroundColor: Token.color.uiLightStain,
    paddingTop: Token.spacing.m,
    marginTop: Token.spacing.m,
  },
  bookContent: { 
    backgroundColor: Token.color.uiLightPrimary,
    padding: Token.spacing.m,
  },
  footer: {
    paddingHorizontal: Token.spacing.m,
    paddingVertical: Token.spacing.s,
    flexDirection: 'row',
    gap: Token.spacing.m,
    borderTopColor: Token.color.uiLightNeutral,
    borderTopWidth: 1,
  },
  button: { flex: 1 },
  padding: { paddingHorizontal: Token.spacing.m },
})
