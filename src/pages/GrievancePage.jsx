import React, { useState } from 'react';
import './grievancePage.css'; // Import the CSS file

const GrievancePage = () => {
    // State for form fields
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [transactionDate, setTransactionDate] = useState('');
    const [grievanceType, setGrievanceType] = useState('');
    const [description, setDescription] = useState('');
    const [evidence, setEvidence] = useState(null); // For file input

    // State for modal visibility and ticket number
    const [showModal, setShowModal] = useState(false);
    const [ticketNumber, setTicketNumber] = useState('');

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission

        // Basic validation (can be expanded)
        if (!fullName || !email || !transactionId || !transactionDate || !grievanceType || !description) {
            alert('Please fill in all required fields.'); // Using alert for simplicity, could be a custom modal
            return;
        }

        // Generate a mock ticket number
        const randomTicket = 'ZFP' + Math.floor(10000000 + Math.random() * 90000000);
        setTicketNumber(randomTicket);

        // Show the modal
        setShowModal(true);

        // In a real application, you would send this data to a server:
        console.log('Grievance Submitted:', {
            fullName,
            email,
            transactionId,
            transactionDate,
            grievanceType,
            description,
            evidence: evidence ? evidence.name : 'No file attached'
        });
    };

    // Function to hide the modal and reset the form
    const hideModal = () => {
        setShowModal(false);
        // Reset form fields
        setFullName('');
        setEmail('');
        setTransactionId('');
        setTransactionDate('');
        setGrievanceType('');
        setDescription('');
        setEvidence(null); // Clear file input
        // Note: File input value cannot be directly set to '' for security reasons.
        // A common workaround for React is to use a ref or clear the input element directly.
        // For simplicity here, we just clear the state.
    };

    return (
        <div className="grievance-body-bg">
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                <div className="max-w-4xl mx-auto">

                    {/* Header */}
                    <header className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-purple-800">Zero-Fraud Payment</h1>
                        <p className="text-xl font-semibold text-slate-700 mt-3">Your Security is Our Priority</p>
                    </header>

                    <div className="bg-white-80-backdrop-blur rounded-2xl shadow-xl p-8 sm:p-10 lg:p-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Grievance Redressal Portal</h2>
                        <p className="text-slate-600 mb-10">We are committed to resolving your concerns. Please provide the details of your issue below.</p>

                        {/* Grievance Form */}
                        <form onSubmit={handleSubmit} className="space-y-8">

                            {/* Section 1: Personal Information */}
                            <div>
                                <h3 className="section-header">
                                    <svg className="icon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                    Your Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="fullName" className="form-label">Full Name</label>
                                        <input type="text" id="fullName" name="fullName" className="form-input" placeholder="Enter your full name" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="form-label">Registered Email Address</label>
                                        <input type="email" id="email" name="email" className="form-input" placeholder="you@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                            </div>

                            <hr className="border-slate-200" />

                            {/* Section 2: Transaction Details */}
                            <div>
                                <h3 className="section-header">
                                    <svg className="icon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                                    Transaction Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="transactionId" className="form-label">Transaction ID</label>
                                        <input type="text" id="transactionId" name="transactionId" className="form-input" placeholder="e.g., ZFP1234567890" required value={transactionId} onChange={(e) => setTransactionId(e.target.value)} />
                                        <p className="text-xs text-slate-500 mt-1">Find this in your transaction history or confirmation email.</p>
                                    </div>
                                    <div>
                                        <label htmlFor="transactionDate" className="form-label">Date of Transaction</label>
                                        <input type="date" id="transactionDate" name="transactionDate" className="form-input" required value={transactionDate} onChange={(e) => setTransactionDate(e.target.value)} />
                                    </div>
                                </div>
                            </div>

                            <hr className="border-slate-200" />

                            {/* Section 3: Issue Details */}
                            <div className="space-y-6">
                                <h3 className="section-header">
                                    <svg className="icon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    Issue Details
                                </h3>
                                <div>
                                    <label htmlFor="grievanceType" className="form-label">Nature of Grievance</label>
                                    <select id="grievanceType" name="grievanceType" className="form-select" required value={grievanceType} onChange={(e) => setGrievanceType(e.target.value)}>
                                        <option value="" disabled>Select the type of issue</option>
                                        <option value="unauthorized_transaction">Unauthorized Transaction</option>
                                        <option value="failed_transaction">Failed Transaction but Amount Debited</option>
                                        <option value="refund_not_received">Refund Not Received</option>
                                        <option value="service_not_rendered">Payment Made but Service/Product Not Received</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="description" className="form-label">Detailed Description of the Issue</label>
                                    <textarea id="description" name="description" rows="5" className="form-textarea" placeholder="Please describe your issue in detail..." required value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                </div>

                                <div>
                                    <label htmlFor="evidence" className="form-label">Attach Supporting Documents (Optional)</label>
                                    <input type="file" id="evidence" name="evidence" className="file-input" onChange={(e) => setEvidence(e.target.files[0])} />
                                    <p className="text-xs text-slate-500 mt-1">E.g., screenshots, receipts, invoices. Max file size: 5MB.</p>
                                </div>
                            </div>

                            {/* Submission Button */}
                            <div className="pt-4">
                                <button type="submit" className="btn-primary">Submit Grievance</button>
                            </div>
                        </form>
                    </div>

                    {/* Resolution Process */}
                    <div className="mt-16">
                        <h3 className="text-2xl font-bold text-slate-800 text-center mb-8">Our Grievance Resolution Process</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div className="resolution-card">
                                <div className="resolution-icon-bg">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </div>
                                <h4 className="font-semibold text-lg text-slate-800">1. Acknowledgement</h4>
                                <p className="text-slate-600 text-sm">You will receive an immediate confirmation with a unique ticket number via email and SMS.</p>
                            </div>
                            <div className="resolution-card">
                                <div className="resolution-icon-bg">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </div>
                                <h4 className="font-semibold text-lg text-slate-800">2. Investigation</h4>
                                <p className="text-slate-600 text-sm">Our dedicated team will investigate your case. This typically takes 3-5 business days.</p>
                            </div>
                            <div className="resolution-card">
                                <div className="resolution-icon-bg">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                                </div>
                                <h4 className="font-semibold text-lg text-slate-800">3. Resolution</h4>
                                <p className="text-slate-600 text-sm">We will communicate the resolution to you and take appropriate action to close your ticket.</p>
                            </div>
                        </div>
                    </div>

                    {/* Alternative Contact */}
                    <div className="alt-contact-container">
                        <h3 className="text-xl font-semibold text-slate-800">Need More Help?</h3>
                        <p className="text-slate-600 mt-2">For other queries or to follow up on an existing ticket, you can reach us at:</p>
                        <div className="alt-contact-links">
                            <a href="mailto:support@zerofraudpay.com" className="alt-contact-link">support@zerofraudpay.com</a>
                            <span className="alt-contact-divider">|</span>
                            <a href="tel:1800-000-0000" className="alt-contact-link">Toll-Free: 1800-000-0000</a>
                            <span className="alt-contact-divider">|</span>
                            <a href="#" className="alt-contact-link">FAQs</a>
                        </div>
                    </div>

                </div>
            </div>

            {/* Modal for Submission Confirmation */}
            {showModal && (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <div className="modal-icon-bg">
                            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800">Grievance Submitted!</h3>
                        <p className="text-slate-600 my-3">Your ticket number is <strong id="ticketNumber" className="text-slate-900">{ticketNumber}</strong>. We have sent a confirmation to your email. Our team will get back to you shortly.</p>
                        <button onClick={hideModal} className="modal-close-button">Close</button>
                    </div>
                </div>
            )}

            <footer className="footer">
                <p>&copy; 2024 Zero-Fraud Payment UI. All Rights Reserved.</p>
                <div className="mt-2">
                    <a href="#" className="footer-link">Privacy Policy</a>
                    <a href="#" className="footer-link">Terms of Service</a>
                </div>
            </footer>
        </div>
    );
};

export { GrievancePage };
