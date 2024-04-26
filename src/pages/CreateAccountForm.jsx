import React, { useState, useEffect } from 'react';
import './createaccount.css';

function AccountManagement() {
  const [accountInfo, setAccountInfo] = useState({
    accountNumber: '',
    ifscCode: '',
    bankName: '',
    balance: 0
  });

  const [accounts, setAccounts] = useState([]);
  const [walletId, setWalletId] = useState('');
  const [key, setKey] = useState('');

  useEffect(() => {
    // Fetch accounts data from API
    const fetchAccounts = async () => {
      try {
        const response = await fetch(`http://localhost:8080/account/viewAccounts?walletId=${walletId}&key=${key}`);

        if (response.ok) {
          const data = await response.json();
          setAccounts(data);
        } else {
          console.error('Failed to fetch accounts');
        }
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchAccounts();
  }, [walletId, key]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccountInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    // Make a POST request to create a new account
    fetch('http://localhost:8080/account/addAccount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(accountInfo)
    })
    .then(response => {
      if (response.ok) {
        console.log('Account created successfully');
        // Optionally, you can clear the form after successful submission
        setAccountInfo({
          accountNumber: '',
          ifscCode: '',
          bankName: '',
          balance: 0
        });
        // Refresh the account list
        fetchAccounts();
      } else {
        console.error('Failed to create account');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const handleDelete = (accountId) => {
    // Make a DELETE request to remove an account
    fetch('http://localhost:8080/account/removeAccount', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ accountId, key })
    })
    .then(response => {
      if (response.ok) {
        console.log('Account deleted successfully');
        // Refresh the account list
        fetchAccounts();
      } else {
        console.error('Failed to delete account');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div>
      <div className='AccountBorder'>
        <div id="headerC">
        <h2 >Create Account</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            
            <input 
              type="text" 
              className="formcontrolC"
              placeholder="Enter Account number"
              name="accountNumber" 
              value={accountInfo.accountNumber} 
              onChange={handleInputChange} />
          </div>
          <div className="form-group">
            
            <input 
              type="text" 
              className="formcontrolC"
              placeholder="Enter IFSC code"
              name="ifscCode" 
              value={accountInfo.ifscCode} 
              onChange={handleInputChange} />
          </div>
          <div className="form-group">
           
            <input 
              type="text"
              className="formcontrolC" 
              placeholder="Enter Bank Name"
              name="bankName" 
              value={accountInfo.bankName} 
              onChange={handleInputChange} />
          </div>
          {/* <label className="balancelabel"> <h2>Balance</h2></label>
          <div className="form-group">
            
            <input 
              type="number" 
              className="formcontrolC"
              placeholder="Enter Mobile Number"
              name="balance" 
              
              value={accountInfo.balance} 
              onChange={handleInputChange} />
          </div> */}
          <div id="Createaccounticon">
          <button type="submit" className="btns">Create Account</button>
          </div>
        </form>
      </div>
{/* 
      <div className='container border rounded'>
        <h2></h2>
        <ul>
          {accounts.map(account => (
            <li key={account.id}>
              Account Number: {account.accountNumber},
               Bank Name: {account.bankName},
                IFSC Code: {account.ifscCode}
              <button  onClick={() => handleDelete(account.id) }>viewAccounts</button>
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}

export default AccountManagement;
