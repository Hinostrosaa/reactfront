import React from 'react';
import ForgotPasswordForm from '../components/Auth/ForgotPassword';

const ForgotPassword = () => {
    return (
        <div className="auth-page">
            <div className="auth-container">
                <ForgotPasswordForm />
            </div>
        </div>
    );
};

export default ForgotPassword;