import { Category } from '../../features/categories/categoriesSlice';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Transaction } from '../../features/transactions/transactionsSlice';
import styles from './CategoryPieChart.module.scss';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CategoryPieChartProps {
  categories: Category[];
  transactions: Transaction[];
  areExpenses: boolean;
}

const CategoryPieChart: React.FC<CategoryPieChartProps> = ({
  categories,
  transactions,
  areExpenses,
}) => {
  // Format data to work with Chart.js
  const data = {
    labels: categories.map((c) => c.name),
    datasets: [
      {
        label: areExpenses ? 'Expenses' : 'Income',
        data: categories.map((c) =>
          transactions
            .filter((t) => t.categoryId === c.id)
            .reduce((prev, curr) => prev + curr.amount, 0)
        ),
        backgroundColor: categories.map((c) => c.color),
      },
    ],
  };

  return (
    <div className={styles.container}>
      <Pie data={data} />
    </div>
  );
};

export default CategoryPieChart;
