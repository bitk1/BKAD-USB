import React, { useState } from 'react';
import { create } from 'ipfs-http-client';

const ipfs = create({ host: 'localhost', port: '5001', protocol: 'http' });

const Bookshelf = () => {
    const [files, setFiles] = useState([]);

    const handleDrop = async (event) => {
        event.preventDefault();
        const uploadedFiles = event.dataTransfer.files;
        for (let i = 0; i < uploadedFiles.length; i++) {
            const file = uploadedFiles[i];
            const added = await ipfs.add(file);
            setFiles((prevFiles) => [...prevFiles, { name: file.name, cid: added.cid.toString() }]);
        }
    };

    return (
        <div 
            onDrop={handleDrop}
            onDragOver={(event) => event.preventDefault()}
            style={{ border: '1px solid black', padding: '20px', minHeight: '200px' }}
        >
            <h3>Bookshelf</h3>
            <div>
                {files.map((file, index) => (
                    <div key={index} onClick={async () => {
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

