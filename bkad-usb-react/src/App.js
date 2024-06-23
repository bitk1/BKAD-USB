import React from 'react';
import './App.css';
import Bookshelf from './Bookshelf';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>BKAD-USB: Bitknowledge Archive Device</h1>
            </header>
            <p>Drag and drop files onto the bookshelf to store them in IPFS. Click on the files to retrieve and view their content.</p>
            <Bookshelf />
        </div>
    );
}

export default App;

