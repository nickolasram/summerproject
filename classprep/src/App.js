import './index.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Classlist from './pages/Classlist.js'
import ClassWrapper from './pages/ClassWrapper';

let App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Navigate to="/Classlist" />} />
                <Route path='/Classlist' element={<Classlist />} />
                <Route path='/class/:title' element={<ClassWrapper/>} />
            </Routes>
        </Router>
    );
  }

export default App;