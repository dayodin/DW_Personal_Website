import { Link } from "react-router";

import { ImageUploadForm } from "./ImageUploadForm";

import "./ImageGallery.css";

export function ImageGallery(props) {

    const imageElements = props.fetchedImages.map((image) => (
        <div key={image._id} className="ImageGallery-photo-container">
            <Link to={"/images/" + image._id}>
                <img src={image.src} alt={image.name}/>
            </Link>
        </div>
    ));

    return (
        <>
            <h2>Image Gallery</h2>
            <h3>Upload a New Image</h3>
            <ImageUploadForm authToken={props.authToken} />
            {props.isLoading && "Loading..."}
            <div className="ImageGallery">
                {imageElements}
            </div>
        </>
    );
}
