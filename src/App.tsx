import './App.css';
import {Outlet} from "react-router-dom";

import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <header className='header'>
          <Header />
      </header>
      <Outlet />
    </div>
  );
}

export default App;
