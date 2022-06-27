import React, { useState } from 'react'
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/';

function ImageUploadPreviewComponent() {

    const [file, setFile] = useState(null)
    const [fileUrl, setFileUrl] = useState(null)

    const uploadMultipleFiles = (e) => {
        // Append an array
        const selectedFIlesUrl = [];
        const selectedFIles = [];

        const targetFiles = e.target.files;
        const targetFilesObject = [...targetFiles]
        targetFilesObject.map((file) => {
            selectedFIles.push(file)
            return selectedFIlesUrl.push(URL.createObjectURL(file))
        })
        setFileUrl(selectedFIlesUrl);
        setFile(selectedFIles);
    }

    const uploadFiles = (e) => {
        e.preventDefault()
        console.log(file)
        if (file && file.length) {
            const config = {
                headers: {
                    'content-type': 'multipart/form-data' // <-- Set header for 
                }
            }

            const formData = new FormData();
            formData.append('image', file);
            axios.post(BASE_URL + 'upload', formData, config).then(response => {
                console.log('Responce --------------', response)
            }).catch(err => {
                alert(err.message);
            });

        } else {
            alert('Add Image');
        }
    }

    return (
        <div>
            <form>
                <div className="form-group multi-preview">
                    {(fileUrl || []).map((url, index) => (
                        <img key={`li-${index}`} src={url} alt="..." />
                    ))}
                </div>
                <div className="form-group">
                    <input type="file" className="form-control" onChange={uploadMultipleFiles} multiple />
                </div>
                <button type="button" className="btn btn-danger btn-block" onClick={uploadFiles}>Upload</button>
            </form >
        </div>
    )
}

export default ImageUploadPreviewComponent
