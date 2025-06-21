const daftarBelanja = [
    { id: 1, nama: "Laptop Asus Vivobook", harga: 7500000, diskon: false },
    { id: 2, nama: "Mouse Logitech", harga: 250000, diskon: true },
    { id: 3, nama: "Keyboard Mechanical", harga: 500000, diskon: false },
    { id: 4, nama: "Kursi Gaming", harga: 1200000, diskon: true },
    { id: 5, nama: "Meja Belajar", harga: 900000, diskon: false },
    { id: 6, nama: "Pulpen Gel", harga: 5000, diskon: true },
    { id: 7, nama: "Buku Catatan A5", harga: 15000, diskon: false },
    { id: 8, nama: "Printer Epson", harga: 1300000, diskon: false },
    { id: 9, nama: "Tinta Printer", harga: 85000, diskon: true },
    { id: 10, nama: "Headset Gaming", harga: 450000, diskon: false },
    { id: 11, nama: "Ransel Sekolah", harga: 175000, diskon: false },
    { id: 12, nama: "Botol Minum", harga: 30000, diskon: true },
    { id: 13, nama: "Kalkulator Casio", harga: 225000, diskon: false },
    { id: 14, nama: "Papan Tulis", harga: 250000, diskon: false },
    { id: 15, nama: "Lampu Meja", harga: 100000, diskon: true },
    { id: 16, nama: "Flashdisk 32GB", harga: 80000, diskon: false },
    { id: 17, nama: "Tas Laptop", harga: 200000, diskon: true }
];

console.log("=== Seluruh Daftar Belanja ===");
daftarBelanja.forEach((item) => {
    console.log(`${item.nama} - Rp${item.harga} ${item.diskon ? "(Diskon!)" : ""}`);
});

let barangDiskon = daftarBelanja.filter(item => item.diskon)
console.log("\n=== Barang Diskon ===");
barangDiskon.forEach(item => {
    console.log(`${item.nama} - Rp${item.harga} - ${item.diskon ? "(Diskon!)" : ""}`)
})

barangMahal = daftarBelanja.filter(item => item.harga > 100000)
console.log(`\n=== Hapus Barang Mahal ( > Rp 100.000 ) ===`)
barangMahal.forEach(item => {
    console.log(`${item.nama} - Rp${item.harga}`)
})

console.log("\n=== Daftar Akhir Belanja ===")
daftarBelanja.forEach(item => {
    console.log(`${item.nama} - Rp${item.harga}`)
})

const filterSelect = document.getElementById('filter');
const tableBody = document.getElementById('tableBody');

function formatCurrency(amount) {
    return `Rp${amount.toLocaleString('id-ID')}`;
}

function renderTable(data) {
    tableBody.innerHTML = '';
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.id}</td>
          <td>${item.nama}</td>
          <td>${formatCurrency(item.harga)}</td>
          <td>${item.diskon ? '<span class="discount">Diskon!</span>' : '-'}</td>
        `;
        tableBody.appendChild(row);
    });
}

function filterData() {
    const filterValue = filterSelect.value;
    let filteredData = [...daftarBelanja];

    switch (filterValue) {
        case 'discount':
            filteredData = filteredData.filter(item => item.diskon);
            break;
        case 'expensive':
            filteredData = filteredData.filter(item => item.harga > 100000);
            break;
        case 'final':
            filteredData = filteredData.filter(item => item.harga <= 100000);
            break;
        default:
            break;
    }

    renderTable(filteredData);
}

function copyCode() {
    const codeElement = document.querySelector('.code-container code');
    const codeText = codeElement.textContent;
    const textarea = document.createElement('textarea');
    textarea.value = codeText;
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        const button = document.querySelector('.copy-button');
        button.classList.add('copied');
        button.querySelector('span').textContent = 'Copied';
        setTimeout(() => {
            button.classList.remove('copied');
            button.querySelector('span').textContent = 'Copy Code';
        }, 2000);
    } catch (err) {
        console.error('Failed to copy code: ', err);
        alert('Failed to copy code. Please try again.');
    } finally {
        document.body.removeChild(textarea);
    }
}

filterSelect.addEventListener('change', filterData);

renderTable(daftarBelanja);