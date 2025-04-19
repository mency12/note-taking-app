import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CognitoUser } from 'amazon-cognito-identity-js';
import UserPool from "./UserPool";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OTPVerification = () => {

    const [otp, setOTP] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state.emailID;

    useEffect(() => {
    
        const fetchFileID = async () => {
    
          console.log(email);
        };
        fetchFileID();
      }, []);

    const handleVerifyOTP = (e) => {
        e.preventDefault();
        
        console.log("email ", email, " otp", otp);
        const user = new CognitoUser({ Username: email, Pool: UserPool });
        
        user.confirmRegistration(otp, true, (err, data) => {
            if (err) {
                console.error(err);
                toast.error(err.message);
            } else {
                toast.success('OTP Verified Successfully');
                console.log("Verified", data);
                navigate('/')
            }
        });
    };

    const handleOTPChange = (e) => {
        setOTP(e.target.value);
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleVerifyOTP}>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Enter OTP</label>
                        <div className="mt-2">
                            <input id="otp" name="otp" type="text" onChange={handleOTPChange} value={otp}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3
                         py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline
                          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OTPVerification;