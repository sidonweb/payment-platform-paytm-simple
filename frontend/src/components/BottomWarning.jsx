import { Link } from "react-router-dom"

const BottomWarning = ({text, to, buttontext}) => {
    return <div className="py-2 text-sm flex justify-center">
        <div>
            {text}
        </div>
        <Link className="pointer underline pl-1 cursor-pointer" to={to}>
            {buttontext}
        </Link>
    </div>
}

export default BottomWarning