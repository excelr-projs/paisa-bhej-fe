import React, { useState, useEffect } from 'react';

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
        const response = await fetch(`/api/account/viewAccounts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ walletId, key }),
        });

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
    fetch('/api/accounts', {
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
    fetch('/api/account/removeAccount', {
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
      <div className='container border rounded'>
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Account Number</label>
            <input 
              type="text" 
              className="form-control"
              name="accountNumber" 
              value={accountInfo.accountNumber} 
              onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>IFSC Code:</label>
            <input 
              type="text" 
              className="form-control"
              name="ifscCode" 
              value={accountInfo.ifscCode} 
              onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Bank Name</label>
            <input 
              type="text"
              className="form-control" 
              name="bankName" 
              value={accountInfo.bankName} 
              onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Balance:</label>
            <input 
              type="number" 
              className="form-control"
              name="balance" 
              value={accountInfo.balance} 
              onChange={handleInputChange} />
          </div>
          <button type="submit" className="btn btn-primary m-4">Create Account</button>
        </form>
      </div>

      <div className='container border rounded'>
        <h2>View Accounts</h2>
        <ul>
          {accounts.map(account => (
            <li key={account.id}>
              Account Number: {account.accountNumber},
               Bank Name: {account.bankName},
                IFSC Code: {account.ifscCode}
              <button  onClick={() => handleDelete(account.id) }>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AccountManagement;
