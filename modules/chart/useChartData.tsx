import { useEffect, useMemo, useRef, useState } from "react"
import { SOCKET_URL } from "../shared/constants";

export default function useChartData() {
  const ws = useRef<WebSocket | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState<number[][]>([]);

  useEffect(() => {
    setIsLoading(true);
    ws.current = new WebSocket(SOCKET_URL)
    console.log('connect candles');

    ws.current.onopen = (msg) => {
      if (!ws.current) return;

      console.log({ msg });

      ws.current.send(JSON.stringify({
        event: 'subscribe',
        channel: 'candles',
        key: 'trade:1D:tBTCUSD'
      }))
    }

    ws.current.onmessage = (msgString) => {
      const msgData = JSON.parse(msgString.data);
      
      if (!Array.isArray(msgData?.[1])) {
        console.log('OTHER', msgData);
        if (msgData.event === 'error') {
          setIsError(true);
          setIsLoading(false);
        }
        return;
      };

      setIsError(false);
      const data = msgData[1] as (number[][] | number[]);

       setChartData((prevChartData) => {
        if (prevChartData.length === 0 ) {
          return data as number[][];
        }

        if (Array.isArray(data)) {
          if (Array.isArray(data[0])) {
            return prevChartData;
          }

          const newData = prevChartData;
          if (prevChartData[0][0] === data[0]) {
            newData[0] = data as number[];
          }
          return newData;
        }

        return prevChartData;
      });

      setIsLoading(false);
    }

    ws.current.onclose = (msg) => {
      console.log(msg);
      setChartData([]);
    }
    
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    }
  }, []);

  const chartOptions = useMemo(() => {
    const count = 30;
    const dt = [];

    if (chartData.length === 0) return null;

    for (let i = 0; i < count; i++) {
      dt.unshift([
        chartData[i][2],
        chartData[i][1],
        chartData[i][4],
        chartData[i][3]
      ])
    }

    return {
      xAxis: { data: [], tooltip: true },
      yAxis: { 
        scale: true,
        offset: -5,
        tooltip: true,
      },
      series: [
        {
          type: 'candlestick',
          data: dt,
        }
      ]
    };
  }, [chartData]);

  return {
    chartOptions,
    isLoading,
    isError,
  }
}