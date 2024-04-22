import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';
import Heading from '../components/Heading';
const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate()


    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading title={"Send Money"} />
                    <div className='p-6'>
                        <div className="flex items-center text-left space-x-3">
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                            </div>
                            <h3 className="text-2xl font-semibold">{name}</h3>
                        </div>
                        <div className="space-y-4 mt-5">
                            <div className="space-y-2 text-left">

                                <input
                                    onChange={(e) => {
                                        setAmount(e.target.value);
                                    }}
                                    type="number"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    id="amount"
                                    placeholder="Amount (in INR)"
                                />
                            </div>
                            <button onClick={async () => {
                                try {
                                    await axios.post("http://localhost:3000/api/v1/account/transfer", {
                                        to: id,
                                        amount
                                    }, {
                                        headers: {
                                            Authorization: "Bearer " + localStorage.getItem("token")
                                        }
                                    });
                                    setShowPopup(true); // Show the popup on successful transfer
                                } catch (error) {
                                    console.error("Error initiating transfer:", error);
                                }
                            }} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                                Initiate Transfer
                            </button>
                            {showPopup && (
                                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                                    <div className="bg-white rounded-lg p-6">
                                        <p>{amount} rupees transferred to {name}'s account successfully</p>
                                        <button onClick={() => {
                                            setShowPopup(false)
                                            navigate("/dashboard")
                                            }} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">Close</button>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default SendMoney