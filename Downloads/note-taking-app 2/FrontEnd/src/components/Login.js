import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import UserPool from "./UserPool";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const [email, setEmail] = useState('');
    const [isLogin, setLogin] = useState(true);
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        const user = new CognitoUser({
            Username: email,
            Pool: UserPool
        });

        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password
        });

        return new Promise((resolve, reject) => {
            console.log(authDetails);

            user.authenticateUser(authDetails, {
                onSuccess: (session) => {
                    toast.success("Login successfull !!")
                    console.log('Authentication successful:');
                    console.log(session.idToken.jwtToken);
                    navigate('/home', { state: { token: session.idToken.jwtToken } });
                },
                onFailure: (err) => {
                    console.error('Authentication failed:', err);
                    toast.error('Enter valid credentials !!')
                },
                newPasswordRequired: (data) => {
                    console.log('New password required:', data);
                    toast.error('ipdate Password !!');
                }
            });
        });
    }

    const handleSignUpSubmit = (e) => {
        e.preventDefault();

        console.log(email);
        console.log(password)

        UserPool.signUp(email, password, [], null, (err, data) => {
            if (err) {
                toast.error("Unable to Register !!");
                console.log(data);
                console.log(err);
            } else {
                toast.success("User Register !!");
                console.log(data);
                console.log(data.user.username);
                navigate('/otpValidate', { state: { emailID: data.user.username} });
            }

        })
    }

    return (
        <>
            {
                isLogin ? <>
                    <div className="flex flex-col justify-center px-6 py-12 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in </h2>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
                            <form className="space-y-6" onSubmit={handleLoginSubmit}>
                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                    <div className="mt-2">
                                        <input id="email" name="email" type="email" onChange={handleEmailChange} value={email}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                    </div>
                                    <div className="mt-2">
                                        <input id="password" name="password" type="password" value={password} onChange={handlePasswordChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                                <div>
                                    <button type="submit" className="flex w-full justify-center rounded-md 
                                            bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm 
                                            hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Sign in</button>
                                </div>

                            </form>

                            <p className="mt-10 text-center text-sm text-gray-500">
                                Don't have an account?
                                <a className="font-semibold leading-6 text-blue-500 hover:text-blue-600" onClick={() => { setLogin(false) }}> Register here</a>
                            </p>
                        </div>
                    </div>
                </> :
                    <> <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign Up</h2>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form className="space-y-6" onSubmit={handleSignUpSubmit}>
                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                    <div className="mt-2">
                                        <input id="email" name="email" type="email" onChange={handleEmailChange} value={email}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                    </div>
                                    <div className="mt-2">
                                        <input id="password" name="password" type="password" value={password} onChange={handlePasswordChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>

                                <div>
                                    <button type="submit" className="flex w-full justify-center rounded-md 
                                            bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm 
                                            hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Register</button>
                                </div>
                            </form>

                            <p className="mt-10 text-center text-sm text-gray-500">
                                Already a member?
                                <a className="font-semibold leading-6 text-blue-500 hover:text-blue-600" onClick={() => { setLogin(true) }}> Sign In</a>
                            </p>
                        </div>
                    </div>
                    </>
            }
        </>

    );
};

export default Login;