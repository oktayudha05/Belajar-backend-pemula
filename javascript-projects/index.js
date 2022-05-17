// const pesan = (nama) => {
//     console.log(`hallo ${nama}`);
// }

// pesan('rio')

//! Penggunaan process.argv[] untuk ngambil nilai di terminal
let firstName = process.argv[2];
let lastName = process.argv[3];
 
const jikaGaada = (namaNilai) => {
    if (namaNilai == undefined) {
        namaNilai = ""
    }
    return namaNilai;
}

console.log(`Hello ${jikaGaada(firstName)} ${jikaGaada(lastName)}`);