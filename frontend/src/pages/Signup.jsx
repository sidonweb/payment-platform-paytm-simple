import Heading from "../components/Heading"
import SubHeading from "../components/SubHeading"
import InputBox from "../components/InputBox"
import Button from "../components/Button"
import BottomWarning from "../components/BottomWarning"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
const Signup = () => {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading title={"Sign Up"} />
                <SubHeading text={"Enter your information to create an account"} />
                <InputBox onChange={e => {
                    setFirstName(e.target.value);
                }} label={"First Name"} placeholder={"John"} />
                <InputBox onChange={e => {
                    setLastName(e.target.value);
                }} label={"Last Name"} placeholder={"Doe"} />
                <InputBox onChange={e => {
                    setUsername(e.target.value);
                }} label={"Email"} placeholder={"johndoe@xyz.com"} />
                <InputBox onChange={e => {
                    setPassword(e.target.value);
                }} label={"Password"} placeholder={"****"} />
                <div className="pt-4">
                    <Button onClick={async () => {
                        console.log(username, firstname, lastname, password);
                        const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                            username,
                            firstname,
                            lastname,
                            password
                        });
                        localStorage.setItem("token", response.data.token)
                        navigate("/dashboard")
                    }} label={"Sign Up"} />
                </div>
                <BottomWarning text={"Already have an account?"} buttontext={"Sign in"} to={"/signin"} />
            </div>
        </div>

    </div >
}

export default Signup