import React, { useState, useEffect } from 'react';
import { create } from 'ipfs-http-client';

const ipfs = create({ host: 'localhost', port: '5001', protocol: 'http' });

const Bookshelf = () => {
    const [files, setFiles] = useState([]);

    // Function to load all files from IPFS
    const loadFiles = async () => {
        try {
            const files = [];
            for await (const file of ipfs.pin.ls()) {
                if (file.type === 'recursive') {
                    files.push({ name: file.cid.toString(), cid: file.cid.toString() });
                }
            }
            setFiles(files);
        } catch (error) {
            console.error('Error loading files from IPFS:', error);
        }
    };

    // Load files when the component mounts
    useEffect(() => {
        loadFiles();
    }, []);

    const handleFileUpload = async (event) => {
        const uploadedFiles = event.target.files;
        const newFiles = [];

        for (let i = 0; i < uploadedFiles.length; i++) {
            const file = uploadedFiles[i];
            console.log('Uploading file:', file.name);

            try {
                const added = await ipfs.add(file);
                console.log('File added to IPFS:', added);
                newFiles.push({ name: file.name, cid: added.cid.toString() });
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }

        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const handleFileRetrieval = async (cid, name) => {
        console.log('Retrieving file:', name);

        try {
            const fileContent = await ipfs.cat(cid);
            const content = new TextDecoder().decode(fileContent);
            alert(`File content for ${name}: ${content}`);
        } catch (error) {
            console.error('Error retrieving file:', error);
        }
    };

    return (
        <div style={{ border: '1px solid black', padding: '20px', minHeight: '200px', marginTop: '20px' }}>
            <h3>Bookshelf</h3>
            <input type="file" multiple onChange={handleFileUpload} />
            <div>
                {files.map((file, index) => (
                    <div key={index} onClick={() => handleFileRetrieval(file.cid, file.name)} style={{ border: '1px solid gray', margin: '5px', padding: '5px', cursor: 'pointer' }}>
                        {file.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Bookshelf;

