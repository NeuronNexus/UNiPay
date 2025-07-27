# 🏫 College SecurePay – Smart Campus Payment Portal

*College SecurePay* is a lightweight, secure, and fraud-resistant digital payment platform designed specifically for colleges and universities. It enables students to pay academic fees, event registrations, and workshop tickets seamlessly—while giving administrators complete control, transparency, and verification tools.

---

## 🚀 Features

### 🎓 Student Features
- *Google SSO Authentication*  
  Log in securely with your college-issued Gmail account.
  
- *Multi-Factor Authentication (MFA)*  
  Combines Google login, Wallet PIN, and OTP for robust access control.
  
- *Wallet System*  
  Recharge your student wallet and make quick payments anytime.
  
- *QR-Based Payment Sessions*  
  Every payment session generates a QR code that encodes full session history.

- *Transaction History*  
  View and download your payment records in CSV/JSON format.

- *Grievance Redressal Form*  
  Report issues and payment disputes directly to college admins.

---

### 🛠 Admin Features
- *Admin Dashboard*  
  Track live payment stats, access full session logs, and manage disputes.

- *Session Log Viewer*  
  Scan or enter session QR codes to view complete transaction timelines (clicks, timestamps, actions).

- *Fake Screenshot Protection*  
  QR logs eliminate the risk of faked payment proofs.

- *CSV/JSON Export*  
  Download records for accounting, audits, or analytics.

- *Auto Session Expiry*  
  Inactive sessions are auto-invalidated to enhance security.

---

## ⚙ Tech Stack

| Layer              | Tech Used                        |
|--------------------|----------------------------------|
| Frontend           | React.js + Tailwind CSS          |
| Backend            | Node.js + Express                |
| Database           | PostgreSQL                       |
| Authentication     | Google OAuth 2.0 + Custom PIN    |
| Payments           | Razorpay API                     |
| QR Code Generation | qrcode npm package             |
| Deployment         | AWS EC2 / Campus Server (optional Firebase) |

---

## 📦 Installation

### 1. Clone the Repo

```bash
git clone https://github.com/your-org/college-securepay.git
cd college-securepay
