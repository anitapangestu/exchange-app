import Token from "@/constants/Token";
import { View, StyleSheet, Text, TextInput } from "react-native";

export default function TradeForm({
  price,
  vol,
  setPrice,
  setVol,
}: {
  price: string;
  vol: string;
  setPrice: (price: string) => void;
  setVol: (vol: string) => void;
}) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <Text style={styles.label}>{'Price'}</Text>
        <TextInput
          style={styles.input}
          placeholder={'Price'}
          inputMode={'numeric'}
          keyboardType={'number-pad'}
          value={price}
          onChangeText={setPrice}
        />
        <Text>{'USD'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>{'Amount'}</Text>
        <TextInput
          style={styles.input}
          placeholder={'Amount'}
          inputMode={'numeric'}
          keyboardType={'number-pad'}
          value={vol}
          onChangeText={setVol}
        />
        <Text>{'BTC'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: Token.spacing.m
  },
  row: {
    flexDirection: 'row',
    gap: Token.spacing.m,
    alignItems: 'center',
  },
  label: { flex: 1 },
  input: { 
    flex: 3,
    minHeight: 40,
    borderBottomColor: Token.color.uiLightSecondary,
    borderBottomWidth: 1,
  }
});