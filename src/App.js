import './styles/app.scss';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Route , Switch } from 'react-router-dom';
import Playlist from './pages/playlist';
import Mainview from './pages/mainView';
import ScreenPlayer from './pages/screenplayer';
import Sidebar from './pages/sidebar';
function App() {
  return (
    <div className="App">
      <div className="dashboard">
            <Sidebar/>
            <Switch>
            <Route path="/" component={Mainview} exact />
            <Route path="/playlist/:id" component={Playlist} />
            <Route path="/search" />
            </Switch>
            <ScreenPlayer />
        </div>
     
    </div>
  );
}

export default App;
