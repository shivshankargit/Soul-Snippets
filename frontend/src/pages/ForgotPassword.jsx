import { useState } from "react"
import { useAuthStore } from "../store/authStore";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import { ArrowLeft, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const {isLoading, forgotPassword} = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await forgotPassword(email);
        setIsSubmitted(true);
    }

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center" >
                <div className="max-w-md w-full bg-white bg-opacity-50 backdrop-filter backdrop-blur-xl 
            rounded-2xl shadow-xl overflow-hidden p-6 border border-gray-300 
            m-4" >
                    <div className="p-8">
                        <h2 className='text-3xl font-bold mb-6 text-center text-4xl pt-6 bg-clip-text'>
                            Forgot Password
                        </h2>

                        {!isSubmitted ? (
                            <form onSubmit={handleSubmit}>
                                <p className="text-gray-800 mb-6 text-center">
                                    Enter your email address and we'll send you a link to reset your password.
                                </p>
                                <InputBox
                                    type='email'    
                                    placeholder='Email Address'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <div className="pt-4">
                                    <Button onClick={handleSubmit} label={"Send Reset Link"} isLoading={isLoading} />
                                </div>
                            </form>
                        ) : (
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 ">
                                    <Mail className="h-8 w-8 text-white"/>
                                </div>
                                    <p className="text-gray-800 mb-6 text-center">
                                    If an account exists for {email}, you will recieve a password reset link shortly.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="px-8 py-4 bg-black-900 bg-opacity-50 flex justify-center">
                        <Link to={"/signin"} className="text-sm text-black-400 hover:underline flex items-center">
                            <ArrowLeft className="h-4 w-4 mr-2"/> Back to Signin
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
};