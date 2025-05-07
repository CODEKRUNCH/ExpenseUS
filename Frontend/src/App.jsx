import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import ProfitPathLogin from './Pages/Login';
import ExpenseUsSignup from './Pages/signup';
import Navbar from './Components/navbar';
import './App.css';
import ProfitPathHome from './Pages/Home';
import Crypto from './Pages/CryptoVault';

// Layout component that includes the Navbar
function NavbarLayout() {
  return (
    <>
      {/* <Navbar /> */}
      <Outlet />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes without Navbar */}
        <Route path="/login" element={<ProfitPathLogin />} />
        <Route path="/signup" element={<ExpenseUsSignup />} />
        
        {/* Routes with Navbar */}
        <Route element={<NavbarLayout />}>
          <Route path="/" element={<ProfitPathHome/>} />
          {/* Add your other routes that need Navbar here */}
          <Route path="/Cryptovault" element={<Crypto />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;