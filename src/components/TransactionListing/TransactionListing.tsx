import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  deleteTransaction,
  Transaction,
} from '../../features/transactions/transactionsSlice';

interface TransactionListingProps {
  transaction: Transaction;
}

const TransactionListing: React.FC<TransactionListingProps> = ({
  transaction,
}) => {
  const dispatch = useAppDispatch();

  const categoryName = useAppSelector((state) =>
    state.categories.categories.find((c) => c.id === transaction.categoryId)
  )?.name;

  return (
    <li key={transaction.id}>
      <p>{categoryName}</p>
      <div>
        <p>
          {transaction.type === 'income' ? '+' : '\u2212'} $
          {transaction.amount.toFixed(2)}
        </p>
        <div>
          <p>
            {transaction.type === 'income' ? 'from' : 'to'} {transaction.party}
          </p>
          <p>on {transaction.date}</p>
        </div>
      </div>
      <button onClick={() => dispatch(deleteTransaction(transaction.id))}>
        Delete
      </button>
    </li>
  );
};

export default TransactionListing;
