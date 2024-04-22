import { useState, useEffect } from "react";
import axios from "axios";

const Balance = () => {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                // Fetch the user's balance from the server
                const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                // Update the balance state with the fetched balance
                setBalance(response.data.balance);
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        };

        fetchBalance();
    }, []);

    return (
        <div className="flex">
            <div className="font-bold text-lg">Wallet Balance:</div>
            <div className="font-semibold ml-2 text-lg">₹{balance.toFixed(2)}</div>
        </div>
    );
};

export default Balance;
