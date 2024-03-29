import React, { useState, useEffect } from 'react';

function CreateWallet() {
    const [mobile, setMobile] = useState('');
    const [balance, setBalance] = useState(0);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [wallets, setWallets] = useState([]);

    useEffect(() => {
        // Fetch existing wallets or update wallets after creating a new one
        fetchWallets();
    }, []); // Empty dependency array ensures this effect runs only once on initial render

    const fetchWallets = async () => {
        try {
            const response = await fetch('/wallet/getAllWallets');
            if (!response.ok) {
                throw new Error('Failed to fetch wallets');
            }
            const data = await response.json();
            setWallets(data);
        } catch (error) {
            console.error('Error fetching wallets:', error);
        }
    };

    const handleCreateWallet = async () => {
        try {
            const response = await fetch('/wallet/createWallet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mobile: mobile, balance: balance }),
            });
            if (!response.ok) {
                throw new Error('Failed to create wallet');
            }
            const data = await response.json();
            console.log('Wallet created:', data);
            setMessage('Wallet created successfully.');
            setError('');
            // Fetch updated wallets after creating a new one
            fetchWallets();
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
            {message && <p className="text-success">{message}</p>}
            {error && <p className="text-danger">{error}</p>}
            {wallets.length > 0 && (
                <div>
                    <h4>Wallets:</h4>
                    <ul>
                        {wallets.map((wallet, index) => (
                            <li key={index}>{`Mobile: ${wallet.mobile}, Balance: ${wallet.balance}`}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default CreateWallet;
