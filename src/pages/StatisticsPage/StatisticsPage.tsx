import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import Nav from '../../components/Nav/Nav';
import { Category } from '../../features/categories/categoriesSlice';
import CategoryPieChart from '../../components/CategoryPieChart/CategoryPieChart';

function StatisticsPage() {
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const currentUser = useAppSelector((state) => state.users.currentUser);
  const userTransactions = useAppSelector((state) =>
    state.transactions.transactions.filter((t) => t.username === currentUser)
  );
  const [relevantTransactions, setRelevantTransactions] =
    useState(userTransactions);
  const userCategories = useAppSelector((state) =>
    state.categories.categories.filter((c) => c.username === currentUser)
  );

  const [windowMode, setWindowMode] = useState(false);
  const [fromDate, setFromDate] = useState(() => {
    // Default from date is one month ago
    const now = new Date();
    now.setMonth(now.getMonth() - 1);

    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      '0'
    )}-${String(now.getDate()).padStart(2, '0')}`;
  });
  const [toDate, setToDate] = useState(formatDate(new Date()));

  useEffect(() => {
    if (windowMode) {
      setRelevantTransactions(
        userTransactions.filter((t) => {
          const transactionDate = new Date(t.date).getTime();
          return (
            transactionDate >= new Date(fromDate).getTime() &&
            transactionDate <= new Date(toDate).getTime()
          );
        })
      );
    } else {
      setRelevantTransactions(userTransactions);
    }
  }, [windowMode, fromDate, toDate]);

  const balance = userTransactions.reduce(
    (prev, curr) =>
      prev + (curr.type === 'income' ? curr.amount : -curr.amount),
    0
  );

  const income = relevantTransactions
    .filter((t) => t.type === 'income')
    .reduce((prev, curr) => prev + curr.amount, 0);
  const expenses = relevantTransactions
    .filter((t) => t.type === 'expense')
    .reduce((prev, curr) => prev + curr.amount, 0);

  const getCategoryTotal = (category: Category) => {
    const categoryTransactions = relevantTransactions.filter(
      (t) => t.categoryId === category.id
    );
    return categoryTransactions.reduce((prev, curr) => prev + curr.amount, 0);
  };

  return (
    <div>
      <h2>Statistics</h2>

      <h3>BALANCE</h3>
      <p>${balance.toFixed(2)}</p>

      <h3>TIME FRAME</h3>
      <button disabled={!windowMode} onClick={() => setWindowMode(false)}>
        All Time
      </button>
      <button disabled={windowMode} onClick={() => setWindowMode(true)}>
        Window
      </button>

      {windowMode && (
        <div>
          <div>
            <h3>FROM</h3>
            <input
              type="date"
              max={toDate}
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div>
            <h3>TO</h3>
            <input
              type="date"
              max={formatDate(new Date())}
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        </div>
      )}

      <h3>INCOME & EXPENSES</h3>
      <p>${income.toFixed(2)} income</p>
      <p>${expenses.toFixed(2)} expenses</p>
      <p>
        {income - expenses < 0 ? '\u2212 ' : ''}$
        {Math.abs(income - expenses).toFixed(2)} net
      </p>

      <h3>INCOME CATEGORIES</h3>
      {userCategories
        .filter((c) => c.type === 'income')
        .map((c) => (
          <p key={c.id}>
            ${getCategoryTotal(c).toFixed(2)} {c.name.toLowerCase()}
          </p>
        ))}
      {userCategories.filter((c) => c.type === 'income').length &&
      relevantTransactions.filter((t) => t.type === 'income').length ? (
        <CategoryPieChart
          categories={userCategories.filter((c) => c.type === 'income')}
          transactions={relevantTransactions.filter((t) => t.type === 'income')}
          areExpenses={false}
        />
      ) : (
        'Chart not available'
      )}

      <h3>EXPENSE CATEGORIES</h3>
      {userCategories
        .filter((c) => c.type === 'expense')
        .map((c) => (
          <p key={c.id}>
            ${getCategoryTotal(c).toFixed(2)} {c.name.toLowerCase()}
          </p>
        ))}
      {userCategories.filter((c) => c.type === 'expense').length &&
      relevantTransactions.filter((t) => t.type === 'expense').length ? (
        <CategoryPieChart
          categories={userCategories.filter((c) => c.type === 'expense')}
          transactions={relevantTransactions.filter(
            (t) => t.type === 'expense'
          )}
          areExpenses={true}
        />
      ) : (
        'Chart not available'
      )}

      <Nav />
    </div>
  );
}

export default StatisticsPage;
