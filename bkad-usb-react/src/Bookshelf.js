import React, { useState } from 'react';
import { create } from 'ipfs-http-client';

const ipfs = create({ host: 'localhost', port: '5001', protocol: 'http' });

const Bookshelf = () => {
    const [files, setFiles] = useState([]);

    const handleFileUpload = async (event) => {
        const uploadedFiles = event.target.files;
        for (let i = 0; i < uploadedFiles.length; i++) {
            const file = uploadedFiles[i];
            console.log('Uploading file:', file.name);
            const added = await ipfs.add(file);
            console.log('File added to IPFS:', added);
            setFiles((prevFiles) => [...prevFiles, { name: file.name, cid: added.cid.toString() }]);
        }
    };

    return (
        <div style={{ border: '1px solid black', padding: '20px', minHeight: '200px', marginTop: '20px' }}>
            <h3>Bookshelf</h3>
            <input type="file" multiple onChange={handleFileUpload} />
            <div>
                {files.map((file, index) => (
                    <div key={index} onClick={async () => {
                        console.log('Retrieving file:', file.name);
                        const fileContent = await ipfs.cat(file.cid);
                        alert(`File content: ${new TextDecoder().decode(fileContent)}`);
                    }} style={{ border: '1px solid gray', margin: '5px', padding: '5px', cursor: 'pointer' }}>
                        {file.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Bookshelf;

