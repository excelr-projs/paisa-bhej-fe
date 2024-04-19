import React, { useState } from 'react';

function HandelDeposit() {
    const [mobile, setMobile] = useState('');
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [depositDetails, setDepositDetails] = useState(null);

    const handleDeposit = async () => {
        try {
            const response = await fetch('http://localhost:8080/wallet/deposit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mobile: mobile, amount: amount }),
            });
            if (!response.ok) {
                throw new Error('Failed to deposit funds');
            }
            const data = await response.json();
            console.log('Deposit successful:', data);
            setMessage('Deposit successful.');
            setError('');
            // Fetch deposit details after successful deposit
            fetchDepositDetails(data.depositId);
        } catch (error) {
            console.error('Error depositing funds:', error);
            setMessage('');
            setError('Error depositing funds. Please try again.');
        }
    };

    const fetchDepositDetails = async (depositId) => {
        try {
            const response = await fetch(`http://localhost:8080/wallet/depositDetails?id=${depositId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch deposit details');
            }
            const data = await response.json();
            setDepositDetails(data);
        } catch (error) {
            console.error('Error fetching deposit details:', error);
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
                {message && <p>{message}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {depositDetails && (
                    <div>
                        <h4>Deposit Details:</h4>
                        <p>Deposit ID: {depositDetails.id}</p>
                        <p>Amount: {depositDetails.amount}</p>
                        {/* You can display other deposit details here */}
                    </div>
                )}
            </div>
        </div>
    );
}

export default HandelDeposit;
