import React, { useState } from 'react';

function TransactionComponent() {
  const [walletId, setWalletId] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [transactions, setTransactions] = useState([]);

  const handleViewByWallet = async () => {
    try {
      const response = await fetch(`/transaction/transactions/${walletId}`);
      const data = await response.json();
      console.log('Transactions by wallet:', data);
      setTransactions(data);
    } catch (error) {
      console.error('Error viewing transactions by wallet:', error);
    }
  };

  const handleViewByDate = async () => {
    try {
      const response = await fetch(`/transaction/transaction?from=${fromDate}&to=${toDate}`);
      const data = await response.json();
      console.log('Transactions by date:', data);
      setTransactions(data);
    } catch (error) {
      console.error('Error viewing transactions by date:', error);
    }
  };

  const handleViewAll = async () => {
    try {
      const response = await fetch(`/transaction/transaction${transactionType ? `/${transactionType}` : ''}`);
      const data = await response.json();
      console.log('All transactions:', data);
      setTransactions(data);
    } catch (error) {
      console.error('Error viewing all transactions:', error);
    }
  };

  return (
    <div className='container border rounded'>
      <h2>View Transactions</h2>

      <form>
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

      <form>
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

      <form>
        <div className="form-group row">
          <div className="col-md-12">
            <h3>All Transactions</h3>
            <input
              type="text"
              className="form-control"
              placeholder="Transaction Type"
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
            />
          </div>
          <div className=" align-self-center">
            <button type="button" onClick={handleViewAll} className="btn btn-primary mt-2">View Transactions</button>
          </div>
        </div>
      </form>

      <h3>Transactions</h3>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id}>{transaction.amount} - {transaction.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionComponent;
