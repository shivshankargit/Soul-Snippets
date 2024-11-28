import { useEffect, useState } from "react"
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signin, isLoading, error, clearError } = useAuthStore();

    useEffect(() => {
        clearError();
    }, [clearError]);


    const handleSignin = async (e) => {
        e.preventDefault();
        await signin(email, password);
    };

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign in"} />
                <SubHeading label={"Enter your credentials to access your account"} />

                <form onSubmit={handleSignin}>
                    <InputBox onChange={e => {
                        setEmail(e.target.value);
                    }} placeholder="levi@gmail.com" label={"Email"} />

                    <InputBox onChange={e => {
                        setPassword(e.target.value);
                    }} placeholder="123456" label={"password"} />

                    <div className='flex items-center mb-1'>
                        <Link to='/forgot-password' className='py-2 text-sm flex justify-center hover:underline'>
                            Forgot password?
                        </Link>
                    </div>
                    {error && <p className='text-red-500 font-semibold mt-2 text-left'>{error}</p>}

                    <div className="pt-4">
                        <Button onClick={handleSignin} label={"Sign in"} isLoading={isLoading} />
                    </div>
                </form>
                <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />

            </div>
        </div>
    </div>
}