import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';

function FundTransfer() {
    const [mobile, setMobile] = useState('');
    const [targetMobile, setTargetMobile] = useState('');
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [walletDetails, setWalletDetails] = useState(null);

    const handleFundTransfer = async () => {
        try {
            const response = await fetch('http://localhost:8080/wallet/fundTransfer', {
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
            const response = await fetch(`http://localhost:8080/wallet/balance?mobile=${mobile}`);
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
            <div id="getbalances">
            <div className='row form-group'>
            <div id="wicon"><FontAwesomeIcon icon={faMoneyBillTransfer}/>
                <h3 id="wb"> Send Money</h3></div>
                <div className="col-md-6">
                    <input
                        type="text"
                        className="horizontal-lines"
                        placeholder="FROM  [MOBILE NUMBER]"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    <input
                        type="text"
                        className="horizontal-lines"
                        placeholder="TO  [MOBILE NUMBER]"
                        value={targetMobile}
                        onChange={(e) => setTargetMobile(e.target.value)}
                    />
                </div>
                
                <div className="col-md-6">
                    <input
                        type="number"
                        className="horizontal-lines"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <button onClick={handleFundTransfer} className="getbal"> Transfer</button>
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
        </div>
    );
}

export default FundTransfer;
