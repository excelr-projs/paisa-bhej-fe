import React, { useState } from 'react';
import './transaction.css';

function TransactionComponent() {
  const [walletId, setWalletId] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  const handleViewByWallet = async () => {
    try {
      const response = await fetch(`/transaction/transactions/${walletId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch transactions by wallet');
      }
      const data = await response.json();
      console.log('Transactions by wallet:', data);
      setTransactions(data);
      setError('');
    } catch (error) {
      console.error('Error viewing transactions by wallet:', error);
      setTransactions([]);
      setError('Error viewing transactions by wallet. Please try again.');
    }
  };

  const handleViewByDate = async () => {
    try {
      const response = await fetch(`/transaction/transactions?from=${fromDate}&to=${toDate}`);
      if (!response.ok) {
        throw new Error('Failed to fetch transactions by date');
      }
      const data = await response.json();
      console.log('Transactions by date:', data);
      setTransactions(data);
      setError('');
    } catch (error) {
      console.error('Error viewing transactions by date:', error);
      setTransactions([]);
      setError('Error viewing transactions by date. Please try again.');
    }
  };

  const handleViewAll = async () => {
    try {
      const response = await fetch(`/transaction/transactions${transactionType ? `/${transactionType}` : ''}`);
      if (!response.ok) {
        throw new Error('Failed to fetch all transactions');
      }
      const data = await response.json();
      console.log('All transactions:', data);
      setTransactions(data);
      setError('');
    } catch (error) {
      console.error('Error viewing all transactions:', error);
      setTransactions([]);
      setError('Error viewing all transactions. Please try again.');
    }
  };

  return (
    <div className='transactionborder'>
      <h2>View Transactions</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group row">
          <div className="col-md-12">
            <div id="headingTs">
            <h3>By Wallet</h3>
            </div>
            <input
              type="text"
              className="formcontrolT"
              placeholder="Wallet ID"
              value={walletId}
              onChange={(e) => setWalletId(e.target.value)}
            />
          </div>
          <div className="align-self-center">
            <div id="Ticon">
            <button type="button" onClick={handleViewByWallet} className="btns">View Transactions</button>
            </div>
          </div>
        </div>
      </form>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group row">
          <div className="col-md-12">
          <div id="headingTs">
            <h3>By Date</h3>
            </div>
            {/* <input
              type="date"
              className="formcontrolT"
              placeholder="From Date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            /> */}
            <input
              type="date"
              className="formcontrolT"
              placeholder="To Date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
          <div className="align-self-center">
          <div id="Ticon">
            <button type="button" onClick={handleViewByDate} className="btns">View Transactions</button>
            </div>
          </div>
        </div>
      </form>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group row">
          <div className="col-md-12">
          <div id="headingTs">
            <h3>All Transactions</h3>
            </div>
            <input
              type="text"
              className="formcontrolT"
              placeholder="Transaction Type"
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
            />
          </div>
          <div className=" align-self-center">
          <div id="Ticon">
            <button type="button" onClick={handleViewAll} className="btns">View Transactions</button>
            </div>
          </div>
        </div>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    <div id="transactionoutput">
      <h3></h3>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id}>
            <strong>Transaction ID:</strong> {transaction.id} - <strong>Amount:</strong> {transaction.amount} - <strong>Description:</strong> {transaction.description}
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default TransactionComponent;
