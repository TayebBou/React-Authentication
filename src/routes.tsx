import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import StartingPageContent from './components/StartingPage/StartingPageContent';
import AuthForm from './containers/Auth/AuthForm';
import { IRootState } from './shared/models/rootState.model';


const AppRoutes = () => {

  const isLoggedIn = useSelector((state: IRootState) => state.auth.isLoggedIn);

  return (
    <Layout>
      <Routes>
        {isLoggedIn && <Route path='/' element={<StartingPageContent />} />}
        {!isLoggedIn && <Route path='/auth' element={<AuthForm />} />}
        {isLoggedIn && <Route path='/profile' element={<UserProfile />} />}
        {isLoggedIn && <Route path='*' element={<Navigate to='/' />} />}
        {!isLoggedIn && <Route path='*' element={<Navigate to='/auth' />} />}
      </Routes>
    </Layout>
  )
}

export default AppRoutes;
