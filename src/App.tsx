import { Route, Routes } from 'react-router-dom';
import './App.css';
import { useAppSelector } from './app/hooks';
import UserForm from './components/UserForm/UserForm';
import TransactionsPage from './pages/TransactionsPage/TransactionsPage';
import StatisticsPage from './pages/StatisticsPage/StatisticsPage';
import AccountPage from './pages/AccountPage/AccountPage';

function App() {
  const currentUser = useAppSelector((state) => state.users.currentUser);

  if (!currentUser) return <UserForm />;

  return (
    <Routes>
      <Route path="/transaction-manager/" element={<TransactionsPage />} />
      <Route path="/transaction-manager/account" element={<AccountPage />} />
      <Route
        path="/transaction-manager/statistics"
        element={<StatisticsPage />}
      />
    </Routes>
  );
}

export default App;
