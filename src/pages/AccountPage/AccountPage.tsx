import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Nav from '../../components/Nav/Nav';
import { removeCategory } from '../../features/categories/categoriesSlice';
import { deleteTransaction } from '../../features/transactions/transactionsSlice';
import { deleteUser, logout } from '../../features/users/usersSlice';

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

  return (
    <div>
      <h2>Account</h2>
      <p>Hello, {userData?.name}</p>
      <button onClick={handleLogout}>Log Out</button>
      <button onClick={handleResetAccount}>Reset Account</button>
      <button onClick={handleDeleteAccount}>Delete Account</button>
      <Nav />
    </div>
  );
}

export default AccountPage;
