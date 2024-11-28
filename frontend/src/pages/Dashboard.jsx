import { useState } from "react";
import { Button } from "../components/Button";
import { useAuthStore } from "../store/authStore"
import { formatDate } from "../utils/date";
import toast from "react-hot-toast";

export const Dashboard = () => {
    const { logout, user, updatePreferences, isLoading } = useAuthStore();
    const [wantsQuotes, setWantsQuotes] = useState(user.wantsQuotes);
    

    const handleToggleQuotes = async () => {
        try {
            await updatePreferences({ userId: user._id, wantsQuotes: !wantsQuotes });
            setWantsQuotes(!wantsQuotes);
            toast.success('Email preferences updated successfully.');
        } catch (error) {
            toast.error(error.message || 'Failed to update preferences.');
        }
    };

const handleLogout = () => {
    logout();
}

    return(
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className='max-w-md w-full bg-white bg-opacity-50 backdrop-filter backdrop-blur-xl 
                rounded-2xl shadow-xl overflow-hidden p-6 border border-gray-300 m-4'>

                    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-lg">
                        <p>
                            <strong>Quote Delivered!</strong> Check your email inbox for today's inspiring quote.
                        </p>
                    </div>

                    <h2 className='text-3xl font-bold mb-6 text-center  bg-clip-text'>
                        Dashboard
                    </h2>

                    <div className="space-y-6">
                        <div className='w-full bg-gray-800 text-white font-medium rounded-lg text-sm px-5 py-2.5 mb-4 border border-gray-700'>
                            <h3 className='text-xl font-semibold text-white-400 mb-3'>Profile Information</h3>
                            <p className='text-gray-300'>Name: {user.username}</p>
                            <p className='text-gray-300'>Email: {user.email}</p>
                        </div>

                        <div className='w-full bg-gray-800 text-white font-medium rounded-lg text-sm px-5 py-2.5 mb-4 border border-gray-700'>
                            <h3 className='text-xl font-semibold text-white-400 mb-3'>Account Activity</h3>
                            <p className='text-gray-300'>
                                <span className='font-bold'>Joined: </span>
                                {new Date(user.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>
                            <p className='text-gray-300'>
                                <span className='font-bold'>Last Login: </span>

                                {formatDate(user.lastLogin)}
                            </p>
                        </div>

                        <div className="w-full bg-gray-800 text-white font-medium rounded-lg text-sm px-5 py-2.5 mb-4 border border-gray-700">
                            <h3 className="text-xl font-semibold text-white-400 mb-3">Email Preferences</h3>
                            <label className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    checked={wantsQuotes}
                                    onChange={handleToggleQuotes}
                                    className="form-checkbox h-5 w-5 text-green-600"
                                />
                                <span className="text-gray-300">Receive daily quotes</span>
                            </label>
                        </div>

                        <div className="-mt-2">
                            <Button onClick={handleLogout} label={"Logout"} isLoading={isLoading} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    
}