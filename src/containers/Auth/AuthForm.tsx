import { FormEvent, useRef, Fragment } from 'react';
import { Dialog } from 'primereact/dialog';
import classes from './AuthForm.module.css';
import { ProgressSpinner } from 'primereact/progressspinner'
import { useDispatch, useSelector } from 'react-redux';
import { authActions, signInAndSignUp } from '../../config/stateSlices/authSlice';
import { IRootState } from '../../shared/models/rootState.model';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state:IRootState) => state.auth.isLogin);
  const error = useSelector((state:IRootState) => state.auth.error);
  const loading = useSelector((state:IRootState) => state.auth.loading);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const switchAuthModeHandler = () => {
    dispatch(authActions.switchAuthMode());
  };

  const onHide = () => {
    dispatch(authActions.setError(null));
  };

  const submitHandler = (event : FormEvent) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;

    // Optional : Add validation

    dispatch(signInAndSignUp(enteredEmail,enteredPassword,isLogin, navigate));
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          {!loading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {loading && 
            <div>
              <ProgressSpinner />
            </div>
          }
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
      <Dialog dismissableMask={true}
        visible={error ? true : false} onHide={() => onHide()} 
        breakpoints={{'960px': '75vw'}} style={{width: '50vw'}}
        footer={<Fragment></Fragment>}
        baseZIndex={1000}>
          <Fragment>
              <h1 style={{ textAlign: 'center', marginTop: '0', marginBottom: 'calc(80px - 2rem)' }} ><strong>{error}</strong></h1>
          </Fragment>
      </Dialog>
    </section>
  );
};

export default AuthForm;
