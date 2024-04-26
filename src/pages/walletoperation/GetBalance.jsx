import React, { useState } from 'react';
import './balance.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import Wallet from '../Wallet';

function GetBalance() {
    const [mobile, setMobile] = useState('');
    const [balance, setBalance] = useState(0);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleGetBalance = async () => {
        try {
            const response = await fetch(`http://localhost:8080/wallet/balance?mobile=${mobile}`);
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
        <div id="towidth">
        <div className='container'>
            <div id="balset">
            <div id="getbalances">
                <div id="wicon"><FontAwesomeIcon icon={faWallet}/>
                <h3 id="wb"> Wallet Balance</h3></div>

                
            <div className='row form-group'>
                
                <div className="col-md-6">
                    <input
                        type="text"
                        className="horizontal-lines"
                        placeholder="ENTER MOBILE NUMBER"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                    />
                </div>
                <button onClick={handleGetBalance} className="getbal">Get Balance</button>
                {message && <p>{message}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {balance !== 0 && <p>Balance: {balance}</p>}
            </div>
        </div>
        </div>
        </div>
        </div>
    );
}

export default GetBalance;
