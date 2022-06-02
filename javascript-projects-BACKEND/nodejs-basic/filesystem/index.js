// TODO: tampilkan teks pada notes.txt pada console.
const fs = require('fs');

const callbackBacaFile = (error, data) => {
    if (error) {
        console.log(`data gagal dibaca karena ${error}`);
        return;
    }

    console.log(data);
}

fs.readFile('notes.txt', 'utf-8', callbackBacaFile)