import ReactDOM from 'react-dom/client';
import App from './App.js'

const $ = element => document.querySelector(element);

const root = ReactDOM.createRoot($('#root'));
  
root.render(<App />);