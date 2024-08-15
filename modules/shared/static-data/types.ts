export interface ITransaction {
  id: number;
  timestamp: number;
  fromSymbol: string;
  toSymbol: string;
  fromValue: number;
  toValue: number;
  status: 'OPEN' | 'COMPLETED';
}