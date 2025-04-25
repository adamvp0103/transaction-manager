import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <Link to="/account">Account</Link>
      <Link to="/">Transactions</Link>
      <Link to="/statistics">Statistics</Link>
    </nav>
  );
}

export default Nav;
