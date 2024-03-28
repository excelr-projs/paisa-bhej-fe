import React,{useState} from  'react';

function HandelDeposit() {
    const [mobile, setMobile] = useState('');
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleDeposit = async () => {
        try {
          const response = await fetch('/wallet/deposit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mobile: mobile, amount: amount, key: key }),
          });
          if (!response.ok) {
            throw new Error('Failed to deposit funds');
          }
          const data = await response.json();
          console.log('Deposit successful:', data);
          setMessage('Deposit successful.');
          setError('');
        } catch (error) {
          console.error('Error depositing funds:', error);
          setMessage('');
          setError('Error depositing funds. Please try again.');
        }
      };
  return (
    <div className='container'>
    <div className='row form-group'>
    <h3>Deposit</h3>
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
      placeholder="Amount"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
    />
    </div>

    <button onClick={handleDeposit} className="btn btn-primary mt-4 col-md-6 mx-auto">Deposit</button>
  </div>
    </div>
  )
}

export default HandelDeposit
