import { useEffect, useRef, useState } from "react"
import { SOCKET_URL } from "../../constants";

export type TTicker = { 
  lastPrice: number,
  dailyChangePercentage: number,
}; 

export default function useTicker() {
  const ws = useRef<WebSocket | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ticker, setTicker] = useState<TTicker | null>(null);
  
  useEffect(() => {
    setIsLoading(true);
    ws.current = new WebSocket(SOCKET_URL)
    console.log('setup websocket');
    ws.current.onopen = (msg) => {
      if (!ws.current) return;

      console.log('subscribe ticker', { msg });
      ws.current.send(JSON.stringify({ 
        event: 'subscribe', 
        channel: 'ticker', 
        symbol: 'tBTCUSD' 
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
      // handle if it is bulk data
      const data = msgData[1] as number[];
      console.log('data array', data[6]);
      
      setTicker({
        lastPrice: data[6],
        dailyChangePercentage: data[5],
      });

      setIsLoading(false);
    }

    ws.current.onclose = (msg) => {
      console.log(msg);
      setTicker(null);
    }
    
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    }
  }, []);
  

  return {
    ticker,
    isLoading,
    isError,
  }
}