import { StyleSheet, Dimensions, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import * as echarts from 'echarts/core';
import { CandlestickChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import { SVGRenderer, SvgChart } from '@wuba/react-native-echarts';
import { useEffect, useRef } from 'react';
import useChartData from './useChartData';
import Token from '@/constants/Token';

echarts.use([
  SVGRenderer,
  GridComponent,
  CandlestickChart,
  LegendComponent,
  TooltipComponent
]);

const E_HEIGHT = Dimensions.get('window').height - 120;
const E_WIDTH = Dimensions.get('window').width;

export default function ChartGraph() {
  const skiaRef = useRef<any>(null);
  const chartRef = useRef<any>(null);
  const { chartOptions, isError } = useChartData();

  useEffect(() => {
    if (skiaRef.current && chartOptions) {
      if (!chartRef.current) {
        chartRef.current = echarts.init(skiaRef.current, 'light', {
          renderer: 'svg',
          width: E_WIDTH,
          height: E_HEIGHT,
        });
        console.log('init echart');
      }
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
      <SvgChart ref={skiaRef} />
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
    alignItems: 'center',
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
});