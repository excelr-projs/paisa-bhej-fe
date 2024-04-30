import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Header from '../../components/Header';

function FundTransfer() {
    const uuid = localStorage.getItem('uuid');
    const mobile = localStorage.getItem('mobileNumber');
    const [targetMobile, setTargetMobile] = useState('');
    const [amount, setAmount] = useState('');
    const [walletDetails, setWalletDetails] = useState({});
    const [targetWalletId, setTargetWalletId] = useState('');
    const navigate = useNavigate();

    const handleFundTransfer = async () => {
        try {
            const response = await fetch("https://paisa-bhej-backend.onrender.com/trans/add", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    transactionAmount: parseFloat(amount),
                    transactionType: "DEBIT",
                    walletId: walletDetails.walletId,
                })
            });
            await fetchTargetWalletId();
            const response2 = await fetch("https://paisa-bhej-backend.onrender.com/trans/add", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    transactionAmount: parseFloat(amount),
                    transactionType: "CREDIT",
                    walletId: targetWalletId,
                })
            });
            alert("Fund Transfer Successful");
            navigate('/home');
        } catch (err) {
            console.error(err);
            setError("An error occurred. Please try again.");
        }
    };

    const fetchWalletDetails = async () => {
        try {
            const response = await fetch(`https://paisa-bhej-backend.onrender.com/wallet/getWallet?mobile=${mobile}&uuid=${uuid}`);
            if (!response.ok) {
                throw new Error('Failed to fetch wallet details');
            }
            const data = await response.json();
            setWalletDetails(data);
        } catch (error) {
            console.error('Error fetching wallet details:', error);
        }
    };

    const fetchTargetWalletId = async () => {
        try {
            const response = await fetch(`https://paisa-bhej-backend.onrender.com/wallet/getWallet?mobile=${targetMobile}&uuid=${uuid}`);
            if (!response.ok) {
                throw new Error('Failed to fetch target wallet details');
            }
            const data = await response.json();
            setTargetWalletId(data.walletId);
        } catch (error) {
            console.error('Error fetching target wallet details:', error);
        }
    }

    useEffect(() => {
        fetchWalletDetails();
    }, []);

    return (
        <div>
            <Header />
            <div className="login">
                <div >
                    <div className="loginborder">
                        <h2>Send Money</h2>
                        <div className="form-group">
                            <input
                                type="text"
                                className="horizontal-lines"
                                placeholder="Enter Target Mobile Number"
                                value={targetMobile}
                                onChange={(event) => setTargetMobile(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="horizontal-lines"
                                placeholder="Enter Amount"
                                value={amount}
                                onChange={(event) => setAmount(event.target.value)}
                            />
                        </div>
                        <div id="loginicon">
                            <button onClick={
                                () => {
                                    if (targetMobile === '' || amount === '') {
                                        alert('Please fill all the fields');
                                    } else {
                                        handleFundTransfer();
                                    }
                                }
                            }>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FundTransfer;
