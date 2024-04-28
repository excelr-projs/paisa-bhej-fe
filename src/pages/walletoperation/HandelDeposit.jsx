import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Header from '../../components/Header';

function HandelDeposit() {
    const uuid = localStorage.getItem('uuid');
    const mobileNumber = localStorage.getItem('mobileNumber');
    const [wallet, setWallet] = useState({});
    const [accounts, setAccounts] = useState([]);
    const [amount, setAmount] = useState('');
    const [selectedAccount, setSelectedAccount] = useState('');
    const navigate = useNavigate();

    const getWallet = async () => {
        try {
            const response = await fetch(`http://localhost:8080/wallet/getWallet?mobile=${mobileNumber}&uuid=${uuid}`, {
                method: 'GET'
            });
            const data = await response.json();
            setWallet(data);
            getAccounts(data.walletId);
        } catch (err) {
            console.error(err);
            alert("An error occurred. Please try again.");
        }
    }
    const getAccounts = async (walletId) => {
        try {
            const response = await fetch(`http://localhost:8080/account/viewAccounts?walletId=${walletId}&key=${uuid}`, {
                method: 'GET'
            });
            const data = await response.json();
            setAccounts(data);
        } catch (err) {
            console.error(err);
            alert("An error occurred. Please try again.");
        }
    }
    useEffect(() => {
        getWallet();
    }, []);
    const handleDeposit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/wallet/deposit", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    mobile: mobileNumber,
                    key: uuid,
                    amount: parseFloat(amount),
                })
            });
            const data = await response.json();
            navigate('/home');
        } catch (err) {
            console.error(err);
            alert("An error occurred. Please try again.");
        }
    }
    return (
        <div>
            <Header />
            <div className="login">
                <div className="loginborder">
                    <h2>Select account and deposit money</h2>
                    <form onSubmit={handleDeposit}>
                        <div className="form-group">
                            <select
                                className="horizontal-lines"
                                value={selectedAccount}
                                onChange={(event) => setSelectedAccount(event.target.value)}
                            >
                                {
                                    accounts.map((account, index) => {
                                        return (
                                            <option key={index} value={account.accountNumber}>{account.bankName} - {account.accountNumber}</option>
                                        );
                                    })
                                }
                            </select>
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
                            <button type="submit" classname="btn">Deposit Money</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default HandelDeposit;
