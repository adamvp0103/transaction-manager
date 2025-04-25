import { useState } from 'react';
import Nav from '../../components/Nav/Nav';
import TransactionForm from '../../components/TransactionForm/TransactionForm';
import { useAppSelector } from '../../app/hooks';
import TransactionListing from '../../components/TransactionListing/TransactionListing';

function TransactionsPage() {
  const currentUser = useAppSelector((state) => state.users.currentUser);
  const userTransactions = useAppSelector((state) =>
    state.transactions.transactions.filter((t) => t.username === currentUser)
  );
  const [showTransactionForm, setShowTransactionForm] = useState(false);

  if (showTransactionForm)
    return <TransactionForm onClose={() => setShowTransactionForm(false)} />;

  return (
    <div>
      <h2>Transactions</h2>

      <button onClick={() => setShowTransactionForm(true)}>
        Add Transaction
      </button>

      <ul>
        {userTransactions.map((t) => (
          <TransactionListing transaction={t} />
        ))}
      </ul>

      <Nav />
    </div>
  );
}

export default TransactionsPage;
