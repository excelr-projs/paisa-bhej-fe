import React, { useState } from 'react';

function TransactionComponent() {
  const [walletId, setWalletId] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  const handleViewByWallet = async () => {
    try {
      const response = await fetch(`/trans/get?wallet_id=${walletId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch transactions by wallet');
      }
      const data = await response.json();
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
      const response = await fetch(`/trans/get/${fromDate}/${toDate}`);
      if (!response.ok) {
        throw new Error('Failed to fetch transactions by date');
      }
      const data = await response.json();
      setTransactions(data);
      setError('');
    } catch (error) {
      console.error('Error viewing transactions by date:', error);
      setTransactions([]);
      setError('Error viewing transactions by date. Please try again.');
    }
  };

  const handleViewByType = async () => {
    try {
      const response = await fetch(`/trans/get/${transactionType}`);
      if (!response.ok) {
        throw new Error('Failed to fetch transactions by type');
      }
      const data = await response.json();
      setTransactions(data);
      setError('');
    } catch (error) {
      console.error('Error viewing transactions by type:', error);
      setTransactions([]);
      setError('Error viewing transactions by type. Please try again.');
    }
  };

  return (
    <div className='container border rounded'>
      <h2>View Transactions</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group row">
          <div className="col-md-12">
            <h3>By Wallet</h3>
            <input
              type="text"
              className="form-control"
              placeholder="Wallet ID"
              value={walletId}
              onChange={(e) => setWalletId(e.target.value)}
            />
          </div>
          <div className="align-self-center">
            <button type="button" onClick={handleViewByWallet} className="btn btn-primary mt-2">View Transactions</button>
          </div>
        </div>
      </form>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group row">
          <div className="col-md-12">
            <h3>By Date</h3>
            <input
              type="date"
              className="form-control"
              placeholder="From Date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
            <input
              type="date"
              className="form-control"
              placeholder="To Date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
          <div className="align-self-center">
            <button type="button" onClick={handleViewByDate} className="btn btn-primary mt-2">View Transactions</button>
          </div>
        </div>
      </form>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group row">
          <div className="col-md-12">
            <h3>By Type</h3>
            <input
              type="text"
              className="form-control"
              placeholder="Transaction Type"
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
            />
          </div>
          <div className="align-self-center">
            <button type="button" onClick={handleViewByType} className="btn btn-primary mt-2">View Transactions</button>
          </div>
        </div>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h3>Transactions</h3>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id}>
            <strong>Transaction ID:</strong> {transaction.id} - <strong>Amount:</strong> {transaction.amount} - <strong>Description:</strong> {transaction.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionComponent;
