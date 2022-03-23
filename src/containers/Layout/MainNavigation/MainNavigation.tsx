import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classes from './MainNavigation.module.css';
import { IRootState } from '../../../shared/models/rootState.model';
import { authActions } from '../../../config/stateSlices/authSlice';

const MainNavigation = () => {

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: IRootState) => state.auth.isLoggedIn);

  const logoutHandler = () => {
    dispatch(authActions.logoutHandler());
  }

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && 
          <li>
            <Link to='/auth'>Login</Link>
          </li>}
          {isLoggedIn && 
          <li>
            <Link to='/profile'>Profile</Link>
          </li>}
          {isLoggedIn && 
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
