import './App.css';
import Home from './components/Home';
import Landing from './components/Landing';
import { Route } from 'react-router-dom';
import VideogameCreate from './components/VideogameCreate';

function App() {
  return (
    <div className="App" >
    <Route path="/" exact component={Landing}/>
    <Route path="/home" exact component={Home}/>
    <Route path="/videogames" exact component={VideogameCreate}/>

    </div>
  );
}

export default App;
