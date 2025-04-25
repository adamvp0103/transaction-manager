import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Nav from '../../components/Nav/Nav';
import { logout } from '../../features/users/usersSlice';

function AccountPage() {
  const currentUser = useAppSelector((state) => state.users.currentUser);
  const userData = useAppSelector((state) =>
    state.users.users.find((u) => u.username === currentUser)
  );
  const dispatch = useAppDispatch();

  return (
    <div>
      <h2>Account</h2>
      <p>Hello, {userData?.name}</p>
      <button onClick={() => dispatch(logout())}>Log Out</button>
      <button>Delete Account</button>
      <Nav />
    </div>
  );
}

export default AccountPage;
