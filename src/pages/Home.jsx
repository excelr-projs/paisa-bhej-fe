import React, { useState, useEffect } from 'react'
import WalletIcon from '@mui/icons-material/Wallet';
import '../colors.css';

function Home() {
  const uuid = localStorage.getItem('uuid');
  const mobileNumber = localStorage.getItem('mobileNumber');
  const [walletBalance, setWalletBalance] = useState(0);
  const getBalance = async () => {
    try {
      const response = await fetch(`http://localhost:8080/wallet/balance?mobile=${mobileNumber}&uuid=${uuid}`, {
        method: 'GET'
      });
      const data = await response.json();
      setWalletBalance(data);
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again.");
    }
  }
  useEffect(() => {
    getBalance();
  }, []);
  return (
    <div>
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
                    height: '150px'
                  }} />
                </td>
                <td valign='middle'>
                  <span style={{
                    fontSize: '25px'
                  }}>Wallet Balance</span><br />
                  <span style={{
                    fontSize: '50px'
                  }}>{walletBalance} Rs</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <button style={{
            padding: '10px 22px',
            width: '33%',
            borderBottomLeftRadius: '25px'
          }}>Add Account</button>
          <button style={{
            padding: '10px 22px',
            width: '34%',
            backgroundColor: 'var(--primary)'
          }}>Deposit Money</button>
          <button style={{
            padding: '10px 22px',
            width: '33%',
            borderBottomRightRadius: '25px',
          }}>Send Money</button>
        </div>
      </div>
    </div>
  )
}

export default Home;