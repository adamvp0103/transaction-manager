import { useAppSelector } from '../../app/hooks';
import { Transaction } from '../../features/transactions/transactionsSlice';
import styles from './TransactionListing.module.scss';

interface TransactionListingProps {
  transaction: Transaction;
}

const TransactionListing: React.FC<TransactionListingProps> = ({
  transaction,
}) => {
  const categoryName = useAppSelector((state) =>
    state.categories.categories.find((c) => c.id === transaction.categoryId)
  )?.name;
  const categoryColor = useAppSelector((state) =>
    state.categories.categories.find((c) => c.id === transaction.categoryId)
  )?.color;

  // Format YYYY-MM-DD string to a more readable, user-friendly string
  // NOTE: Should be moved to a separate file in the future for modularity
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
    <li className={styles.container} key={transaction.id}>
      <div className={styles.body}>
        <div>
          <p
            className={styles.category}
            style={{ backgroundColor: categoryColor }}
          >
            {categoryName}
          </p>
          <p
            className={styles.amount}
            style={{
              color:
                transaction.type === 'income' ? 'var(--green)' : 'var(--red)',
            }}
          >
            {transaction.type === 'income' ? '+' : '\u2212'} $
            {transaction.amount.toFixed(2)}
          </p>
        </div>
        <div className={styles.details}>
          <p>
            {transaction.type === 'income' ? 'from' : 'to'} {transaction.party}
          </p>
          <p>on {formatDate(transaction.date)}</p>
        </div>
      </div>
    </li>
  );
};

export default TransactionListing;
