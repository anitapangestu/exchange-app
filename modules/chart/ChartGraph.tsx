import { StyleSheet, Dimensions, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import * as echarts from 'echarts/core';
import { CandlestickChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import { SVGRenderer, SvgChart } from '@wuba/react-native-echarts';
import { useEffect, useRef, useState } from 'react';
import useChartData from './useChartData';
import Token from '@/constants/Token';
import Button from '../shared/components/Button';

echarts.use([
  SVGRenderer,
  GridComponent,
  CandlestickChart,
  LegendComponent,
  TooltipComponent
]);

const E_HEIGHT = Dimensions.get('window').height - 200;
const E_WIDTH = Dimensions.get('window').width;

export default function ChartGraph() {
  const skiaRef = useRef<any>(null);
  const chartRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { chartOptions, isError, setTimeframe } = useChartData();

  useEffect(() => {
    setIsLoading(true);
    if (skiaRef.current && chartOptions) {
      if (!chartRef.current) {
        chartRef.current = echarts.init(skiaRef.current, 'light', {
          renderer: 'svg',
          width: E_WIDTH,
          height: E_HEIGHT,
        });
        console.log('init echart');
        
      }
      setIsLoading(false);
      chartRef.current.setOption(chartOptions);
    }
  }, [chartOptions]);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        console.log('Delete Chart');
        chartRef.current.dispose();
      }
    }
  }, []);

  if (isError) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Text>{'There was an error fetching chartData'}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.chart}>
        <SvgChart ref={skiaRef} />
        <ActivityIndicator size={'large'} 
          style={[
            styles.chartLoading,
            { display: isLoading ? 'flex' : 'none' }
          ]} 
        />
      </View>
      <View style={styles.timeframePicker}>
        <Button style={styles.timeframeBtn} title={'1D'} onPress={() => setTimeframe('1D')} type={'OUTLINE'} />
        <Button style={styles.timeframeBtn} title={'1W'} onPress={() => setTimeframe('1W')} type={'OUTLINE'} />
        <Button style={styles.timeframeBtn} title={'1M'} onPress={() => setTimeframe('1M')} type={'OUTLINE'} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: E_HEIGHT,
    marginTop: - Token.spacing.l,
    marginBottom: -Token.spacing.xxxxl,
    paddingHorizontal: Token.spacing.m,
  },
  chart: {
    position: 'relative',
    minHeight: E_HEIGHT,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  errorContainer: {
    backgroundColor: '#e1e2e8',
    borderRadius: 4,
  },
  timeframePicker: {
    flexDirection: 'row',
    gap: Token.spacing.m,
    marginVertical: 10,
  },
  timeframeBtn: {
    backgroundColor: 'transparent',
    borderColor: Token.color.uiLightSecondary,
    borderWidth: 1,
    flex: 1,
    paddingVertical: Token.spacing.xxs,
  },
  chartLoading: {
    position: 'absolute',
    left: 0,
    zIndex: 10,
    height: E_HEIGHT,
    width: E_WIDTH - Token.spacing.m * 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  }
});