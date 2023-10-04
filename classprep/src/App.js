import './index.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Classlist from './pages/Classlist.js'
import ClassWrapper from './pages/ClassWrapper';
import Login from './pages/Login';
import useToken from './components/useToken.js';
import Authenticated from './components/Authentication';

let App = () => {

    const { token, setToken } = useToken();

    if(!Authenticated()) {
         return <Login setToken={setToken} />
      }

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Navigate to="/Classlist" />} />
                <Route path='/Classlist' element={<Classlist />} />
                <Route path='/class/:title' element={<ClassWrapper/>} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </Router>
    );
  }

export default App;