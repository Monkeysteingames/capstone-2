import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../context/UserContext";

// If we're not logged in send the user back to the landing page if attempting to access a protected route

const ProtectedRoute = ({ path, children }) => {
    const { currentUser } = useContext(UserContext);

    if (!currentUser) {
        return <Redirect to="/" />;
    };
    
    return (
            <Route exact path={path}>{children}</Route>
    );
};

export default ProtectedRoute;





