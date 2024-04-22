import React, { useState, useEffect } from 'react'

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
      <h1>Welcome to the Home Page</h1>
      <p>UUID: {uuid}</p>
      <p>Wallet Balance: {walletBalance}</p>
    </div>
  )
}

export default Home;