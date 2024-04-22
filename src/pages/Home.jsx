import React, { useState, useEffect } from 'react'
import WalletIcon from '@mui/icons-material/Wallet';

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
      <div>
        <tr>
          <td valign='middle'>
            <WalletIcon style={{
              width: '150px',
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
        <button>Add Account</button>
        <button>Deposit Money</button>
        <button>Send Money</button>
      </div>
    </div>
  )
}

export default Home;