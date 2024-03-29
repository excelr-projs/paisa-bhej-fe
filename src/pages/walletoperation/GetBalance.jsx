import React, { useState } from 'react';

function GetBalance() {
    const [mobile, setMobile] = useState('');
    const [balance, setBalance] = useState(0);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleGetBalance = async () => {
        try {
            const response = await fetch(`/wallet/balance?mobile=${mobile}`);
            if (!response.ok) {
                throw new Error('Failed to fetch balance');
            }
            const data = await response.json();
            console.log('Balance:', data);
            setBalance(data.balance);
            setMessage('');
            setError('');
        } catch (error) {
            console.error('Error getting balance:', error);
            setMessage('');
            setError('Error getting balance. Please try again.');
        }
    };

    return (
        <div className='container'>
            <div className='row form-group'>
                <h3>Get Balance</h3>
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Mobile"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                    />
                </div>
                <button onClick={handleGetBalance} className="btn btn-primary mt-4 col-md-6">Get Balance</button>
                {message && <p>{message}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {balance !== 0 && <p>Balance: {balance}</p>}
            </div>
        </div>
    );
}

export default GetBalance;
