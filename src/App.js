import './styles/app.scss';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Route } from 'react-router-dom';
import dashboard from './pages/dashboard';
function App() {
  return (
    <div className="App">
     <Route path="/" component={dashboard} />
    </div>
  );
}

export default App;
