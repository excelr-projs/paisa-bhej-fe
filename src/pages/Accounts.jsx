import React, { useState, useEffect } from 'react'
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import '../colors.css';
import Header from '../components/Header';

function Accounts() {
  const uuid = localStorage.getItem('uuid');
  const mobileNumber = localStorage.getItem('mobileNumber');
  const [wallet, setWallet] = useState({});
  const [accounts, setAccounts] = useState([]);
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
      {
        accounts.length > 0 ? (
          <div>
            {
              accounts.map((account, index) => {
                return (
                  <div key={index} style={{
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
                            <AccountBalanceRoundedIcon style={{
                              fontSize: '50px',
                              color: 'var(--primary)'
                            }} />
                          </td>
                          <td valign='middle'>
                            <h2 style={{
                              color: 'var(--primary)',
                              marginLeft: '20px'
                            }}>Account Details</h2>
                          </td>
                        </tr>
                        <tr>
                          <td>Account Number:</td>
                          <td>{account.accountNumber}</td>
                        </tr>
                        <tr>
                          <td>IFSC Code:</td>
                          <td>{account.ifscCode}</td>
                        </tr>
                        <tr>
                          <td>Bank Name:</td>
                          <td>{account.bankName}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )
              })
            }
          </div>
        ) : (
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
                    <AccountBalanceRoundedIcon style={{
                      fontSize: '50px',
                      color: 'var(--primary)'
                    }} />
                  </td>
                  <td valign='middle'>
                    <h2 style={{
                      color: 'var(--primary)',
                      marginLeft: '20px'
                    }}>No Accounts Added</h2>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )
      }
    </div>
  )
}

export default Accounts;