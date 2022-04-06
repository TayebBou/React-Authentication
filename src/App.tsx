import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes'
import "primereact/resources/themes/saga-purple/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
