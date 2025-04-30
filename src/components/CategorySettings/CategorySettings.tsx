import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { removeCategory } from '../../features/categories/categoriesSlice';
import { deleteTransaction } from '../../features/transactions/transactionsSlice';
import CategoryForm from '../CategoryForm/CategoryForm';

interface CategorySettingsProps {
  onClose: () => void;
}

const CategorySettings: React.FC<CategorySettingsProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.users.currentUser);
  const userCategories = useAppSelector((state) =>
    state.categories.categories.filter((c) => c.username === currentUser)
  );
  const incomeCategories = userCategories.filter((c) => c.type === 'income');
  const expenseCategories = userCategories.filter((c) => c.type === 'expense');
  const userTransactions = useAppSelector((state) =>
    state.transactions.transactions.filter((t) => t.username === currentUser)
  );

  const [showIncomeCategoryForm, setShowIncomeCategoryForm] = useState(false);
  const [showExpenseCategoryForm, setShowExpenseCategoryForm] = useState(false);

  const handleRemove = (id: string) => {
    // Remove transactions
    userTransactions
      .filter((t) => t.categoryId === id)
      .forEach((t) => {
        dispatch(deleteTransaction(t.id));
      });

    // Remove category
    dispatch(removeCategory(id));
  };

  if (showIncomeCategoryForm)
    return (
      <CategoryForm
        onClose={() => setShowIncomeCategoryForm(false)}
        isExpense={false}
        setCategory={() => {}} // Not applicable in category settings context
      />
    );

  if (showExpenseCategoryForm)
    return (
      <CategoryForm
        onClose={() => setShowExpenseCategoryForm(false)}
        isExpense={true}
        setCategory={() => {}} // Not applicable in category settings context
      />
    );

  return (
    <div>
      <button onClick={onClose}>Close</button>

      <h2>Categories</h2>

      <h3>INCOME</h3>
      <ul>
        {incomeCategories.map((c) => (
          <li key={c.id}>
            {c.name}
            <button onClick={() => handleRemove(c.id)}>
              Remove Category & Transactions
            </button>
          </li>
        ))}
      </ul>
      {incomeCategories.length < 10 && (
        <button onClick={() => setShowIncomeCategoryForm(true)}>
          Add Category
        </button>
      )}

      <h3>EXPENSE</h3>
      <ul>
        {expenseCategories.map((c) => (
          <li key={c.id}>
            {c.name}
            <button onClick={() => handleRemove(c.id)}>
              Remove Category & Transactions
            </button>
          </li>
        ))}
      </ul>
      {expenseCategories.length < 10 && (
        <button onClick={() => setShowExpenseCategoryForm(true)}>
          Add Category
        </button>
      )}
    </div>
  );
};

export default CategorySettings;
