import Token from "@/constants/Token";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import Wallet from "../shared/components/wallet";
import Card from "./Card";
import { useContext, useState } from "react";
import Button from "../shared/components/Button";
import { UserContext } from "../shared/userContext";

type TTrade = 'BUY' | 'SELL';

export default function History() {
  const [activeTab, setActiveTab] = useState<TTrade>('BUY');
  const { buyHistory, sellHistory } = useContext(UserContext);

  const list = activeTab === 'BUY' ? buyHistory : sellHistory;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.header}>{'History Page'}</Text>
      <View style={styles.container}>
        <Wallet />
        <View style={styles.content}>
          <View style={styles.tabContainer}>
            <Button
              style={[styles.tab, activeTab === 'BUY' ? styles.activeTab : undefined]}
              textStyle={styles.tabLabel}
              title={'Buy History'}
              type={'PRIMARY'}
              onPress={() => setActiveTab('BUY')} 
            />
            <Button
              style={[styles.tab, activeTab === 'SELL' ? styles.activeTab : undefined]}
              textStyle={styles.tabLabel}
              title={'Sell History'}
              type={'DESTRUCTIVE'}
              onPress={() => setActiveTab('SELL')}
            />
          </View>
          <ScrollView contentContainerStyle={styles.scrollView}>
            {list.map((history) => 
              <Card
                key={history.id}
                {...history}
              />
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Token.color.uiLightPrimary
  },
  scrollView: {
    flexGrow: 1,
    gap: Token.spacing.s,
    paddingHorizontal: Token.spacing.m,
    paddingBottom: Token.spacing.xl,
  },
  container: { flex: 1 },
  header: {
    fontSize: Token.fontSize.large,
    fontWeight: Token.fontWeight.bold,
    paddingVertical: Token.spacing.xs,
    paddingHorizontal: Token.spacing.m,
    borderBottomColor: Token.color.uiLightSecondary,
    borderBottomWidth: 1,
  },
  content: { flex: 1 },
  tabContainer: { 
    flexDirection: 'row',
    marginVertical: Token.spacing.m 
  },
  tab: { 
    backgroundColor: 'transparent',
    flex: 1,
    borderBottomColor: 'transparent',
    borderBottomWidth: 2,
  },
  tabLabel: { color: Token.color.uiBluePrimary },
  activeTab: {
    borderBottomColor: Token.color.uiBluePrimary
  }
})