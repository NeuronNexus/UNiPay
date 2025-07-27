import React, { useState, useEffect } from 'react';
import './adminDashboard.css'; // Import the custom CSS file

const AdminDashboard = () => {
    // Dummy student data for demonstration
    // Added more realistic dummy data including varying payment statuses and event views
    const [students, setStudents] = useState([
        { id: 'STU_PAY_112358', name: 'Alice Johnson', email: 'alice.j@college.edu', pendingPayments: [
            { id: 'P001', description: 'Tuition Fee (Fall Sem)', dueDate: '2024-08-01', amount: 85000, status: 'Pending' },
            { id: 'P002', description: 'Hostel Fee', dueDate: '2024-08-15', amount: 40000, status: 'Pending' }
        ], eventsViewed: ['AI/ML Workshop'], hasWallet: true },
        { id: 'STU_PAY_112359', name: 'Bob Williams', email: 'bob.w@college.edu', pendingPayments: [
            { id: 'P003', description: 'Exam Fee (Spring)', dueDate: '2024-09-01', amount: 5000, status: 'Pending' },
            { id: 'P005', description: 'Lab Fees', dueDate: '2024-09-10', amount: 3000, status: 'Pending' }
        ], eventsViewed: [], hasWallet: false },
        { id: 'STU_PAY_112360', name: 'Charlie Brown', email: 'charlie.b@college.edu', pendingPayments: [], eventsViewed: ['Annual Tech Fest: Innovate 2025', 'AI/ML Workshop'], hasWallet: true },
        { id: 'STU_PAY_112361', name: 'Diana Prince', email: 'diana.p@college.edu', pendingPayments: [
            { id: 'P004', description: 'Sports Club Fee', dueDate: '2024-08-10', amount: 2500, status: 'Pending' }
        ], eventsViewed: ['Annual Tech Fest: Innovate 2025'], hasWallet: true },
        { id: 'STU_PAY_112362', name: 'Eve Adams', email: 'eve.a@college.edu', pendingPayments: [
            { id: 'P006', description: 'Workshop Fee (Robotics)', dueDate: '2024-08-20', amount: 1500, status: 'Pending' }
        ], eventsViewed: [], hasWallet: false },
    ]);

    // Dummy events data
    const [events] = useState([
        { id: 'E001', title: 'AI/ML Workshop', description: 'Join us for a 3-day workshop on the future of AI.', fee: 500 },
        { id: 'E002', title: 'Annual Tech Fest: Innovate 2025', description: 'The biggest tech fest of the year is here!', fee: 'FREE' },
        { id: 'E003', title: 'Campus Blood Drive', description: 'Donate blood, save lives. Organized by NSS.', fee: 'FREE' },
        { id: 'E004', title: 'Startup Pitch Competition', description: 'Showcase your innovative ideas and win prizes!', fee: 100 },
    ]);

    const [selectedStudentId, setSelectedStudentId] = useState(null);

    // Function to simulate downloading student logs
    const handleDownloadLog = (studentId) => {
        const student = students.find(s => s.id === studentId);
        if (student) {
            const logContent = `Student ID: ${student.id}\nName: ${student.name}\nEmail: ${student.email}\n\nPending Payments:\n${student.pendingPayments.map(p => `- ${p.description} (Due: ${p.dueDate}, Amount: ₹${p.amount}, Status: ${p.status})`).join('\n')}\n\nEvents Viewed:\n${student.eventsViewed.length > 0 ? student.eventsViewed.join(', ') : 'None'}\n\nWallet Status: ${student.hasWallet ? 'Active' : 'Inactive'}`;
            const blob = new Blob([logContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${student.name}_${student.id}_log.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            // In a real app, you might show a toast notification here instead of alert
            console.log(`Downloading log for ${student.name} (${student.id})`);
        }
    };

    // Simulate admin login via QR code scan (dummy)
    useEffect(() => {
        // In a real scenario, this would involve actual QR code scanning logic
        // For this prototype, we just assume the admin is "logged in" after a delay
        // or a specific action. The prompt implies they "come to dashboard page only after scanning the qr code"
        // so we can just render the dashboard directly.
        console.log("Admin dashboard loaded. (Simulating QR code scan success)");
    }, []);

    return (
        <div className="admin-dashboard-body-bg">
            <div className="container">
                {/* Header Section */}
                <header className="admin-header-box">
                    <div>
                        <h3 className="admin-header-title">IIT Patna</h3>
                        <span className="admin-header-subtitle">Welcome, Admin!</span>
                    </div>
                    <div className="admin-header-actions">
                        {/* Download All Logs Button */}
                        <button className="admin-download-all-btn" onClick={() => alert('Downloading all student logs...')}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                            Download All Logs
                        </button>
                    </div>
                </header>

                <main className="admin-dashboard-main">
                    {/* Left Column: Student List & Pending Payments */}
                    <div className="admin-col-left">
                        {/* Student List */}
                        <section className="admin-card admin-student-list-card">
                            <h2 className="admin-card-title">Student Overview</h2>
                            <p className="admin-card-subtitle">Select a student to view their details.</p>
                            <div className="admin-student-list">
                                {students.map(student => (
                                    <div
                                        key={student.id}
                                        className={`admin-student-item ${selectedStudentId === student.id ? 'selected' : ''}`}
                                        onClick={() => setSelectedStudentId(student.id)}
                                    >
                                        <span className="admin-student-name">{student.name} ({student.id})</span>
                                        <button className="admin-download-log-btn" onClick={(e) => { e.stopPropagation(); handleDownloadLog(student.id); }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Pending Payments for Selected Student */}
                        {selectedStudentId && (
                            <section className="admin-card admin-pending-payments-card">
                                <h3 className="admin-card-title">Pending Payments for {students.find(s => s.id === selectedStudentId)?.name}</h3>
                                {students.find(s => s.id === selectedStudentId)?.pendingPayments.length > 0 ? (
                                    <table className="admin-dashboard-table">
                                        <thead>
                                            <tr>
                                                <th>Description</th>
                                                <th>Due Date</th>
                                                <th>Amount</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {students.find(s => s.id === selectedStudentId).pendingPayments.map(payment => (
                                                <tr key={payment.id}>
                                                    <td>{payment.description}</td>
                                                    <td>{payment.dueDate}</td>
                                                    <td>₹ {payment.amount.toLocaleString()}</td>
                                                    <td>
                                                        <span className={`admin-status-badge ${payment.status.toLowerCase()}`}>
                                                            {payment.status}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button className="admin-pay-button disabled" disabled>Pay Now</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="admin-no-data">No pending payments for this student.</p>
                                )}
                            </section>
                        )}
                    </div>

                    {/* Right Column */}
                    <div className="admin-col-right">
                        {/* Student Wallet Status (Disabled Login) */}
                        <section className="admin-card admin-wallet-status-card">
                            <h3 className="admin-card-title">Student Wallet Status</h3>
                            {selectedStudentId ? (
                                <div className="admin-wallet-info">
                                    <p className="admin-wallet-text">Wallet for {students.find(s => s.id === selectedStudentId)?.name}:</p>
                                    <button className="admin-wallet-login-button disabled" disabled>
                                        {students.find(s => s.id === selectedStudentId)?.hasWallet ? 'Wallet Active' : 'Wallet Inactive'}
                                    </button>
                                </div>
                            ) : (
                                <p className="admin-no-data">Select a student to view wallet status.</p>
                            )}
                        </section>

                        {/* Quick Actions */}
                        <section className="admin-card">
                            <h3 className="admin-card-title">Quick Actions</h3>
                            <div className="admin-quick-actions-grid">
                                <a href="#/admin/raised-tickets" className="admin-quick-action-link">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-6 6m0 0l-6-6m6 6V9m6 3V9m0 0V3m0 6h6m-6 0h-6m6 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>See Raised Tickets</span>
                                </a>
                                <a href="#/admin/transaction-history" className="admin-quick-action-link">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                    <span>Transaction History</span>
                                </a>
                            </div>
                        </section>

                        {/* Events & Opportunities */}
                        <section className="admin-card">
                            <h3 className="admin-card-title">Events & Opportunities</h3>
                            {events.map(event => (
                                <div key={event.id} className="admin-event-item">
                                    <div>
                                        <h3 className="admin-event-title">{event.title}</h3>
                                        <p className="admin-event-description">{event.description}</p>
                                        <p className="admin-event-fee">₹{event.fee}</p>
                                    </div>
                                    <div className="admin-event-actions">
                                        {selectedStudentId && students.find(s => s.id === selectedStudentId)?.eventsViewed.includes(event.title) && (
                                            <span className="admin-event-viewed">Viewed</span>
                                        )}
                                        <button className="admin-get-details-button disabled" disabled>Get Details</button>
                                    </div>
                                </div>
                            ))}
                        </section>
                    </div>
                </main>

                {/* Footer */}
                <footer className="admin-footer">
                    <p>&copy; 2024 IIT Patna. All Rights Reserved.</p>
                </footer>
            </div>
        </div>
    );
};

export {AdminDashboard};
