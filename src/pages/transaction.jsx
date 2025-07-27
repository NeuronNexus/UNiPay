import React, { useState, useEffect } from 'react';
import './transactionHistory.css'; // Import the custom CSS file

const TransactionHistory = () => {
    // Dummy transaction data for demonstration purposes
    const [transactions, setTransactions] = useState([
        { id: 'TXN001', date: '2024-07-25', description: 'Cafeteria Lunch', amount: -8.50, type: 'Debit', status: 'Completed' },
        { id: 'TXN002', date: '2024-07-24', description: 'Bookstore Purchase', amount: -45.20, type: 'Debit', status: 'Completed' },
        { id: 'TXN003', date: '2024-07-23', description: 'Scholarship Deposit', amount: 1500.00, type: 'Credit', status: 'Completed' },
        { id: 'TXN004', date: '2024-07-22', description: 'Library Fine', amount: -2.00, type: 'Debit', status: 'Completed' },
        { id: 'TXN005', date: '2024-07-21', description: 'Club Dues (Chess Club)', amount: -15.00, type: 'Debit', status: 'Pending' },
        { id: 'TXN006', date: '2024-07-20', description: 'Part-time Job Payment', amount: 300.00, type: 'Credit', status: 'Completed' },
        { id: 'TXN007', date: '2024-07-19', description: 'Event Ticket: Concert', amount: -25.00, type: 'Debit', status: 'Completed' },
        { id: 'TXN008', date: '2024-07-18', description: 'Laundry Service', amount: -3.75, type: 'Debit', status: 'Completed' },
        { id: 'TXN009', date: '2024-07-17', description: 'Tuition Fee Payment', amount: -5000.00, type: 'Debit', status: 'Completed' },
        { id: 'TXN010', date: '2024-07-16', description: 'Refund: Textbooks', amount: 80.00, type: 'Credit', status: 'Completed' },
        { id: 'TXN011', date: '2024-07-15', description: 'Cafeteria Dinner', amount: -12.00, type: 'Debit', status: 'Completed' },
        { id: 'TXN012', date: '2024-07-14', description: 'Snack Vending Machine', amount: -1.50, type: 'Debit', status: 'Failed' },
    ]);

    // State for filtering (optional, but good for future enhancements)
    const [filterType, setFilterType] = useState('All'); // 'All', 'Debit', 'Credit'
    const [searchTerm, setSearchTerm] = useState('');

    // Filtered transactions based on current filters
    const filteredTransactions = transactions.filter(transaction => {
        const matchesType = filterType === 'All' || transaction.type === filterType;
        const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesType && matchesSearch;
    });

    return (
        <div className="transaction-history-body-bg">
            <div className="container">
                {/* Header Section */}
                <header className="header-section">
                    <h1 className="main-title">Zero-Fraud Payment</h1>
                    <p className="subtitle">Your Campus Transaction History</p>
                </header>

                {/* Main Content Card */}
                <div className="main-content-card">
                    <h2 className="card-title">Recent Transactions</h2>
                    <p className="card-subtitle">Overview of your recent campus expenditures and credits.</p>

                    {/* Filter and Search Section */}
                    <div className="filter-search-container">
                        <div className="filter-group">
                            <label htmlFor="filterType" className="filter-label">Show:</label>
                            <select
                                id="filterType"
                                className="filter-select"
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                            >
                                <option value="All">All Transactions</option>
                                <option value="Debit">Debits</option>
                                <option value="Credit">Credits</option>
                            </select>
                        </div>
                        <div className="search-group">
                            <input
                                type="text"
                                placeholder="Search transactions..."
                                className="search-input"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    {/* Transaction Table/List */}
                    <div className="transaction-list-container">
                        {filteredTransactions.length > 0 ? (
                            <table className="transaction-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Description</th>
                                        <th>Amount</th>
                                        <th>Type</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTransactions.map(txn => (
                                        <tr key={txn.id} className={txn.type === 'Debit' ? 'debit-row' : 'credit-row'}>
                                            <td>{txn.date}</td>
                                            <td>{txn.description}</td>
                                            <td className={txn.amount < 0 ? 'amount-debit' : 'amount-credit'}>
                                                {txn.amount < 0 ? `- $${Math.abs(txn.amount).toFixed(2)}` : `+ $${txn.amount.toFixed(2)}`}
                                            </td>
                                            <td>
                                                <span className={`transaction-type-badge ${txn.type.toLowerCase()}`}>
                                                    {txn.type}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`transaction-status-badge ${txn.status.toLowerCase()}`}>
                                                    {txn.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="no-transactions-message">No transactions found matching your criteria.</p>
                        )}
                    </div>
                </div>

                {/* Quick Links / Footer-like Section */}
                <div className="quick-links-section">
                    <h3 className="quick-links-title">Need Assistance?</h3>
                    <div className="quick-links-grid">
                        <a href="#/grievance" className="quick-link-card">
                            <svg className="quick-link-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375M12 12H3m3 0H12m0 0a1.5 1.5 0 010-3m0 3a1.5 1.5 0 000-3m0-3h-2.25m2.25 3h10.5m0 0a1.5 1.5 0 000-3m0 3a1.5 1.5 0 010-3m-3-3h-2.25m-2.25-3h3.375M21 12H9" /></svg>
                            <span>Contact Support</span>
                        </a>
                        <a href="#/faq" className="quick-link-card">
                            <svg className="quick-link-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11.25h3.38a.75.75 0 01.671.49l1.497 4.491a1.5 1.5 0 01-.852 2.065L12 21v-9l4.752-1.296a.75.75 0 01.671.49l1.497 4.491a1.5 1.5 0 01-.852 2.065L12 21v-9l4.752-1.296a.75.75 0 01.671.49l1.497 4.491a1.5 1.5 0 01-.852 2.065L12 21v-9" /></svg>
                            <span>View FAQs</span>
                        </a>
                        <a href="#/statements" className="quick-link-card">
                            <svg className="quick-link-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 21h.75m-1.5 0h.75m-3 0H9M16.5 21h.75m-1.5 0h.75m-3 0H12M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>Download Statements</span>
                        </a>
                    </div>
                </div>

                {/* Footer */}
                <footer className="footer">
                    <p>&copy; 2024 Zero-Fraud Payment. All Rights Reserved.</p>
                </footer>
            </div>
        </div>
    );
};

export { TransactionHistory };
