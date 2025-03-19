import { useState, useId } from "react";

function readAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.onload = () => resolve(fr.result);
        fr.onerror = (err) => reject(err);
        fr.readAsDataURL(file);
    });
}

export function ImageUploadForm({ authToken, onUploadSuccess }) {
    const fileInputId = useId();
    const [imageFile, setImageFile] = useState(null);
    const [title, setTitle] = useState("");
    const [preview, setPreview] = useState("");
    const [error, setError] = useState("");
    const [isPending, setIsPending] = useState(false);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            try {
                const dataUrl = await readAsDataURL(file);
                setPreview(dataUrl);
            } catch (err) {
                console.error("Error reading file:", err);
                setError("Failed to load image preview.");
            }
        }
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!imageFile || !title.trim()) {
            setError("Please select an image and provide a title.");
            return;
        }
        setError("");
        setIsPending(true);

        const formData = new FormData();
        formData.append("image", imageFile);
        formData.append("name", title);

        try {
            console.log(authToken)
            console.log(formData)
            const response = await fetch("/api/images", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${authToken}`,
                },
                body: formData,
            });
            if (!response.ok) {
                setError("Upload failed. Please try again.");
            } else {
                setImageFile(null);
                setTitle("");
                setPreview("");
                if (onUploadSuccess) {
                    onUploadSuccess();
                }
            }
        } catch (err) {
            console.error("Network error:", err);
            setError("Network error. Please try again.");
        }
        setIsPending(false);
    };

  return (
    <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor={fileInputId}>Choose image to upload:</label>
            <input
                id={fileInputId}
                name="image"
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={handleFileChange}
            />
        </div>
        <div>
            <label>
                <span>Image title: </span>
                <input name="name" value={title} onChange={handleTitleChange} />
            </label>
        </div>
        <div>
            {preview && (
                <img
                style={{ maxWidth: "20em" }}
                src={preview}
                alt="Image preview"
                />
            )}
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={isPending}>
            Confirm upload
        </button>
    </form>
  );
}
