import React, { useState, useEffect } from "react";
import Axios from "axios";

export const Test = () => {

    const [file, setFile] = useState(null);

    const handleUpload = () => {
        const formData = new FormData();
        formData.append("file", file);

        Axios.post("http://localhost:8080/images/upload-image", formData).then((response) => {
            console.log(response.data);
        });
    };

    useEffect(() => {
        const input = document.querySelector("#file");
        input.addEventListener("change", (event) => {
            setFile(event.target.files[0]);
        });
    }, []);

    return (
        <div>
            <input type="file" id="file" />
            <button onClick={handleUpload}>Upload</button>
        </div>
    )
}
