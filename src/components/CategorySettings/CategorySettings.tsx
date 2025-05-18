import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { removeCategory } from '../../features/categories/categoriesSlice';
import { deleteTransaction } from '../../features/transactions/transactionsSlice';
import CategoryForm from '../CategoryForm/CategoryForm';
import styles from './CategorySettings.module.scss';

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

  // Delete a category and all of the transactions that fall under it
  const handleRemove = (id: string) => {
    // Delete transactions
    userTransactions
      .filter((t) => t.categoryId === id)
      .forEach((t) => {
        dispatch(deleteTransaction(t.id));
      });

    // Delete category
    dispatch(removeCategory(id));
  };

  // Show form to add a new INCOME category
  if (showIncomeCategoryForm)
    return (
      <CategoryForm
        onClose={() => setShowIncomeCategoryForm(false)}
        isExpense={false}
        setCategory={() => {}} // Not applicable in category settings context
      />
    );

  // Show form to add a new EXPENSE category
  if (showExpenseCategoryForm)
    return (
      <CategoryForm
        onClose={() => setShowExpenseCategoryForm(false)}
        isExpense={true}
        setCategory={() => {}} // Not applicable in category settings context
      />
    );

  return (
    <div className={styles.container}>
      <button className={styles.closeButton} onClick={onClose}>
        Close
      </button>

      <h2 className={styles.pageTitle}>Categories</h2>

      <h3 className={styles.sectionHeading}>Income</h3>
      <ul className={styles.list}>
        {incomeCategories.map((c) => (
          <li
            className={styles.category}
            key={c.id}
            style={{ backgroundColor: c.color }}
          >
            {c.name}
            <button
              className={styles.removeButton}
              onClick={() => handleRemove(c.id)}
            >
              Remove Category & Transactions
            </button>
          </li>
        ))}
      </ul>
      {incomeCategories.length < 10 && (
        <button
          className={styles.addButton}
          onClick={() => setShowIncomeCategoryForm(true)}
        >
          Add Category
        </button>
      )}

      <h3 className={styles.sectionHeading}>Expense</h3>
      <ul className={styles.list}>
        {expenseCategories.map((c) => (
          <li
            className={styles.category}
            key={c.id}
            style={{ backgroundColor: c.color }}
          >
            {c.name}
            <button
              className={styles.removeButton}
              onClick={() => handleRemove(c.id)}
            >
              Remove Category & Transactions
            </button>
          </li>
        ))}
      </ul>
      {expenseCategories.length < 10 && (
        <button
          className={styles.addButton}
          onClick={() => setShowExpenseCategoryForm(true)}
        >
          Add Category
        </button>
      )}
    </div>
  );
};

export default CategorySettings;
