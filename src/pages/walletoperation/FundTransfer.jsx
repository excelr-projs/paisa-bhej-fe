import React, { useState } from 'react';

function FundTransfer() {
    const [mobile, setMobile] = useState('');
    const [targetMobile, setTargetMobile] = useState('');
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [walletDetails, setWalletDetails] = useState(null);

    const handleFundTransfer = async () => {
        try {
            const response = await fetch('/wallet/fundTransfer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sourceMobile: mobile, targetMobile: targetMobile, amount: amount }),
            });
            if (!response.ok) {
                throw new Error('Failed to transfer funds');
            }
            const data = await response.json();
            console.log('Fund transfer successful:', data);
            setMessage('Fund transfer successful.');
            setError('');
            // Fetch updated wallet details after fund transfer
            fetchWalletDetails(mobile);
        } catch (error) {
            console.error('Error transferring funds:', error);
            setMessage('');
            setError('Error transferring funds. Please try again.');
        }
    };

    const fetchWalletDetails = async (mobile) => {
        try {
            const response = await fetch(`/wallet/getWalletDetails?mobile=${mobile}`);
            if (!response.ok) {
                throw new Error('Failed to fetch wallet details');
            }
            const data = await response.json();
            setWalletDetails(data);
        } catch (error) {
            console.error('Error fetching wallet details:', error);
        }
    };

    return (
        <div className='container'>
            <div className='row form-group'>
                <h3>Fund Transfer</h3>
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Source Mobile"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Target Mobile"
                        value={targetMobile}
                        onChange={(e) => setTargetMobile(e.target.value)}
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
                <button onClick={handleFundTransfer} className="btn btn-primary mt-4 col-md-6">Fund Transfer</button>
                <p>{message}</p>
                <p style={{ color: 'red' }}>{error}</p>
                {walletDetails && (
                    <div>
                        <h4>Updated Wallet Details:</h4>
                        <p>Mobile: {walletDetails.mobile}</p>
                        <p>Balance: {walletDetails.balance}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FundTransfer;
