import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/login'; 
import CreateAccountForm from './pages/CreateAccountForm';
import TransactionComponent from './pages/TransactionComponent';
import Wallet from './pages/Wallet';
import GetBalance from './pages/walletoperation/GetBalance';
import CreateWallet from './pages/walletoperation/CreateWallet';
import FundTransfer from './pages/walletoperation/FundTransfer';
import HandelDeposit from './pages/walletoperation/HandelDeposit';
import UpdateCostumer from './pages/UpdateCostumer';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/createaccount" element={<CreateAccountForm />} />
          <Route path="/transaction" element={<TransactionComponent />} />
          <Route path='/update' element={<UpdateCostumer/>}/>
          <Route path="/wallet/" element={<Wallet />}/>
          <Route path="getbalance" element={<GetBalance />} />
          <Route path="createwallet" element={<CreateWallet />} />
          <Route path="fundtransfer" element={<FundTransfer />} />
          <Route path="deposit" element={<HandelDeposit />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
