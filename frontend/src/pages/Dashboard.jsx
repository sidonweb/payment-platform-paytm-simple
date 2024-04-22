import AppBar from "../components/AppBar"
import Users from "../components/Users"
import Balance from "../components/Balance"

const Dashboard = () => {
    return <div>
    <AppBar />
    <div className="m-8 mt-20">
        <Balance />
        <Users />
    </div>
</div>
}

export default Dashboard