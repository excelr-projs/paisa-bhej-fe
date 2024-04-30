import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import React, { useEffect, useState } from 'react';
import '../colors.css';
import Header from '../components/header';


function Accounts() {
  const uuid = localStorage.getItem('uuid');
  const mobileNumber = localStorage.getItem('mobileNumber');
  const [wallet, setWallet] = useState({});
  const [accounts, setAccounts] = useState([]);
  const getWallet = async () => {
    try {
      const response = await fetch(`https://paisa-bhej-backend.onrender.com/wallet/getWallet?mobile=${mobileNumber}&uuid=${uuid}`, {
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
      const response = await fetch(`https://paisa-bhej-backend.onrender.com/account/viewAccounts?walletId=${walletId}&key=${uuid}`, {
        method: 'GET'
      });
      const data = await response.json();
      setAccounts(data);
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again.");
    }
  }
  const deleteAccount = async (accountId) => {
    try {
      const response = await fetch(`https://paisa-bhej-backend.onrender.com/account/removeAccount`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          accountId: accountId,
          key: uuid
        })
      });
      if (!response.ok) {
        throw new Error('Failed to delete account');
      }
      alert('Account deleted successfully');
      getWallet();
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
          <div className='login' style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '150px'
          }}>
            {
              accounts.map((account, index) => {
                return (
                  <div key={index} style={{
                    verticalAlign: 'middle',
                    width: '450px',
                    marginBottom: '25px',
                    backgroundColor: 'var(--tertiary)',
                    borderRadius: '25px'
                  }}>
                    <div style={{
                      padding: '20px',
                    }}>
                      <table>
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
                              }}>{account.bankName}</h2>
                            </td>
                          </tr>
                          <tr>
                            <td style={{
                              color: 'var(--primary)',
                              fontWeight: 'bold',
                              padding: '10px'
                            }}>Account Number</td>
                            <td>{account.accountNumber}</td>
                          </tr>
                          <tr>
                            <td style={{
                              color: 'var(--primary)',
                              fontWeight: 'bold'
                            }}>IFSC Code</td>
                            <td>{account.ifscCode}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div id="loginicon">
                      <button onClick={
                        () => {
                          if (window.confirm('Are you sure you want to delete this account?')) {
                            deleteAccount(account.accountId);
                          }
                        }
                      }>Delete Account</button>
                    </div>
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