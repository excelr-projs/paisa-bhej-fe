import React, { useState, useEffect } from 'react'
import WalletIcon from '@mui/icons-material/Wallet';
import ArrowCircleUpRoundedIcon from '@mui/icons-material/ArrowCircleUpRounded';
import ArrowCircleDownRoundedIcon from '@mui/icons-material/ArrowCircleDownRounded';
import '../colors.css';
import Header from '../components/Header';

function Home() {
  const uuid = localStorage.getItem('uuid');
  const mobileNumber = localStorage.getItem('mobileNumber');
  const [wallet, setWallet] = useState({});
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const getWallet = async () => {
    try {
      const response = await fetch(`http://localhost:8080/wallet/getWallet?mobile=${mobileNumber}&uuid=${uuid}`, {
        method: 'GET'
      });
      const data = await response.json();
      setWallet(data);
      getAccounts(data.walletId);
      getTransactions(data.walletId);
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
  const getTransactions = async (walletId) => {
    try {
      const response = await fetch(`http://localhost:8080/trans/get?wallet_id=${walletId}`, {
        method: 'GET'
      });
      const data = await response.json();
      setTransactions(data);
    } catch (err) {
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
      <br />
      <br />
      <h2 style={{
        color: 'var(--primary)',
      }}>Transactions</h2>
      <br />
      {
        transactions.map((transaction, index) => {
          return (
            <div key={index} style={{
              backgroundColor: 'var(--tertiary)',
              width: '100%',
              marginBottom: '10px',
              borderRadius: '25px',
              padding: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
              {
                transaction.transactionType === 'DEBIT' ? (
                  <ArrowCircleDownRoundedIcon style={{
                    color: 'var(--secondary)',
                    fontSize: '40px',
                  }} />
                ) : (
                  <ArrowCircleUpRoundedIcon style={{
                    color: 'var(--primary)',
                    fontSize: '40px',
                  }} />
                )
              }
              <table style={{
                width: '90%',
              }}>
                <tr>
                  <td style={{
                    color: 'var(--primary)',
                    fontWeight: 'bold',
                    padding: '10px'
                  }}>Transaction Date</td>
                  <td>{transaction.transactionDate}</td>
                </tr>
                <tr>
                  <td style={{
                    color: 'var(--primary)',
                    fontWeight: 'bold',
                    padding: '10px'
                  }}>Transaction Amount</td>
                  <td>₹ {transaction.transactionAmount}</td>
                </tr>
              </table>
            </div>
          )
        })
      }
    </div>
  )
}

export default Home;