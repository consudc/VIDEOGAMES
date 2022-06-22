import './App.css';
import Home from './components/Home';
import Landing from './components/Landing';
import { Route } from 'react-router-dom';
import VideogameCreate from './components/VideogameCreate';
import VideogameDetail from './components/VideogameDetail';
import Profile from './components/Profile';


function App() {
  return (
    <div className="App" >
    <Route path="/" exact component={Landing}/>
    <Route path="/home" exact component={Home}/>
    <Route path="/videogames" exact component={VideogameCreate}/>
    <Route path="/home/:id" exact component={VideogameDetail}/>
  

    </div>
  );
}

export default App;
