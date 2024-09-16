import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './Components/HomePage';
import Register from './Components/Register';
import Login from './Components/Login';
import NotFound from './Components/NotFound';
import Dashboard from './Components/Dashboard';
import JobsTemplate from './Components/JobsTemplate'
function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
      <Route path='jobs' element={<JobsTemplate/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
