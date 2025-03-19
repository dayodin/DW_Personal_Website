import React from "react";
import { Link, useNavigate } from "react-router";
import { UsernamePasswordForm } from "./UsernamePasswordForm";
import { sendPostRequest } from "./sendPostRequest";

export function LoginPage({ onLogin }) {
    const navigate = useNavigate();

    const handleLoginSubmit = async ({ username, password }) => {
        console.log("Logging in:", username, password);
        try {
            const response = await sendPostRequest("/auth/login", { username, password });
            
            if (response.status === 200) {
                const data = await response.json();
                const token = data.token;

                console.log("Authentication token:", token);
                
                onLogin(token);
                navigate("/");
                return null;
            } else if (response.status === 401) {
                return data.message || "Incorrect username or password";
            } else if (response.status === 500) {
                return "Server error, please try again later.";
            } else {
                return "Unexpected error, please try again.";
            }
        } catch (error) {
            console.error("Login error:", error);
            return "Server error, please try again later.";
        }
    };
    
    
    return (
        <div>
            <h2>Login</h2>
            <UsernamePasswordForm onSubmit={handleLoginSubmit} />
            <p>
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
}