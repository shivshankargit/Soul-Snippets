import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SubHeading } from "../components/SubHeading";
import { Button } from "../components/Button";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";


export const VerifyEmail = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    const {error, isLoading, verifyEmail} = useAuthStore();

    const handleChange = (index, value) => {
        const newCode = [...code];

        if(value.length > 1) {
            const pastedCode = value.slice(0, 6).split("");
            for(let i=0; i < 6; i++){
                if (index + i < 6) {
                newCode[i] = pastedCode[i] || "";
            }
        }
            setCode(newCode);

            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRefs.current[focusIndex].focus();
        } else {
            newCode[index] = value;
            setCode(newCode);

            if (value && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if(e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificationCode = code.join("");
        try {
            await verifyEmail(verificationCode);
            toast.success("Email verified successfully");
            navigate("/signin");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(code.every((digit) => digit !== "")) {
            handleSubmit(new Event("submit"));
        }
    }, [code]);

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center" >
            <div className="max-w-md w-full bg-white bg-opacity-50 backdrop-filter backdrop-blur-xl 
            rounded-2xl shadow-xl overflow-hidden p-6 border border-gray-300 
            m-4">
                <h2 className='text-3xl font-bold mb-6 text-center text-4xl pt-6 bg-clip-text'>
					Verify Your Email
				</h2>
                <SubHeading label={"Enter the 6-digit code sent to your email address."} />

                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div className='flex flex-col'>
                        <div className='flex justify-between'>
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type='text'
                                    maxLength='6'
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className='w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg 
                                    focus:border-green-500 focus:outline-none'
                                />
                            ))}
                        </div>
                        {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
                    </div>
                    <div className="pt-4">
                        <Button onClick={handleSubmit} label={"Verify Email"} isLoading={isLoading} />
                    </div>
                </form>
            </div>
        </div>
    </div>
}