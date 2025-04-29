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

  const formatDate = (date: string) => {
    const year = Number(date.slice(0, 4));
    let month;
    switch (Number(date.slice(5, 7))) {
      case 1:
        month = 'January';
        break;
      case 2:
        month = 'February';
        break;
      case 3:
        month = 'March';
        break;
      case 4:
        month = 'April';
        break;
      case 5:
        month = 'May';
        break;
      case 6:
        month = 'June';
        break;
      case 7:
        month = 'July';
        break;
      case 8:
        month = 'August';
        break;
      case 9:
        month = 'September';
        break;
      case 10:
        month = 'October';
        break;
      case 11:
        month = 'November';
        break;
      case 12:
        month = 'December';
        break;
      default:
        month = '';
    }
    const day = Number(date.slice(8));

    return `${month} ${day}, ${year}`;
  };

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
          <p>on {formatDate(transaction.date)}</p>
        </div>
      </div>
      <button onClick={() => dispatch(deleteTransaction(transaction.id))}>
        Delete
      </button>
    </li>
  );
};

export default TransactionListing;
