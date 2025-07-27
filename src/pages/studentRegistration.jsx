import React, { useState } from 'react';
import './studentRegistration.css'; // Import the CSS file

const StudentRegistration = () => {
    // Form field states
    const [fullName, setFullName] = useState('');
    const [mobile, setMobile] = useState('');
    const [userID, setUserID] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [securityQuestion, setSecurityQuestion] = useState('');
    const [securityAnswer, setSecurityAnswer] = useState('');
    const [termsAgreed, setTermsAgreed] = useState(false);

    // Validation error states for input borders
    const [userIDError, setUserIDError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [mobileError, setMobileError] = useState(false);

    // General error message for form validation
    const [errorMessage, setErrorMessage] = useState('');

    // Step management for multi-step form (1: Registration, 2: OTP, 3: Success)
    const [currentStep, setCurrentStep] = useState(1);

    // OTP related states
    const [emailOTPInput, setEmailOTPInput] = useState('');
    const [mobileOTPInput, setMobileOTPInput] = useState('');
    // Removed generatedEmailOTP and generatedMobileOTP states as they are no longer needed for dummy OTP
    const [otpErrorMessage, setOtpErrorMessage] = useState('');

    // Password visibility state for Confirm Password field
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Helper functions for validation
    const isAlphanumeric = (str) => {
        return /^[a-zA-Z0-9]+$/.test(str);
    };

    const isValidPassword = (str) => {
        return /[a-z]/.test(str) && // lowercase
               /[A-Z]/.test(str) && // uppercase
               /[0-9]/.test(str) && // number
               /[^a-zA-Z0-9\s]/.test(str) && // special symbol
               !/\s/.test(str); // no spaces
    };

    // Handlers for input changes with immediate validation feedback
    const handleUserIDChange = (e) => {
        const value = e.target.value;
        setUserID(value);
        setUserIDError(value !== '' && !isAlphanumeric(value));
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setPasswordError(value !== '' && !isValidPassword(value));
        // Also update confirm password error if password changes
        setConfirmPasswordError(confirmPassword !== '' && value !== confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        setConfirmPasswordError(value !== '' && password !== value);
    };

    const handleMobileChange = (e) => {
        const value = e.target.value;
        setMobile(value);
        const mobilePattern = /^\+\d{1,3}-\d{10}$/;
        setMobileError(value !== '' && !mobilePattern.test(value));
    };

    // Function to generate a dummy 6-digit OTP (still present but not used for validation)
    const generateOTP = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    // Handles submission of the initial registration form (Step 1)
    const handleRegistrationSubmit = (event) => {
        event.preventDefault();

        let valid = true;
        let errorText = "";

        // Reset all error states initially for a fresh validation run
        setUserIDError(false);
        setPasswordError(false);
        setConfirmPasswordError(false);
        setMobileError(false);
        setErrorMessage('');

        // Perform all validations
        if (fullName.trim() === '') {
            valid = false;
            errorText = "Please enter your full name.";
        } else if (mobile.trim() === '') {
            valid = false;
            errorText = "Please enter your mobile number.";
            setMobileError(true);
        } else if (!/^\+\d{1,3}-\d{10}$/.test(mobile)) {
            valid = false;
            errorText = "Mobile number format: +countrycode-ten digit number (e.g. +91-9876543210)";
            setMobileError(true);
        } else if (userID.trim() === '') {
            valid = false;
            errorText = "Please enter your User ID.";
            setUserIDError(true);
        } else if (!isAlphanumeric(userID)) {
            valid = false;
            errorText = "User ID must be alphanumeric with no spaces.";
            setUserIDError(true);
        } else if (email.trim() === '') {
            valid = false;
            errorText = "Please enter your email address.";
        } else if (!/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            valid = false;
            errorText = "Please enter a valid email address.";
        } else if (password.trim() === '') {
            valid = false;
            errorText = "Please enter your password.";
            setPasswordError(true);
        } else if (!isValidPassword(password)) {
            valid = false;
            errorText = "Password must have lowercase, uppercase, number, special symbol, and no spaces.";
            setPasswordError(true);
        } else if (confirmPassword.trim() === '') {
            valid = false;
            errorText = "Please confirm your password.";
            setConfirmPasswordError(true);
        } else if (password !== confirmPassword) {
            valid = false;
            errorText = "Passwords do not match.";
            setConfirmPasswordError(true);
        } else if (securityQuestion === '' || securityAnswer.trim() === '') {
            valid = false;
            errorText = "Please select a security question and provide an answer.";
        } else if (!termsAgreed) {
            valid = false;
            errorText = "You must agree to the Terms of Service and Privacy Policy.";
        }

        if (!valid) {
            setErrorMessage(errorText);
        } else {
            setErrorMessage('');
            // No longer generating or logging dummy OTPs here, just moving to the next step
            setCurrentStep(2); // Move to OTP verification step
        }
    };

    // Handles submission of the OTP verification form (Step 2)
    const handleOtpSubmit = (event) => {
        event.preventDefault();
        setOtpErrorMessage(''); // Clear previous OTP error

        // Validate if OTP inputs are exactly 6 digits long (any 6 digits are valid)
        const isEmailOtpValid = /^\d{6}$/.test(emailOTPInput);
        const isMobileOtpValid = /^\d{6}$/.test(mobileOTPInput);

        if (isEmailOtpValid && isMobileOtpValid) {
            setCurrentStep(3); // Move to success step
            // Here you would typically send the registration data to your backend
            console.log("Registration complete! Data:", {
                fullName, mobile, userID, email, password, securityQuestion, securityAnswer, termsAgreed
            });
        } else {
            setOtpErrorMessage('Please enter a valid 6-digit OTP for both fields.');
        }
    };

    // Toggles visibility of the confirm password field
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="main-container">
            {/* Left Side: Branding and Information */}
            <div className="left-side-branding">
                <div className="logo-container">
                    <svg className="logo-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 2L3 5V11C3 16.5 7.5 21.5 12 22C16.5 21.5 21 16.5 21 11V5L12 2Z" fill="white" fillOpacity="0.1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 10H16L8 14H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <h1 className="main-title">Zero-Fraud Payment</h1>
                <p className="subtitle">Your Security is Our Priority.</p>
                <p className="info-text">
                    Join a new era of secure transactions. Our platform uses cutting-edge technology to ensure every payment is protected against fraud, giving you complete peace of mind.
                </p>
            </div>

            {/* Right Side: Conditional rendering based on currentStep */}
            <div className="right-side-form-container">
                {currentStep === 1 && (
                    <div id="registration-container">
                        <h2 className="form-title">Create Your Account</h2>
                        <p className="form-subtitle">
                            Let's get you started! Please fill in the details below.
                        </p>

                        <form onSubmit={handleRegistrationSubmit} className="registration-form">
                            {/* Full Name Input */}
                            <div>
                                <label htmlFor="fullName" className="input-label">Full Name</label>
                                <p className="input-hint">
                                    <svg className="hint-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.657 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    please enter your real name
                                </p>
                                <input type="text" id="fullName" name="fullName" placeholder="John Doe" required
                                       className="form-input"
                                       value={fullName} onChange={(e) => setFullName(e.target.value)} />
                            </div>

                            {/* Mobile Number Input */}
                            <div>
                                <label htmlFor="mobile" className="input-label">Mobile Number</label>
                                <p className="input-hint animate-bounce-icon">
                                    <svg className="hint-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm0 10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2zm10-10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zm0 10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                    </svg>
                                    format: <span className="font-semibold">+countrycode-ten digit number</span> (e.g. +91-9876543210)
                                </p>
                                <input type="tel" id="mobile" name="mobile" placeholder="+91-9876543210" required
                                       className={`form-input ${mobileError ? 'input-error-border' : ''}`}
                                       value={mobile} onChange={handleMobileChange} />
                            </div>

                            {/* UserID Input */}
                            <div>
                                <label htmlFor="userID" className="input-label">User ID</label>
                                <p className="input-hint">
                                    <svg className="hint-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7V3a1 1 0 00-1-1H9a1 1 0 00-1 1v4M5 8h14M5 8a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V10a2 2 0 00-2-2M5 8V6a2 2 0 012-2h10a2 2 0 012 2v2" /></svg>
                                    must be <span className="font-semibold">alphanumeric</span>, <span className="font-semibold">no spaces</span>
                                </p>
                                <input type="text" id="userID" name="userID" placeholder="john123" required
                                       className={`form-input ${userIDError ? 'input-error-border' : ''}`}
                                       value={userID} onChange={handleUserIDChange} />
                            </div>

                            {/* Email Input */}
                            <div>
                                <label htmlFor="email" className="input-label">Email Address</label>
                                <input type="email" id="email" name="email" placeholder="you@example.com" required
                                       className="form-input"
                                       value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            {/* Password Input */}
                            <div>
                                <label htmlFor="password" className="input-label">Password</label>
                                <p className="input-hint">
                                    <svg className="hint-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0-1.657-1.343-3-3-3s-3 1.343-3 3v2a3 3 0 006 0v-2zm6 0c0-1.657-1.343-3-3-3s-3 1.343-3 3v2a3 3 0 006 0v-2z" /></svg>
                                    must have <span className="font-semibold">lowercase</span>, <span className="font-semibold">uppercase</span>, <span className="font-semibold">number</span>, <span className="font-semibold">special symbol</span>, and <span className="font-semibold">no spaces</span>
                                </p>
                                <input type="password" id="password" name="password" placeholder="Enter your password" required
                                       className={`form-input ${passwordError ? 'input-error-border' : ''}`}
                                       value={password} onChange={handlePasswordChange} />
                            </div>

                            {/* Confirm Password Input with Toggle */}
                            <div className="password-input-container">
                                <label htmlFor="confirmPassword" className="input-label">Confirm Password</label>
                                <p className="input-hint">
                                    <svg className="hint-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    must match password
                                </p>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="Confirm your password"
                                    required
                                    className={`form-input ${confirmPasswordError ? 'input-error-border' : ''}`}
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                />
                                <span className="password-toggle-icon" onClick={toggleConfirmPasswordVisibility}>
                                    {showConfirmPassword ? (
                                        // Eye-off icon (Lucide-react equivalent for eye-off)
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.54 18.54 0 0 1 2.51-2.73L10 14l2 2 4 4 1.94 1.94Z"/><path d="M14.66 14.66A2 2 0 0 1 12 16a2 2 0 0 1-2-2"/><path d="M9.91 4.24A10.07 10.07 0 0 1 12 4c7 0 11 8 11 8a18.54 18.54 0 0 1-2.51 2.73L14 10l-2-2-4-4-1.94-1.94Z"/></svg>
                                    ) : (
                                        // Eye icon (Lucide-react equivalent for eye)
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucude-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                                    )}
                                </span>
                            </div>

                            {/* Security Question Dropdown */}
                            <div>
                                <label htmlFor="securityQuestion" className="input-label">Security Question</label>
                                <select id="securityQuestion" name="securityQuestion" required
                                        className="form-select"
                                        value={securityQuestion} onChange={(e) => setSecurityQuestion(e.target.value)}>
                                    <option value="" disabled>Select a security question</option>
                                    <option value="cat">What is your first cat's name?</option>
                                    <option value="birthplace">What is your birthplace?</option>
                                    <option value="school">What is the name of your first school?</option>
                                    <option value="friend">Who was your childhood best friend?</option>
                                    <option value="food">What is your favorite food?</option>
                                </select>
                                <input type="text" id="securityAnswer" name="securityAnswer" placeholder="Your answer" required
                                       className="form-input mt-2"
                                       value={securityAnswer} onChange={(e) => setSecurityAnswer(e.target.value)} />
                            </div>

                            {/* Error Message Display */}
                            <div id="error-message" className={`error-message ${errorMessage ? '' : 'hidden'}`}>
                                {errorMessage}
                            </div>

                            {/* Terms and Conditions Checkbox */}
                            <div className="terms-checkbox-container">
                                <input type="checkbox" id="terms" name="terms" required
                                       className="terms-checkbox"
                                       checked={termsAgreed} onChange={(e) => setTermsAgreed(e.target.checked)} />
                                <label htmlFor="terms" className="terms-label">
                                    I agree to the <a href="#" className="terms-link">Terms of Service</a> and <a href="#" className="terms-link">Privacy Policy</a>.
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button type="submit" className="submit-button">
                                Create Account
                            </button>
                        </form>

                        {/* Login Link */}
                        <div className="login-link-container">
                            <p>Already have an account? <a href="#/login" className="login-link">Log In</a></p>
                        </div>
                    </div>
                )}

                {currentStep === 2 && (
                    <div id="otp-verification-container" className="otp-container">
                        <h2 className="form-title">Verify Your Account</h2>
                        <p className="form-subtitle">
                            Please enter the 6-digit OTPs sent to your email (<span className="font-semibold">{email}</span>) and mobile number (<span className="font-semibold">{mobile}</span>).
                            <br/> <span className="text-pink-500 font-semibold"> (You can enter any 6 digits for verification.)</span>
                        </p>

                        <form onSubmit={handleOtpSubmit} className="otp-form">
                            <div>
                                <label htmlFor="emailOTP" className="input-label">Email OTP</label>
                                <input
                                    type="text"
                                    id="emailOTP"
                                    name="emailOTP"
                                    placeholder="Enter Email OTP"
                                    required
                                    className="form-input otp-input"
                                    value={emailOTPInput}
                                    onChange={(e) => setEmailOTPInput(e.target.value)}
                                    maxLength="6" // Enforce 6-digit input
                                />
                            </div>
                            <div>
                                <label htmlFor="mobileOTP" className="input-label">Mobile OTP</label>
                                <input
                                    type="text"
                                    id="mobileOTP"
                                    name="mobileOTP"
                                    placeholder="Enter Mobile OTP"
                                    required
                                    className="form-input otp-input"
                                    value={mobileOTPInput}
                                    onChange={(e) => setMobileOTPInput(e.target.value)}
                                    maxLength="6" // Enforce 6-digit input
                                />
                            </div>

                            {otpErrorMessage && <div className="error-message">{otpErrorMessage}</div>}

                            <button type="submit" className="submit-button otp-button">
                                Verify OTPs
                            </button>
                        </form>
                        <div className="login-link-container">
                            <p>Didn't receive OTPs? <a href="#" className="login-link" onClick={() => {
                                // No actual resend logic needed, just clear error and instruct user
                                setOtpErrorMessage('You can enter any 6 digits to proceed.');
                            }}>Resend OTPs</a></p>
                        </div>
                    </div>
                )}

                {currentStep === 3 && (
                    <div id="success-container" className="success-container">
                        {/* Success Icon */}
                        <svg className="success-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h2 className="success-title">Account Created!</h2>
                        <p className="success-message-text">
                            Thank you for joining us. A confirmation email has been sent to your address.
                        </p>
                        <a href="#/login" className="proceed-to-login-button">
                            Proceed to Login
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};
export { StudentRegistration };
