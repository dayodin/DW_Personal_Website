import { useState } from "react";
import { Routes, Route } from "react-router";

import { Homepage } from "./Homepage";
import { AccountSettings } from "./AccountSettings";
import { ImageGallery } from "./images/ImageGallery.jsx";
import { ImageDetails } from "./images/ImageDetails.jsx";
import { useImageFetching } from "./images/useImageFetching.js";
import { MainLayout } from "./MainLayout.jsx";

function App() {
    const [username, setUsername] = useState("John Doe")
    const { isLoading, fetchedImages } = useImageFetching("");
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
                        element={<Homepage userName={username} /> } 
                    />
                    <Route 
                        path="account" 
                        element={<AccountSettings usernameChange={usernameChange} /> } 
                    />
                    <Route 
                        path="images" 
                        element={<ImageGallery isLoading={isLoading} fetchedImages={fetchedImages} /> } 
                    />
                    <Route 
                        path="images/:imageId" 
                        element={<ImageDetails /> } 
                    />
                </Route>
            </Routes>
        </div >
    );
}

export default App
