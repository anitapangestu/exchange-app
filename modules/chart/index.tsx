import { StyleSheet, ScrollView, View } from 'react-native';
import ChartGraph from './ChartGraph';
import Ticker from '../shared/components/ticker';
import Token from '@/constants/Token';

export default function Chart () {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Ticker style={styles.paddingHorizontal} />
      <View style={styles.divider} />
      <ChartGraph />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: Token.spacing.l,
    backgroundColor: Token.color.uiLightPrimary
  },
  paddingHorizontal: { paddingHorizontal: Token.spacing.m },
  divider: { height: Token.spacing.m, backgroundColor: Token.color.uiLightStain }
});