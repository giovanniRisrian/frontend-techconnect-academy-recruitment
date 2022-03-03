import logo from './logo.svg';
import './App.css';
import { createContext, useReducer } from 'react';
import reducer from './Context/ContextReducer';
import Login from './pages/globalComponent/login/Login';
import Register from './pages/globalComponent/register/Register';
import { BrowserRouter as Router, HashRouter } from "react-router-dom";
import AppRouters from './routes/AppRouters';

export const RootContext = createContext();

const initial = { name: null, token: localStorage.getItem('token') };
function App() {
  const [userInfo, dispatch] = useReducer(reducer, initial);

  const handleAuth = (data) => {
    dispatch(data);
  };
  return (
    <RootContext.Provider value={{ userInfo: userInfo.token,name:userInfo.name, dispatch: handleAuth }}>
      <HashRouter basename={"/"}>
        {/* <Router basename="/allr8squad"> */}
          {/* <div className="App"> */}
          <AppRouters/>
            {/* <Register/> */}
          {/* </div> */}
      {/* </Router> */}
      </HashRouter>

    </RootContext.Provider>
  );
}

export default App;
