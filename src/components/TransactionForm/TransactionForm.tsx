import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import CategoryForm from '../CategoryForm/CategoryForm';
import { addTransaction } from '../../features/transactions/transactionsSlice';

interface TransactionFormProps {
  onClose: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onClose }) => {
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
  const dispatch = useAppDispatch();

  const [isExpense, setIsExpense] = useState(false);
  const [amount, setAmount] = useState('');
  const [party, setParty] = useState('');
  const [date, setDate] = useState(formatDate(new Date()));
  const [category, setCategory] = useState('');
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  const handleAdd = () => {
    dispatch(
      addTransaction({
        id: crypto.randomUUID(),
        type: isExpense ? 'expense' : 'income',
        amount: parseFloat(amount),
        party,
        date,
        categoryId: category,
        username: currentUser as string,
      })
    );
    onClose();
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
    <div>
      <button onClick={onClose}>Close</button>

      <h2>Add Transaction</h2>

      <div>
        <button disabled={!isExpense} onClick={() => setIsExpense(false)}>
          Income
        </button>
        <button disabled={isExpense} onClick={() => setIsExpense(true)}>
          Expense
        </button>
      </div>

      <input
        type="number"
        min="0"
        value={amount}
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        value={party}
        placeholder={isExpense ? 'For' : 'From'}
        onChange={(e) => setParty(e.target.value)}
      />

      <input
        type="date"
        max={formatDate(new Date())}
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <p>Select a category</p>
      {/* Buttons used instead of a select element for better visual customization */}
      {userCategories
        .filter((c) => c.type === (isExpense ? 'expense' : 'income'))
        .map((c) => (
          <button
            key={c.id}
            disabled={c.id === category}
            onClick={() => setCategory(c.id)}
          >
            {c.name.toUpperCase()}
          </button>
        ))}
      <button onClick={() => setShowCategoryForm(true)}>Add Category</button>

      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default TransactionForm;
