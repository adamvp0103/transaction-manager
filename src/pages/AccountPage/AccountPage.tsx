import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Nav from '../../components/Nav/Nav';
import { removeCategory } from '../../features/categories/categoriesSlice';
import { deleteTransaction } from '../../features/transactions/transactionsSlice';
import { deleteUser, logout } from '../../features/users/usersSlice';
import { useState } from 'react';
import CategorySettings from '../../components/CategorySettings/CategorySettings';
import styles from './AccountPage.module.scss';

function AccountPage() {
  const currentUser = useAppSelector((state) => state.users.currentUser);
  const userData = useAppSelector((state) =>
    state.users.users.find((u) => u.username === currentUser)
  );
  const userCategories = useAppSelector((state) =>
    state.categories.categories.filter((c) => c.username === currentUser)
  );
  const userTransactions = useAppSelector((state) =>
    state.transactions.transactions.filter((t) => t.username === currentUser)
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showCategorySettings, setShowCategorySettings] = useState(false);

  const handleLogout = () => {
    navigate('/'); // Return to transactions (home) page for next user
    dispatch(logout());
  };

  const handleResetAccount = () => {
    // Remove user's categories
    userCategories.forEach((c) => {
      dispatch(removeCategory(c.id));
    });

    // Delete user's transactions
    userTransactions.forEach((t) => {
      dispatch(deleteTransaction(t.id));
    });
  };

  const handleDeleteAccount = () => {
    handleResetAccount();

    // Delete user's account
    navigate('/'); // Return to transactions (home) page for next user
    dispatch(deleteUser(currentUser as string));
  };

  if (showCategorySettings)
    return <CategorySettings onClose={() => setShowCategorySettings(false)} />;

  return (
    <div className={styles.container}>
      <h2 className={styles.pageTitle}>Account</h2>
      <p className={styles.greeting}>Hello, {userData?.name}</p>
      <button
        className={styles.safeButton}
        onClick={() => setShowCategorySettings(true)}
      >
        Categories
      </button>
      <button className={styles.safeButton} onClick={handleLogout}>
        Log Out
      </button>
      <button className={styles.dangerButton} onClick={handleResetAccount}>
        Reset Account
      </button>
      <button className={styles.dangerButton} onClick={handleDeleteAccount}>
        Delete Account
      </button>
      <Nav />
    </div>
  );
}

export default AccountPage;
