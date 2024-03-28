import {useState} from 'react'

function CreateWallet() {

    const [mobile, setMobile] = useState('');
    const [balance, setBalance] = useState(0);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleCreateWallet = async () => {
        try {
          const response = await fetch('/wallet/createWallet', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mobile: mobile, balance: balance, key: key }),
          });
          if (!response.ok) {
            throw new Error('Failed to create wallet');
          }
          const data = await response.json();
          console.log('Wallet created:', data);
          setMessage('Wallet created successfully.');
          setError('');
        } catch (error) {
          console.error('Error creating wallet:', error);
          setMessage('');
          setError('Error creating wallet. Please try again.');
        }
      };

  return (
    <div className='container'>
    
    
    <h3>Create Wallet</h3>
    <div className='row form-group'>
    <div className="col-md-6">
    <input
      type="text"
      className="form-control"
      placeholder="Mobile"
      value={mobile}
      onChange={(e) => setMobile(e.target.value)}
    />
    </div>

    <div className="col-md-6">
    <input
      type="number"
      className="form-control"
      placeholder="Initial Balance"
      value={balance}
      onChange={(e) => setBalance(e.target.value)}
    />

    
    </div>
    <button onClick={handleCreateWallet} className="btn btn-primary mt-4 col-md-6 mx-auto">Create Wallet</button>
   
    
    
  </div>
    </div>
  )
}

export default CreateWallet;
