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
      <Route path="/" element={<TransactionsPage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/statistics" element={<StatisticsPage />} />
    </Routes>
  );
}

export default App;
