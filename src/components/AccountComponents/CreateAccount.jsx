"use client";
import { getAccessToken } from "@/utils/getAccessToken";
import { useEffect ,useState } from "react";

const CreateAccount = ({ addAccount, setAddAccount }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const startOAuth = () => {
        window.location.href = '/api/auth/linkedin';
    };

    return (

        <div className=" absolute popContainer w-[68vw] h-[80vh] bg-[#ffffff]/50  top-[0%]  z-[101] rounded-[1rem] flex flex-col p-[1.7rem]">

            {/* Cancel bar*/}
            <p onClick={() => setAddAccount(false)} className="w-[100%] flex justify-end items-center cursor-pointer h-[2rem] text-[#dc75ff] font-bold">X</p>

            {/* User Detail */}
            <button onClick={startOAuth}>Sign in with LinkedIn</button>
            {loading && <p>Loading user data...</p>}
            {user && (
                <div>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            )}
        </div>

    )
}

export default CreateAccount