import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import StartingPageContent from './components/StartingPage/StartingPageContent';
import AuthForm from './containers/Auth/AuthForm';


const AppRoutes = () => (
    <Layout>
      <Routes>
        <Route path='/' element={<StartingPageContent />} />
        <Route path='/auth' element={<AuthForm />} />
        <Route path='/profile' element={<UserProfile />} />
      </Routes>
    </Layout>
)

export default AppRoutes
