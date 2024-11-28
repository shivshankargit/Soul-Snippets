import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import toast from "react-hot-toast";

export const ResetPassword =  () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {resetPassword, error, isLoading, message} = useAuthStore();

    const {token} = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        if (password !== confirmPassword) {
            alert("Password do not match");
            return;
        }
        try {
            await resetPassword(token, password);

            toast.success("Password reset successfully, redirecting to signin page...");
            setTimeout(() => {
                navigate("/signin");
            }, 2000);
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Error resetting password");
        }
    };

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center" >
                <div className="max-w-md w-full bg-white bg-opacity-50 backdrop-filter backdrop-blur-xl 
                rounded-2xl shadow-xl overflow-hidden p-6 border border-gray-300 
                m-4">
                    <div className='p-8'>
                        <h2 className='text-3xl font-bold mb-6 text-center text-4xl pt-6 bg-clip-text'>
                            Reset Password
                        </h2>
                        {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
                        {message && <p className='text-green-500 text-sm mb-4'>{message}</p>}

                        <form onSubmit={handleSubmit}>
                            <InputBox
                                type='password'
                                placeholder='New Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <InputBox
                                type='password'
                                placeholder='Confirm New Password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <div className="pt-4">
                                <Button onClick={handleSubmit} label={"Set New Password"} isLoading={isLoading} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}