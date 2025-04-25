import { useAppSelector } from '../../app/hooks';
import Nav from '../../components/Nav/Nav';

function StatisticsPage() {
  const currentUser = useAppSelector((state) => state.users.currentUser);
  const userTransactions = useAppSelector((state) =>
    state.transactions.transactions.filter((t) => t.username === currentUser)
  );
  const balance = userTransactions.reduce(
    (prev, curr) =>
      prev + (curr.type === 'income' ? curr.amount : -curr.amount),
    0
  );

  return (
    <div>
      <h2>Statistics</h2>
      <p>BALANCE</p>
      <p>${balance.toFixed(2)}</p>
      <Nav />
    </div>
  );
}

export default StatisticsPage;
