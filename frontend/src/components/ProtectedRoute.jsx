import { Route, redirect } from "react-router-dom";

const ProtectedRoute = ({ component, ...rest }) => {
    // Check if user is signed in (you can implement this logic based on your authentication mechanism)
    const isAuthenticated = localStorage.getItem("token") !== null;

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? <Route {...rest} element={<Component />} /> : redirect('/signup')
            }
        />
    );
};

export default ProtectedRoute;
