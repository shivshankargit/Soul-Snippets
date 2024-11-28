import { useState } from "react"
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export const Signup =  () => {
    const[username, setUsername] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const navigate = useNavigate();

    const { signup, error, isLoading } = useAuthStore();


    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            await signup(email, password, username);
            navigate("/verify-email");
        } catch (error) {
            console.log(error);
        }
    }

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign up"}/>
                <SubHeading label={"Enter your information to create account"}/>

                <form onSubmit={handleSignup}>
                    <InputBox onChange={e => {
                    setUsername(e.target.value);
                }} placeholder="levi" label={"Username"} />

                <InputBox onChange={e => {
                    setEmail(e.target.value);
                }} placeholder="levi@gmail.com" label={"Email"}/>

                <InputBox onChange={e => {
                    setPassword(e.target.value);
                }} placeholder="12345" label={"Password"} />
                {error && <p className='text-red-500 font-semibold mt-2 text-left'>{error}</p>}

                <PasswordStrengthMeter password={password} />

                <div className="pt-4">
                        <Button onClick={handleSignup} label={"Sign up"} isLoading={isLoading} />
                </div>
                </form>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />

            </div>
        </div>
    </div>
}