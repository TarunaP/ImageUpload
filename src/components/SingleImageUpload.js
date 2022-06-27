import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/';

function SingleImageUpload() {
    const [invalidImage, setInvalideImage] = useState(null)  // handle the message of the image validation
    const [handleResponse, sethandleResponse] = useState(null) // handle the API response
    const [imageUrl, setImageUrl] = useState(null) // to store uploaded image path
    const [selectedFile, setSelectedFile] = useState(null) // to store selected file
    const [reader, setReader] = useState(null)

    useEffect(() => {
        setReader(new FileReader())
    }, [])

    const onChangeFile = event => {
        const imageFile = event.target.files[0];
        if (!imageFile) {
            setInvalideImage('Please select image.');
            return false;
        }

        if (!imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
            setInvalideImage('Please select valid image.');
            return false;
        }

        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                setSelectedFile(imageFile)
                setInvalideImage(null);
            };
            img.onerror = () => {
                setInvalideImage('Invalid image content.');
                return false;
            };
            // debugger
            img.src = e.target.result;
        };
        reader.readAsDataURL(imageFile);
    }

    // handle click event of the upload button
    const handleUpload = () => {
        if (!selectedFile) {
            sethandleResponse({
                isSuccess: false,
                message: "Please select image to upload."
            });
            return false;
        }
        const config = {
            headers: {
                'content-type': 'multipart/form-data' // <-- Set header for 
            }
        }

        const formData = new FormData();
        formData.append('image', selectedFile);
        axios.post(BASE_URL + 'upload', formData, config).then(response => {
            sethandleResponse({
                handleResponse: {
                    isSuccess: response.data.status === 200,
                    message: response.data.message
                },
            });
            console.log('response.data', response.data.data)
            setImageUrl(response.data.data)
        }).catch(err => {
            alert(err.message);
        });
    }

    return (
        <div>
            <p >Select Image:</p>
            <div style={{ marginBottom: 10 }} className='form-group'>
                <input className="form-control-input" type="file" onChange={onChangeFile} />
            </div>
            {invalidImage && <p >{invalidImage}</p>}
            <input className="btn btn-success" type="button" value="Upload" onClick={handleUpload} />
            {handleResponse && <p>{handleResponse.message}</p>}

            <p style={{ marginTop: 30 }}>Uploaded Image:</p>
            {imageUrl && <img src={imageUrl} className="img-thumbnail" alt="Uploaded File" height="100" width="100" />}
        </div>
    )
}

export default SingleImageUpload