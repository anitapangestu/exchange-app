import { useEffect, useMemo, useRef, useState } from "react"
import { SOCKET_URL } from "../shared/constants";

export type TBookData = { 
  price: number, count: number, amount: number 
}; 

enum BOOK_ENUM {
  PRICE,
  COUNT,
  AMOUNT,
}

export default function useOrderBook() {
  const ws = useRef<WebSocket | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderBookSnap, setOrderBookSnap] = useState<Map<number, number[]>>(new Map());
  
  useEffect(() => {
    setIsLoading(true);
    ws.current = new WebSocket(SOCKET_URL)

    ws.current.onopen = (msg) => {
      if (!ws.current) return;

      ws.current.send(JSON.stringify({ event: 'conf', flags: 536870912 }))
      ws.current.send(JSON.stringify({
        event: 'subscribe',
        channel: 'book',
        symbol: 'tBTCUSD',
        prec: 'P0',
        freq: 'F1'
      }))
    }

    ws.current.onmessage = (msgString) => {
      const msgData = JSON.parse(msgString.data);
      
      if (!Array.isArray(msgData?.[1])) {
        if (msgData.event === 'error') {
          setIsError(true);
          setIsLoading(false);
        }

        return;
      };
      setIsError(false);

      const data = msgData[1] as number[][];

      setOrderBookSnap((prevOrderBookSnap) => {
        const orderBook = new Map(prevOrderBookSnap);

        data.forEach(bookData => {
          const [price, count] = bookData;
  
          if (count > 0) {
            orderBook.set(price, bookData);
          } else if (count === 0) {
            orderBook.delete(price);
          }
        })

        return orderBook;
      });

      setIsLoading(false);
    }

    ws.current.onclose = (msg) => {
      console.log(msg);
      setOrderBookSnap(new Map());
    }
    
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    }
  }, []);

  
  const { askBook, bidBook } = useMemo(() => {
    const askBook: TBookData[] = [];
    const bidBook: TBookData[] = [];

    orderBookSnap.forEach((bookData) => {
      const [_price, _count, amount] = bookData;
      const bookObj = {
        price: bookData[BOOK_ENUM.PRICE],
        count: bookData[BOOK_ENUM.COUNT],
        amount: Math.abs(bookData[BOOK_ENUM.AMOUNT]),
      }

      if (amount > 0) {
        bidBook.push(bookObj);
      } else if (amount < 0) {
        askBook.push(bookObj);
      }
    })

    return { 
      askBook: askBook.sort((a, b) => a.price - b.price),
      bidBook: bidBook.sort((a, b) => b.price - a.price),
    };
  }, [orderBookSnap])
  

  return {
    askBook,
    bidBook,
    isLoading,
    isError,
  }
}