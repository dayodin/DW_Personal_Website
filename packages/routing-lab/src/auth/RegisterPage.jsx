import React from "react";
import { useNavigate } from "react-router";
import { UsernamePasswordForm } from "./UsernamePasswordForm";
import { sendPostRequest } from "./sendPostRequest";

export function RegisterPage({ onLogin }) {
    const navigate = useNavigate();

    const handleRegisterSubmit = async ({ username, password }) => {
        
        console.log("Registering:", username, password);
        try {
            const response = await sendPostRequest("/auth/register", { username, password });
            console.log(response.status)
            if (response.status === 201) {
                navigate("/");
                return null;
            } else if (response.status === 400) {
                return "Username already taken";
            } else {
                return "Unexpected error, please try again.";
            }
        } catch (error) {
            console.error("Registration error:", error);
            return "Server error, please try again later.";
        }
    };
  
    return (
        <div>
            <h2>Register a New Account</h2>
            <UsernamePasswordForm onSubmit={handleRegisterSubmit} />
        </div>
    );
}