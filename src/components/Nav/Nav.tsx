import { Link } from 'react-router-dom';
import { FaUser, FaDollarSign, FaChartPie } from 'react-icons/fa';
import styles from './Nav.module.scss';

function Nav() {
  // Navigate between account, transactions, and statistics pages
  return (
    <nav className={styles.container}>
      <Link to="/account">
        <FaUser />
      </Link>
      <Link to="/">
        <FaDollarSign />
      </Link>
      <Link to="/statistics">
        <FaChartPie />
      </Link>
    </nav>
  );
}

export default Nav;
