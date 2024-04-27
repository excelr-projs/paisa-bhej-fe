import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router';

function AccountManagement() {
  const key = localStorage.getItem('uuid');
  console.log(key);
  const mobileNumber = localStorage.getItem('mobileNumber');
  const [walletId, setWalletId] = useState(0);
  const [ifscCode, setIfscCode] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const navigate = useNavigate();

  const getWalletId = async () => {
    try {
      const response = await fetch(`http://localhost:8080/wallet/getWallet?mobile=${mobileNumber}&uuid=${key}`, {
        method: 'GET'
      });
      const data = await response.json();
      console.log(data.walletId);
      setWalletId(data.walletId);
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again.");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const accountInfo = {
      key: key,
      walletId: walletId,
      accountNumber: accountNumber,
      ifscCode: ifscCode,
      bankName: bankName
    };

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
          alert('Account created successfully');
        } else {
          console.error('Failed to create account');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    getWalletId();
  }, []);

  return (
    <div>
      <Header />
      <div className='login'>
        <div>
          <div id="loginborder" style={{
            backgroundColor: 'var(--tertiary)',
            borderRadius: '25px',
            margin: '15px',
            paddingTop: '15px',
            width: '600px'
          }}>
            <h2 >Add Account</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">

                <input
                  type="text"
                  className="horizontal-lines"
                  placeholder="Enter Account number"
                  name="accountNumber"
                  value={accountNumber}
                  onChange={
                    (e) => {
                      setAccountNumber(e.target.value);
                    }
                  } />
              </div>
              <div className="form-group">

                <input
                  type="text"
                  className="horizontal-lines"
                  placeholder="Enter IFSC code"
                  name="ifscCode"
                  value={ifscCode}
                  onChange={
                    (e) => {
                      setIfscCode(e.target.value);
                    }
                  } />
              </div>
              <div className="form-group">

                <input
                  type="text"
                  className="horizontal-lines"
                  placeholder="Enter Bank Name"
                  name="bankName"
                  value={bankName}
                  onChange={
                    (e) => {
                      setBankName(e.target.value);
                    }
                  } />
              </div>
              <div id="loginicon">
                <button type="submit" className="btns">Add Account</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountManagement;
