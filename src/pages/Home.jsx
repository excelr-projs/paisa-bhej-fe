import React, { useState, useEffect } from 'react'
import WalletIcon from '@mui/icons-material/Wallet';
import '../colors.css';
import Header from '../components/Header';

function Home() {
  const uuid = localStorage.getItem('uuid');
  const mobileNumber = localStorage.getItem('mobileNumber');
  const [wallet, setWallet] = useState({});
  const [accounts, setAccounts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');
  const getWallet = async () => {
    try {
      const response = await fetch(`http://localhost:8080/wallet/getWallet?mobile=${mobileNumber}&uuid=${uuid}`, {
        method: 'GET'
      });
      const data = await response.json();
      setWallet(data);
      getAccounts(data.walletId);
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again.");
    }
  }
  const getAccounts = async (walletId) => {
    try {
      const response = await fetch(`http://localhost:8080/account/viewAccounts?walletId=${walletId}&key=${uuid}`, {
        method: 'GET'
      });
      const data = await response.json();
      setAccounts(data);
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again.");
    }
  }
  useEffect(() => {
    getWallet();
  }, []);
  return (
    <div>
      <Header />
      <div style={{
        backgroundColor: 'var(--tertiary)',
        width: '100%',
        borderRadius: '25px',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          marginBottom: '50px'
        }}>
          <table style={{
            marginTop: '50px',
          }}>
            <tbody>
              <tr>
                <td valign='middle'>
                  <WalletIcon style={{
                    width: '200px',
                    height: '150px',
                    color: 'var(--primary)'
                  }} />
                </td>
                <td valign='middle'>
                  <span style={{
                    fontSize: '25px',
                    color: 'var(--primary)'
                  }}>Wallet Balance</span><br />
                  <span style={{
                    fontSize: '60px',
                    color: 'var(--primary)',
                    fontWeight: 'bold'
                  }}>₹ {wallet.balance}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <button className='secondary-btn' style={{
            padding: '15px 22px',
            width: '33%',
            fontSize: '20px',
            borderBottomLeftRadius: '25px'
          }} onClick={
            () => {
              window.location.href = '/createaccount';
            }
          }>Add Account</button>
          <button className='primary-btn' style={{
            padding: '15px 22px',
            width: '34%',
            fontSize: '20px',
            backgroundColor: 'var(--primary)'
          }} onClick={
            () => {
              window.location.href = '/deposit';
            }
          }>Deposit Money</button>
          <button className='secondary-btn' style={{
            padding: '15px 22px',
            width: '33%',
            fontSize: '20px',
            borderBottomRightRadius: '25px',
          }} onClick={
            () => {
              window.location.href = '/fundtransfer';
            }
          }>Send Money</button>
        </div>
      </div>
    </div>
  )
}

export default Home;