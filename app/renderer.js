const IPFS = require('ipfs-http-client');
const ipfs = IPFS({ host: 'localhost', port: '5001', protocol: 'http' });

document.addEventListener('DOMContentLoaded', () => {
  const bookshelf = document.getElementById('bookshelf');

  async function addToIPFS(file) {
    const added = await ipfs.add(file);
    console.log('Added file:', added);
    return added;
  }

  function addToShelf(file) {
    const book = document.createElement('div');
    book.className = 'book';
    book.innerText = file.name;
    book.addEventListener('click', async () => {
      const data = await ipfs.cat(file.cid);
      // Display file content logic here
    });
    bookshelf.appendChild(book);
  }

  bookshelf.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  bookshelf.addEventListener('drop', async (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      const added = await addToIPFS(files[i]);
      addToShelf({ name: files[i].name, cid: added.cid });
    }
  });
});

