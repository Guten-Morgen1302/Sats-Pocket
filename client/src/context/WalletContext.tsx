import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getRandomInt } from '@/lib/utils';

export interface Transaction {
  id: string;
  type: 'receive' | 'send' | 'swap';
  amount: number;
  date: Date;
  recipient?: string;
  sender?: string;
  note?: string;
  category?: 'food' | 'shopping' | 'tips' | 'services' | 'other';
}

export interface Friend {
  id: string;
  name: string;
  initials: string;
  address: string;
}

interface WalletContextType {
  balance: number;
  transactions: Transaction[];
  friends: Friend[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  generateMockData: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [balance, setBalance] = useState<number>(542891);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  
  // Initialize with data on mount
  useEffect(() => {
    generateMockData();
  }, []);

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction = {
      ...transaction,
      id: Math.random().toString(36).substring(2, 11),
      date: new Date(),
    };

    setTransactions((prev) => [newTransaction, ...prev]);

    // Update balance
    if (transaction.type === 'receive') {
      setBalance((prev) => prev + transaction.amount);
    } else if (transaction.type === 'send') {
      setBalance((prev) => prev - transaction.amount);
    }
  };

  const generateMockData = () => {
    // Generate mock friends
    const mockFriends: Friend[] = [
      { id: '1', name: 'Alex B.', initials: 'AB', address: 'bc1q8c6fshw2dhdrhzqndu8hexgzdcmjwqqm9qrqsc' },
      { id: '2', name: 'Sarah C.', initials: 'SC', address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh' },
      { id: '3', name: 'John T.', initials: 'JT', address: 'bc1q9h6yzd84en4x0uphwnp9xd5y0y95esjgcq54j6' },
    ];
    setFriends(mockFriends);

    // Generate mock transactions
    const categories = ['food', 'shopping', 'tips', 'services', 'other'] as const;
    const mockTransactions: Transaction[] = [
      {
        id: '1',
        type: 'receive',
        amount: 10500,
        date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        sender: 'Unknown',
        note: 'Payment received',
        category: 'other'
      },
      {
        id: '2',
        type: 'send',
        amount: 2150,
        date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        recipient: 'Coffee Shop',
        note: 'Morning coffee',
        category: 'food'
      },
      {
        id: '3',
        type: 'send',
        amount: 15000,
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
        recipient: 'Alex B.',
        note: 'Dinner split',
        category: 'food'
      },
      {
        id: '4',
        type: 'receive',
        amount: 25000,
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
        sender: 'Sarah C.',
        note: 'Concert tickets',
        category: 'services'
      },
      {
        id: '5',
        type: 'swap',
        amount: 50000,
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
        note: 'Auto DCA Purchase',
        category: 'other'
      }
    ];
    setTransactions(mockTransactions);
  };

  return (
    <WalletContext.Provider value={{ balance, transactions, friends, addTransaction, generateMockData }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  
  return context;
}
