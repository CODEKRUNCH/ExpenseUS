import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import ProfitPathLogin from './Pages/Login';
import ExpenseUsSignup from './Pages/SignUp';
import './App.css';
import ProfitPathHome from './Pages/Home';
import Transactions from './Pages/Transactions';
import Crypto from './CryptoVault/Cryptovault';
import PersonalWallet from './Pages/PersonalWallet';
import ProtectedRoute from "./Components/protectedpath"
import { AuthProvider } from './Components/Authorization/iauthenticated';
import BudgetScreen from './Pages/budgetscreen';
import WelcomePage from './Pages/Welcome';

// Layout component that includes the Navbar
function NavbarLayout() {
  return (
    <>
      {/* <Navbar /> */}
      <Outlet />
    </>
  );
}
function Logout() {
  localStorage.clear();
  return <Navigate to="/login/" />
}

function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        {/* Auth routes without Navbar */}
        <Route path="/login" element={<ProfitPathLogin />} />
        <Route path="/signup" element={<ExpenseUsSignup />} />
         <Route path="/home" element={<WelcomePage/>} />
         <Route path="/dashboard" element={<ProfitPathHome/>} />
         <Route path="/budgeting" element={<BudgetScreen/>}/>
            <Route path="/transactions" element={<Transactions />} />
        {/* Routes with Navbar */}
        <Route element={<ProtectedRoute><NavbarLayout /></ProtectedRoute>}>
         {/* Default Path of none Selected */}
         <Route path="/" element={<ProfitPathHome/>} />
          {/* Regular Paths without the default path  */}
          <Route path="/cryptovault" element={<Crypto />} />
       
          <Route path="/personalwallet" element={<PersonalWallet />} />
          <Route path="/logout" element={<Logout />} />
          {/* Add your other routes that need Navbar here */}
        </Route>
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;