import React, { useState, useEffect } from 'react';

function Profile() {
  const [accountInfo, setAccountInfo] = useState({
    accountNumber: '',
    ifscCode: '',
    bankName: '',
    balance: 0
  });

  useEffect(() => {
    // Fetch account information from the server when the component mounts
    fetch('/api/accounts')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch account information');
        }
      })
      .then(data => {
        setAccountInfo(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div className='container border rounded'>
      <h2>User Profile</h2>
      <div>
        <p><strong>Account Number:</strong> {accountInfo.accountNumber}</p>
        <p><strong>IFSC Code:</strong> {accountInfo.ifscCode}</p>
        <p><strong>Bank Name:</strong> {accountInfo.bankName}</p>
        <p><strong>Balance:</strong> {accountInfo.balance}</p>
      </div>
    </div>
  );
}

export default Profile;
