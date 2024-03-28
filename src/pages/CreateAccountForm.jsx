import React, { useState } from 'react';

function CreateAccountForm() {
  const [accountInfo, setAccountInfo] = useState({
    accountNumber: '',
    ifscCode: '',
    bankName: '',
    balance: 0
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccountInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make a POST request to your backend server
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
      } else {
        console.error('Failed to create account');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div  >
      <div className='container border rounded'>
      <div className="row">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit} >

      <div className="form-group">
        <label >
          Account Number
        </label>
          <input 
          type="text" 
          className="form-control"
          name="accountNumber" 
          value={accountInfo.accountNumber} 
          onChange={handleInputChange} />
        </div>


        <div className="form-group">
        <label>
          IFSC Code:
        </label>
          <input 
          type="text" 
          className="form-control"
          name="ifscCode" 
          value={accountInfo.ifscCode} 
          onChange={handleInputChange} />
        </div>


        <div className="form-group">
        <label>
          Bank Name
        </label>
          <input 
          type="text"
          className="form-control" 
          name="bankName" 
          value={accountInfo.bankName} 
          onChange={handleInputChange} />
        </div>
       

        <div className="form-group">
        <label>
          Balance:
          <input 
          type="number" 
          className="form-control"
          name="balance" 
          value={accountInfo.balance} 
          onChange={handleInputChange} />
        </label>
        </div>

        <br />
        <button type="submit">Create Account</button>
      </form>
    </div>
    </div>
    </div>
  );
}

export default CreateAccountForm;
