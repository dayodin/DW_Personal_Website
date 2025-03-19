import { useState } from "react";
import { Routes, Route } from "react-router";

import { Homepage } from "./Homepage";
import { AccountSettings } from "./AccountSettings";
import { ImageGallery } from "./images/ImageGallery.jsx";
import { ImageDetails } from "./images/ImageDetails.jsx";
import { RegisterPage } from "./auth/RegisterPage.jsx";
import { LoginPage } from "./auth/LoginPage.jsx";
import { useImageFetching } from "./images/useImageFetching.js";
import { ProtectedRoute } from "./auth/ProtectedRoute.jsx";
import { MainLayout } from "./MainLayout.jsx";

function App() {
    const [username, setUsername] = useState("John Doe")
    const [authToken, setAuthToken] = useState(null);
    const { isLoading, fetchedImages } = useImageFetching("", authToken);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const usernameChange = (updatedUsername) => {
        setUsername(updatedUsername)
    }

    return (
        <div className={isDarkMode ? "dark-mode" : ""}>
            <Routes>
                <Route path="/" element={<MainLayout isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/> }>
                    <Route 
                        index
                        element={
                            <ProtectedRoute authToken={authToken}>
                                <Homepage userName={username} />
                            </ProtectedRoute>
                        }
                    />
                    <Route 
                        path="account" 
                        element={
                            <ProtectedRoute authToken={authToken}>
                                <AccountSettings usernameChange={usernameChange} />
                            </ProtectedRoute>
                        }
                    />
                    <Route 
                        path="images" 
                        element={
                            <ProtectedRoute authToken={authToken}>
                                <ImageGallery isLoading={isLoading} fetchedImages={fetchedImages} authToken={authToken}/> 
                            </ProtectedRoute>
                        }
                    />
                    <Route 
                        path="images/:imageId" 
                        element={
                            <ProtectedRoute authToken={authToken}>
                                <ImageDetails /> 
                            </ProtectedRoute>
                        } 
                    />
                </Route>
                <Route path="register" element={<RegisterPage onLogin={setAuthToken} />} />
                <Route path="login" element={<LoginPage onLogin={setAuthToken} />} />
            </Routes>
        </div >
    );
}

export default App
