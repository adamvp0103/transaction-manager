import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import CategoryForm from '../CategoryForm/CategoryForm';
import { addTransaction } from '../../features/transactions/transactionsSlice';
import styles from './TransactionForm.module.scss';

interface TransactionFormProps {
  onClose: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onClose }) => {
  // Format date object to YYYY-MM-DD string for consistency in HTML date input elements
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const currentUser = useAppSelector((state) => state.users.currentUser);
  const userCategories = useAppSelector((state) =>
    state.categories.categories.filter((c) => c.username === currentUser)
  );
  const incomeCategories = userCategories.filter((c) => c.type === 'income');
  const expenseCategories = userCategories.filter((c) => c.type === 'expense');
  const dispatch = useAppDispatch();

  const [isExpense, setIsExpense] = useState(false);
  const [amount, setAmount] = useState('');
  const [party, setParty] = useState(''); // Who the money is from (for income) or who the money is to (for expenses)
  const [date, setDate] = useState(formatDate(new Date()));
  const [category, setCategory] = useState('');
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  // Limit each user to 10 income categories and 10 expense categories
  const addCategoryAllowed = isExpense
    ? expenseCategories.length < 10
    : incomeCategories.length < 10;

  // Add a new transaction
  const handleAdd = () => {
    // Category selection is required
    if (!category) {
      alert('Please select a category.');
      return;
    }

    dispatch(
      addTransaction({
        id: crypto.randomUUID(),
        type: isExpense ? 'expense' : 'income',
        amount: parseFloat(amount),
        party: party.trim().toUpperCase(),
        date,
        categoryId: category,
        username: currentUser as string,
      })
    );
    onClose(); // Close the transaction form
  };

  useEffect(() => {
    setCategory(''); // Reset category selection when user switches between income and expense
  }, [isExpense]);

  if (showCategoryForm)
    return (
      <CategoryForm
        onClose={() => setShowCategoryForm(false)}
        isExpense={isExpense}
        setCategory={setCategory}
      />
    );

  return (
    <div className={styles.container}>
      <button className={styles.closeButton} onClick={onClose}>
        Close
      </button>

      <h2 className={styles.pageTitle}>Add Transaction</h2>

      <div className={styles.dualButton}>
        <button
          className={isExpense ? styles.inactiveButton : styles.activeButton}
          onClick={() => setIsExpense(false)}
        >
          Income
        </button>
        <button
          className={isExpense ? styles.activeButton : styles.inactiveButton}
          onClick={() => setIsExpense(true)}
        >
          Expense
        </button>
      </div>

      <input
        className={styles.input}
        type="number"
        min="0"
        value={amount}
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        className={styles.input}
        value={party}
        placeholder={isExpense ? 'For' : 'From'}
        onChange={(e) => setParty(e.target.value)}
      />

      <input
        className={styles.input}
        type="date"
        max={formatDate(new Date())}
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <p className={styles.fieldHeading}>Category</p>
      {/* Buttons used instead of a select element for better visual customization */}
      {userCategories
        .filter((c) => c.type === (isExpense ? 'expense' : 'income'))
        .map((c) => (
          <button
            className={
              c.id === category
                ? styles.activeCategory
                : styles.inactiveCategory
            }
            key={c.id}
            onClick={() => setCategory(c.id)}
            style={{ backgroundColor: c.color }}
          >
            {c.name.toUpperCase()}
          </button>
        ))}
      {/* Limit to 10 categories per type per user */}
      {addCategoryAllowed && (
        <button
          className={styles.addCategoryButton}
          onClick={() => setShowCategoryForm(true)}
        >
          Add Category
        </button>
      )}

      <button className={styles.submitButton} onClick={handleAdd}>
        Add
      </button>
    </div>
  );
};

export default TransactionForm;
