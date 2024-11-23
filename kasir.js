




function checkLogin() {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn !== 'true') {
        window.location.href = 'login.html';
    }
}

function logout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    localStorage.setItem('loginAttempts', JSON.stringify({}));
    window.location.href = 'login.html';
}

window.onload = checkLogin;




function detailBarang(index) {
    let barang = JSON.parse(localStorage.getItem('barang')) || [];
    const item = barang[index];

    Swal.fire({
        title: '<h2 style="color: #007BFF; font-weight: bold;">Detail Barang</h2>',
        html: `
            <p style="text-align: left; font-size: 20px;">
                <strong style="color: #333;">Kode:</strong> <span style="color: #ff0049;">${item.kode}</span>
            </p>
            <p style="text-align: left; font-size: 20px;">
                <strong style="color: #333;">Nama:</strong> <span style="color: #ff0049;">${item.nama}</span>
            </p>
            <p style="text-align: left; font-size: 20px;">
                <strong style="color: #333;">Harga Beli:</strong> <span style="color: #ff0049;">${formatRupiah(item.hargaBeli)}</span>
            </p>
            <p style="text-align: left; font-size: 20px;">
                <strong style="color: #333;">Harga Jual:</strong> <span style="color: #ff0049;">${formatRupiah(item.hargaJual)}</span>
            </p>
            <p style="text-align: left; font-size: 20px;">
                <strong style="color: #333;">Stok:</strong> <span style="color: #ff0049;">${item.stok}</span>
            </p>
            <p style="text-align: left; font-size: 20px;">
                <strong style="color: #333;">Kode Toko:</strong> <span style="color: #ff0049;">${item.kodeToko}</span>
            </p>
            <p style="text-align: left; font-size: 20px;">
                <strong style="color: #333;">Terjual:</strong> <span style="color: #ff0049;">${item.terjual}</span>
            </p>
            <p style="text-align: left; font-size: 20px;">
                <strong style="color: #333;">Keuntungan:</strong> <span style="color: #ff0049;">${formatRupiah(item.terjual * (item.hargaJual - item.hargaBeli))}</span>
            </p>
        `,
        icon: 'info',
        confirmButtonText: 'Tutup',
        customClass: {
            popup: 'swal2-custom-popup'
        }
    });
}


function editBarang(index) {
    Swal.fire({
        title: 'Masukkan PIN',
        input: 'password',
        inputLabel: 'PIN',
        inputPlaceholder: 'Masukkan PIN Anda',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        cancelButtonText: 'Batal',
    }).then((result) => {
        if (result.isConfirmed && result.value === '451') {
            let barang = JSON.parse(localStorage.getItem('barang')) || [];
            const item = barang[index];

            Swal.fire({
                title: 'Kode Barang',
                input: 'text',
                inputValue: item.kode,
                inputLabel: 'Masukkan kode barang',
            }).then(({ value: kodeBarang }) => {
                if (kodeBarang) {
                    Swal.fire({
                        title: 'Nama Barang',
                        input: 'text',
                        inputValue: item.nama,
                        inputLabel: 'Masukkan nama barang',
                    }).then(({ value: namaBarang }) => {
                        if (namaBarang) {
                            Swal.fire({
                                title: 'Harga Beli',
                                input: 'number',
                                inputValue: item.hargaBeli,
                                inputLabel: 'Masukkan harga beli',
                            }).then(({ value: hargaBeli }) => {
                                if (hargaBeli) {
                                    Swal.fire({
                                        title: 'Harga Jual',
                                        input: 'number',
                                        inputValue: item.hargaJual,
                                        inputLabel: 'Masukkan harga jual',
                                    }).then(({ value: hargaJual }) => {
                                        if (hargaJual) {
                                            Swal.fire({
                                                title: 'Stok Barang',
                                                input: 'number',
                                                inputValue: item.stok,
                                                inputLabel: 'Masukkan stok barang',
                                            }).then(({ value: stokBarang }) => {
                                                if (stokBarang) {
                                                    Swal.fire({
                                                        title: 'Kode Toko',
                                                        input: 'text',
                                                        inputValue: item.kodeToko,
                                                        inputLabel: 'Masukkan kode toko',
                                                    }).then(({ value: kodeToko }) => {
                                                        if (kodeBarang && namaBarang && hargaBeli && hargaJual && stokBarang && kodeToko) {
                                                            barang[index] = {
                                                                kode: kodeBarang,
                                                                nama: namaBarang,
                                                                hargaBeli: parseFloat(hargaBeli),
                                                                hargaJual: parseFloat(hargaJual),
                                                                stok: parseInt(stokBarang),
                                                                kodeToko: kodeToko,
                                                                terjual: item.terjual
                                                            };
                                                            localStorage.setItem('barang', JSON.stringify(barang));
                                                            loadBarang();
                                                        } else {
                                                            Swal.fire('Error', 'Lengkapi data barang', 'error');
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        } else {
            Swal.fire('Error', 'PIN salah', 'error');
        }
    });
}


function hapusBarang(index) {
    Swal.fire({
        title: 'Konfirmasi',
        text: 'Apakah Anda yakin ingin menghapus barang ini?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.isConfirmed) {
            let barang = JSON.parse(localStorage.getItem('barang')) || [];
            barang.splice(index, 1);
            localStorage.setItem('barang', JSON.stringify(barang));
            loadBarang();
            Swal.fire('Berhasil', 'Barang berhasil dihapus', 'success');
        } else {
            Swal.fire('Batal', 'Penghapusan dibatalkan', 'info');
        }
    });
}

let pendingTimer; // Timer for 10-minute timeout
let archivedItems = []; // Array to store pending items

// Load cart items from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    loadKeranjang(); // Load items in the cart
    checkPendingStatus(); // Check if Pending or Unpending button should be displayed
});

// Add items to the cart
function tambahKeKeranjang() {
    const kodeNamaBarang = document.getElementById('kodeNamaBarang').value;
    const jumlahBarang = document.getElementById('jumlahBarang').value;

    if (kodeNamaBarang !== '' && jumlahBarang) {
        if (!/^\d+$/.test(jumlahBarang)) {
            Swal.fire('Error', 'Jumlah barang harus berupa angka positif', 'error');
            return;
        }

        let barang = JSON.parse(localStorage.getItem('barang')) || [];
        let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
        let diskon = JSON.parse(localStorage.getItem('diskon')) || [];

        const item = barang.find(item => item.kode === kodeNamaBarang || item.nama === kodeNamaBarang);
        if (!item) {
            Swal.fire('Error', 'Barang tidak ditemukan', 'error');
            return;
        }

        const jumlahInt = parseInt(jumlahBarang);
        if (jumlahInt <= 0) {
            Swal.fire('Error', 'Jumlah barang tidak boleh kurang dari atau sama dengan nol', 'error');
            return;
        }

        if (item.stok < jumlahInt) {
            Swal.fire({
                icon: 'error',
                title: 'Stok Tidak Mencukupi!',
                text: `Stok yang tersedia hanya ${item.stok} barang.`,
                confirmButtonText: 'OK'
            });
            return;
        }

        let diskonItem = diskon.find(d => d.kode === item.kode);
        let hargaSetelahDiskon = item.hargaJual;
        let potongan = 0;

        if (diskonItem) {
            potongan = hargaSetelahDiskon * (diskonItem.persenDiskon / 100);
            hargaSetelahDiskon -= potongan;
        }

        const existingItem = keranjang.find(k => k.kode === item.kode);
        if (existingItem) {
            existingItem.jumlah += jumlahInt;
            existingItem.total = existingItem.jumlah * hargaSetelahDiskon;
            existingItem.potongan = diskonItem ? diskonItem.persenDiskon : 0;
        } else {
            keranjang.push({
                kode: item.kode,
                nama: item.nama,
                jumlah: jumlahInt,
                harga: item.hargaJual,
                total: hargaSetelahDiskon * jumlahInt,
                potongan: diskonItem ? diskonItem.persenDiskon : 0
            });
        }

        item.stok -= jumlahInt;
        item.terjual += jumlahInt;

        if (item.stok === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Stok Habis!',
                text: `Barang dengan kode ${item.kode} telah habis.`,
                confirmButtonText: 'OK'
            });
        }

        localStorage.setItem('barang', JSON.stringify(barang));
        localStorage.setItem('keranjang', JSON.stringify(keranjang));

        loadKeranjang();

        document.getElementById('kodeNamaBarang').value = '';
        document.getElementById('jumlahBarang').value = '';

        // Show Pending button if there are items in the cart
        if (keranjang.length > 0) {
            document.getElementById('pendingButton').style.display = 'inline';
        }

        // Reset the pending timer every time an item is added
        resetPendingTimer();
    } else {
        Swal.fire('Error', 'Lengkapi data transaksi', 'error');
    }
}

// Load items in the cart and display
function loadKeranjang() {
    let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
    const tabelKeranjang = document.getElementById('tabelKeranjang');
    tabelKeranjang.innerHTML = '';
    let total = 0;

    keranjang.forEach((item, index) => {
        const row = tabelKeranjang.insertRow();
        row.insertCell(0).innerText = item.nama;
        row.insertCell(1).innerText = item.jumlah;
        row.insertCell(2).innerText = formatRupiah(item.harga);
        row.insertCell(3).innerText = item.potongan ? item.potongan + '%' : '0%';
        row.insertCell(4).innerText = formatRupiah(item.total);
        total += item.total;

        const aksiCell = row.insertCell(5);
        const voidBtn = document.createElement('button');
        voidBtn.classList.add('action-btn');
        voidBtn.innerHTML = '<i class="fas fa-ban"></i>';
        voidBtn.onclick = () => voidBarang(index);
        aksiCell.appendChild(voidBtn);
    });

    document.getElementById('totalKeranjang').innerText = formatRupiah(total);
}



function resetPendingTimer() {
    // Batalkan timer sebelumnya jika ada
    if (pendingTimer) {
        clearTimeout(pendingTimer);
    }

    // Mulai timer baru
    pendingTimer = setTimeout(() => {
        // Cek apakah masih ada item yang di-pending
        let archived = JSON.parse(localStorage.getItem('archivedItems')) || [];
        
        if (archived.length > 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Waktu Pending Habis',
                text: '10 menit telah berlalu. Item pending akan dihapus.',
                confirmButtonText: 'OK'
            }).then(() => {
                // Hapus item yang di-pending
                localStorage.removeItem('archivedItems');
                
                // Update tampilan tombol
                document.getElementById('pendingButton').style.display = 'inline';
                document.getElementById('unpendingButton').style.display = 'none';
            });
        }
    }, 10 * 60 * 1000); // 10 menit
}

function startPendingTimer() {
    resetPendingTimer(); // Gunakan fungsi reset yang baru dibuat
}

function pendingItems() {
    let archived = JSON.parse(localStorage.getItem('archivedItems')) || [];
    if (archived.length > 0) {
        Swal.fire('Error', 'Tidak bisa melakukan pending lagi, karena ada pending yang aktif.', 'error');
        return;
    }

    let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
    if (keranjang.length === 0) return;

    // Archive items and empty the cart
    localStorage.setItem('archivedItems', JSON.stringify(keranjang));
    localStorage.removeItem('keranjang');
    loadKeranjang();

    document.getElementById('pendingButton').style.display = 'none';
    document.getElementById('unpendingButton').style.display = 'inline';

    Swal.fire('Pending', 'Items in cart have been archived.', 'success');
    
    // Start the 10-minute warning timer
    startPendingTimer();
}

function unpendingItems() {
    let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];

    if (keranjang.length > 0) {
        Swal.fire('Error', 'Kosongkan keranjang sebelum mengembalikan pendingan.', 'error');
        return;
    }

    let archived = JSON.parse(localStorage.getItem('archivedItems')) || [];
    if (archived.length > 0) {
        localStorage.setItem('keranjang', JSON.stringify(archived));
        localStorage.removeItem('archivedItems');
        loadKeranjang();

        document.getElementById('pendingButton').style.display = 'inline';
        document.getElementById('unpendingButton').style.display = 'none';

        Swal.fire('Unpending', 'Pending items have been restored to the cart.', 'success');
        
        // Batalkan timer pending
        if (pendingTimer) {
            clearTimeout(pendingTimer);
        }
    }
}

// Tambahkan event listener untuk tombol
document.addEventListener('DOMContentLoaded', () => {
    const pendingButton = document.getElementById('pendingButton');
    const unpendingButton = document.getElementById('unpendingButton');

    if (pendingButton) {
        pendingButton.addEventListener('click', pendingItems);
    }

    if (unpendingButton) {
        unpendingButton.addEventListener('click', unpendingItems);
    }

    // Periksa status pending saat halaman dimuat
    checkPendingStatus();
});

function checkPendingStatus() {
    let archived = JSON.parse(localStorage.getItem('archivedItems')) || [];

    if (archived.length > 0) {
        document.getElementById('pendingButton').style.display = 'none';
        document.getElementById('unpendingButton').style.display = 'inline';
        
        // Mulai ulang timer jika masih ada item pending
        startPendingTimer();
    } else {
        let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
        if (keranjang.length > 0) {
            document.getElementById('pendingButton').style.display = 'inline';
        }
        document.getElementById('unpendingButton').style.display = 'none';
    }
}


// Start the 10-minute warning timer
function startPendingTimer() {
    pendingTimer = setTimeout(() => {
        // Show warning after 10 minutes
        Swal.fire({
            icon: 'warning',
            title: 'Warning',
            text: '10 menit telah berlalu tanpa transaksi. Harap selesaikan pembayaran.',
            confirmButtonText: 'OK'
        });
        document.getElementById('pendingButton').style.display = 'none';
    }, 10 * 60 * 1000); // 10 minutes
}

// Event listeners for Pending and Unpending buttons
document.getElementById('pendingButton').addEventListener('click', pendingItems);
document.getElementById('unpendingButton').addEventListener('click', unpendingItems);

// Initialize buttons (hidden by default)
document.getElementById('pendingButton').style.display = 'none';
document.getElementById('unpendingButton').style.display = 'none';

function bayar() {
    let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
    if (keranjang.length === 0) {
        alert('Keranjang kosong, tambahkan barang ke keranjang terlebih dahulu');
        return;
    }

    // Hitung total akhir dari keranjang
    let totalAkhir = keranjang.reduce((total, item) => total + item.total, 0);

    document.getElementById('popup').style.display = 'flex';
    document.getElementById('totalBayar').innerText = formatRupiah(totalAkhir); // Tampilkan total akhir
    document.getElementById('totalBayarQRIS').innerText = formatRupiah(totalAkhir); // Tampilkan total akhir untuk QRIS
}

function pilihMetode(metode) {
    document.getElementById('metodeCash').style.display = metode === 'cash' ? 'block' : 'none';
    document.getElementById('metodeQRIS').style.display = metode === 'qris' ? 'block' : 'none';
}

function prosesPembayaran(metode) {
    let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
    const idTransaksi = generateIdTransaksi();

    // Hitung total akhir
    let total = keranjang.reduce((total, item) => total + item.total, 0);

    if (metode === 'cash') {
        const nominalElement = document.getElementById('nominalCash');
        const nominal = parseFloat(nominalElement.value);

        if (isNaN(nominal) || nominal <= 0) {
            alert('Nominal tidak valid');
            return;
        }

        if (nominal < total) {
            alert('Nominal kurang');
        } else {
            const kembalian = nominal - total;
            document.getElementById('kembalian').innerText = formatRupiah(kembalian, 'Rp. ', false);
            alert(`Pembayaran berhasil! Kembalian: ${formatRupiah(kembalian, 'Rp. ', false)}`);
            simpanTransaksi('cash', formatRupiah(nominal), formatRupiah(kembalian, 'Rp. ', false), idTransaksi, keranjang);
            nominalElement.value = '';  // Membersihkan input nominal
            resetKeranjang();
            cetakStruk(idTransaksi); // Panggil fungsi cetak struk
        }
    } else if (metode === 'qris') {
        alert('Pembayaran berhasil!');
        simpanTransaksi('qris', formatRupiah(total, 'Rp. ', false), 0, idTransaksi, keranjang);
        resetKeranjang();
        cetakStruk(idTransaksi); // Panggil fungsi cetak struk
    }
}






function simpanTransaksi(metode, nominal, kembalian, idTransaksi, keranjang) {
    let transaksi = JSON.parse(localStorage.getItem('transaksi')) || [];
    const tanggal = new Date().toISOString().split('T')[0];

    keranjang.forEach((item) => {
        transaksi.push({
            id: idTransaksi,
            kodeBarang: item.kode,
            namaBarang: item.nama,
            jumlah: item.jumlah,
            total: item.total,
            nominal: nominal,
            kembalian: kembalian,
            metode: metode,
            diskon: item.potongan || 0, // Menyimpan potongan
            persenDiskon: item.potongan, // Menyimpan diskon persentase yang berlaku
            tanggal: tanggal
        });
    });

    localStorage.setItem('transaksi', JSON.stringify(transaksi));
}

function formatRupiah(angka) {
    return 'Rp. ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function cetakStruk(idTransaksi) {
    // Konstanta untuk format struk
    const LEBAR_STRUK = 42; // lebar struk dalam karakter
    const NAMA_TOKO = 'TOKO SERBAGUNA';
    const ALAMAT_TOKO = 'Jl. Merdeka No. 88, Kota';

    // Ambil transaksi dari localStorage
    let transaksi = JSON.parse(localStorage.getItem('transaksi')) || [];
    const transaksiTerpilih = transaksi.filter(item => item.id === idTransaksi);

    if (transaksiTerpilih.length > 0) {
        // Fungsi untuk membuat garis pemisah
        function garisPemisah(karakter = '-') {
            return karakter.repeat(LEBAR_STRUK);
        }

        // Fungsi untuk memusatkan teks
        function pusatkanTeks(teks, lebar = LEBAR_STRUK) {
            const sisaSpasi = lebar - teks.length;
            const spasiBagiriKiri = Math.floor(sisaSpasi / 2);
            const spasiBagianKanan = sisaSpasi - spasiBagiriKiri;
            return ' '.repeat(spasiBagiriKiri) + teks + ' '.repeat(spasiBagianKanan);
        }

        // Fungsi untuk membuat baris dengan rata kanan-kiri
        function barisRataKananKiri(kiri, kanan, lebar = LEBAR_STRUK) {
            const sisaSpasi = lebar - (kiri.length + kanan.length);
            return kiri + ' '.repeat(sisaSpasi) + kanan;
        }

        // Fungsi untuk memotong teks agar sesuai lebar
        function potongTeks(teks, panjang) {
            return teks.length > panjang 
                ? teks.substring(0, panjang - 3) + '...' 
                : teks.padEnd(panjang);
        }

        // Fungsi untuk membuat struk
        function buatStruk() {
            let struk = [];

            // Header Toko
            struk.push(pusatkanTeks(NAMA_TOKO));
            struk.push(pusatkanTeks(ALAMAT_TOKO));
            struk.push(garisPemisah('='));

            // Informasi Transaksi
            const waktuTransaksi = new Date().toLocaleString('id-ID', {
                year: 'numeric', 
                month: '2-digit', 
                day: '2-digit', 
                hour: '2-digit', 
                minute: '2-digit'
            });

            struk.push(barisRataKananKiri('ID Transaksi:', idTransaksi));
            struk.push(barisRataKananKiri('Tanggal:', waktuTransaksi));
            struk.push(garisPemisah('='));

            // Header Kolom
            struk.push(
                potongTeks('Nama Barang', 20).padEnd(20) + 
                potongTeks('Qty', 6).padEnd(6) + 
                potongTeks('Harga', 16)
            );
            struk.push(garisPemisah());

            // Item Transaksi
            let totalTransaksi = 0;
            transaksiTerpilih.forEach(item => {
                const namaBarang = potongTeks(item.namaBarang, 20);
                const qty = potongTeks(item.jumlah.toString(), 6);
                const harga = potongTeks(formatRupiah(item.total), 16);
                
                struk.push(
                    namaBarang.padEnd(20) + 
                    qty.padEnd(6) + 
                    harga
                );
                totalTransaksi += item.total;
            });

            // Footer Transaksi
            struk.push(garisPemisah());
            struk.push(barisRataKananKiri('Total:', formatRupiah(totalTransaksi)));
            struk.push(barisRataKananKiri('Metode Bayar:', transaksiTerpilih[0].metode));
            struk.push(barisRataKananKiri('Nominal:', formatRupiah(transaksiTerpilih[0].nominal)));
            struk.push(barisRataKananKiri('Kembalian:', formatRupiah(transaksiTerpilih[0].kembalian)));
            struk.push(garisPemisah('='));

            // Penutup
            struk.push(pusatkanTeks('Terima Kasih'));
            struk.push(pusatkanTeks('Barang yang sudah dibeli'));
            struk.push(pusatkanTeks('tidak dapat dikembalikan'));

            // Gabungkan array menjadi teks
            return struk.join('\n');
        }

        // Konfirmasi dan Aksi
        Swal.fire({
            title: 'Cetak Struk Transaksi',
            html: `
                <div class="receipt-preview">
                    <pre id="strukPreview" style="
                        text-align: left; 
                        font-family: monospace; 
                        font-size: 10px; 
                        white-space: pre-wrap; 
                        max-height: 400px; 
                        overflow-y: auto;
                        border: 1px solid #ccc;
                        padding: 10px;
                    "></pre>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Cetak & Download',
            cancelButtonText: 'Batal',
            didRender: () => {
                // Tampilkan preview struk
                const struk = buatStruk();
                document.getElementById('strukPreview').textContent = struk;
            },
            preConfirm: () => {
                return true;
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const struk = buatStruk();

                // Opsi 1: Cetak
                const printWindow = window.open('', '', 'height=600,width=400');
                printWindow.document.write(`
                    <html>
                        <head>
                            <style>
                                body { 
                                    display: flex; 
                                    justify-content: center; 
                                    align-items: center; 
                                    height: 100vh; 
                                    margin: 0; 
                                    font-family: monospace;
                                }
                                pre { 
                                    white-space: pre-wrap; 
                                    text-align: left; 
                                    font-size: 10px;
                                    width: 88mm;
                                    border: 1px solid #ccc;
                                    padding: 10px;
                                }
                            </style>
                        </head>
                        <body>
                            <pre>${struk}</pre>
                        </body>
                    </html>
                `);
                printWindow.document.close();
                printWindow.print();

                // Opsi 2: Download Struk
                const blob = new Blob([struk], { type: 'text/plain' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `Struk_${idTransaksi}_${new Date().toISOString().replace(/:/g, '-')}.txt`;
                link.click();
            }
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Transaksi Tidak Ditemukan',
            text: 'ID transaksi yang Anda masukkan tidak ditemukan.',
        });
    }
}
// Fungsi untuk format rupiah
function formatRupiah(value) {
    return 'Rp ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


function cariSaranBarang() {
    // Pastikan elemen saran sudah ada
    let saranDiv = document.getElementById('saranBarang');
    if (!saranDiv) {
        // Buat elemen saran jika belum ada
        saranDiv = document.createElement('div');
        saranDiv.id = 'saranBarang';
        saranDiv.style.position = 'absolute';
        saranDiv.style.border = '1px solid #ddd';
        saranDiv.style.maxHeight = '200px';
        saranDiv.style.overflowY = 'auto';
        saranDiv.style.backgroundColor = 'white';
        saranDiv.style.zIndex = '1000';
        
        // Letakkan di dekat input
        const inputContainer = document.getElementById('kodeNamaBarang').parentNode;
        inputContainer.style.position = 'relative';
        inputContainer.appendChild(saranDiv);
    }

    const input = document.getElementById('kodeNamaBarang').value.toLowerCase();
    let barang = JSON.parse(localStorage.getItem('barang')) || [];

    // Hanya tampilkan saran jika input tidak kosong
    if (input) {
        // Filter barang sesuai input (cari kode atau nama)
        const saran = barang.filter(item => 
            item.kode.toLowerCase().startsWith(input) || item.nama.toLowerCase().includes(input)
        );

        // Bersihkan elemen saran sebelumnya
        saranDiv.innerHTML = '';

        // Tampilkan saran jika ada data yang cocok
        saran.forEach(item => {
            const saranItem = document.createElement('div');
            saranItem.textContent = `${item.kode} - ${item.nama} - Rp${item.hargaJual.toLocaleString()}`;
            saranItem.style.padding = '8px';
            saranItem.style.cursor = 'pointer';
            saranItem.style.borderBottom = '1px solid #eee';

            // Fungsi klik pada saran untuk memasukkan data ke input
            saranItem.onclick = () => {
                document.getElementById('kodeNamaBarang').value = item.kode;
                document.getElementById('jumlahBarang').value = 1;
                saranDiv.style.display = 'none'; // Sembunyikan saran setelah dipilih
            };
            
            // Tambahkan efek hover
            saranItem.addEventListener('mouseover', () => {
                saranItem.style.backgroundColor = '#f0f0f0';
            });
            saranItem.addEventListener('mouseout', () => {
                saranItem.style.backgroundColor = '';
            });

            saranDiv.appendChild(saranItem);
        });

        // Tampilkan div saran
        saranDiv.style.display = saran.length ? 'block' : 'none';
    } else {
        // Sembunyikan jika input kosong
        saranDiv.style.display = 'none';
    }
}

// Event listener untuk input
document.getElementById('kodeNamaBarang').addEventListener('input', cariSaranBarang);

// Tambahkan event listener untuk menutup saran
document.addEventListener('click', function(event) {
    const saranDiv = document.getElementById('saranBarang');
    if (saranDiv) {
        // Periksa apakah klik di luar area saran
        if (!saranDiv.contains(event.target) && 
            event.target.id !== 'kodeNamaBarang') {
            saranDiv.style.display = 'none';
        }
    }
});

function resetKeranjang() {
    localStorage.removeItem('keranjang');
    loadKeranjang();
    document.getElementById('popup').style.display = 'none';
}

function tutupPopup() {
    document.getElementById('popup').style.display = 'none';
}

function lihatLaporan() {
    window.location.href = 'laporan.html';
}

let counter = 0;

function generateIdTransaksi() {
    // Generate 4-digit random number
    let randomNumber = Math.floor(Math.random() * 10000).toString().padStart(4, '0');

    // Get current date and time
    let now = new Date();
    let day = String(now.getDate()).padStart(2, '0');
    let month = String(now.getMonth() + 1).padStart(2, '0');
    let year = String(now.getFullYear()).slice(-2); // Last 2 digits of the year
    let hours = String(now.getHours()).padStart(2, '0');
    let minutes = String(now.getMinutes()).padStart(2, '0');

    // Format date and time
    let dateStr = `${day}${month}${year}`;
    let timeStr = `${hours}${minutes}`;

    // Construct the final ID
    let id = `${randomNumber}-${dateStr}/${timeStr}`;
    return id;
}

function voidBarang(index) {
    const pin = prompt('Masukkan PIN untuk void:');
    if (pin === '451') {
        let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
        let voids = JSON.parse(localStorage.getItem('voids')) || [];
        const item = keranjang[index];

        // Pastikan harga dalam bentuk angka
        const harga = parseFloat(item.harga);

        const kodeVoid = generateKodeVoid();
        voids.push({
            kodeVoid: kodeVoid,
            namaBarang: item.nama,
            jumlah: item.jumlah,
            harga: harga, // Pastikan harga dalam angka, bukan string
            total: harga * item.jumlah, // Kalkulasi total harga berdasarkan jumlah
            tanggal: new Date().toISOString().split('T')[0]
        });
        localStorage.setItem('voids', JSON.stringify(voids));

        // Hapus item dari keranjang
        keranjang.splice(index, 1);
        localStorage.setItem('keranjang', JSON.stringify(keranjang));

        // Update stok barang
        let barang = JSON.parse(localStorage.getItem('barang')) || [];
        const barangItem = barang.find(b => b.kode === item.kode);
        if (barangItem) {
            barangItem.stok += item.jumlah;
            barangItem.terjual -= item.jumlah;
            localStorage.setItem('barang', JSON.stringify(barang));
        }

        loadKeranjang();
        
        alert(`Barang berhasil di-void dengan kode: ${kodeVoid}`);
    } else {
        alert('PIN salah');
    }
} 

function generateKodeVoid() {
    return Math.random().toString(36).substr(2, 5).toUpperCase();
}


function downloadExcel() {
    document.body.classList.add('loading');  // Tambahkan kelas loading ke body
    document.getElementById('download-animation').style.display = 'block';

    setTimeout(() => {
        let barang = JSON.parse(localStorage.getItem('barang')) || [];

        let workbook = XLSX.utils.book_new();
        let worksheet_data = [['Kode', 'Nama', 'Harga Beli', 'Harga Jual', 'Stok', 'Terjual', 'Keuntungan']];
        barang.forEach(item => {
            worksheet_data.push([
                item.kode,
                item.nama,
                item.hargaBeli,
                item.hargaJual,
                item.stok,
                item.terjual,
                item.terjual * (item.hargaJual - item.hargaBeli)
            ]);
        });

        let worksheet = XLSX.utils.aoa_to_sheet(worksheet_data);

        // Styling the first row
        let cellStyles = {
            font: { bold: true },
            alignment: { horizontal: 'center' },
            fill: { fgColor: { rgb: 'FFFF00' } }
        };

        worksheet['!cols'] = [
            { wpx: 100 },
            { wpx: 200 },
            { wpx: 100 },
            { wpx: 100 },
            { wpx: 100 },
            { wpx: 100 },
            { wpx: 120 }
        ];

        for (let cell in worksheet) {
            if (worksheet[cell] && typeof worksheet[cell] === 'object') {
                if (worksheet[cell].v === 'Kode' || worksheet[cell].v === 'Nama' || worksheet[cell].v === 'Harga Beli') {
                    worksheet[cell].s = cellStyles;
                }
            }
        }

        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Barang');
        XLSX.writeFile(workbook, 'data_barang.xlsx');

        document.body.classList.remove('loading');  // Hapus kelas loading dari body
        document.getElementById('download-animation').style.display = 'none';
    }, 2000);  // Simulasi waktu tunggu download, bisa disesuaikan
}




function uploadExcel() {
    let fileInput = document.getElementById('uploadExcel');
    let file = fileInput.files[0];

    if (!file) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Silakan pilih file Excel terlebih dahulu!'
        });
        return;
    }

    let reader = new FileReader();

    reader.onload = function(e) {
        let data = new Uint8Array(e.target.result);
        let workbook = XLSX.read(data, { type: 'array' });
        let firstSheet = workbook.Sheets[workbook.SheetNames[0]];

        // Ambil data dari sheet
        let jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

        // Cek apakah format sesuai (misalnya header: Kode, Nama, Harga Beli, Harga Jual, Stok)
        if (jsonData.length === 0 || !jsonData[0].includes('Kode') || !jsonData[0].includes('Nama')) {
            Swal.fire({
                icon: 'error',
                title: 'Format tidak sesuai',
                text: 'Format file Excel harus memiliki header: Kode, Nama, Harga Beli, Harga Jual, Stok.'
            });
            return;
        }

        let barang = JSON.parse(localStorage.getItem('barang')) || [];

        // Iterasi dari baris kedua karena baris pertama adalah header
        for (let i = 1; i < jsonData.length; i++) {
            let row = jsonData[i];
            let kode = row[0];
            let nama = row[1];
            let hargaBeli = parseFloat(row[2]);
            let hargaJual = parseFloat(row[3]);
            let stok = parseInt(row[4]);

            if (!kode || !nama || isNaN(hargaBeli) || isNaN(hargaJual) || isNaN(stok)) {
                continue;  // Abaikan baris yang tidak valid
            }

            // Cek apakah barang dengan kode ini sudah ada
            let existingItem = barang.find(item => item.kode === kode);

            if (existingItem) {
                if (existingItem.hargaBeli === hargaBeli && existingItem.hargaJual === hargaJual) {
                    console.log(`Item ${nama} sudah ada dengan harga yang sama.`);
                } else {
                    existingItem.hargaBeli = hargaBeli;
                    existingItem.hargaJual = hargaJual;
                    existingItem.stok += stok;  // Tambahkan stok
                    console.log(`Item ${nama} diperbarui dengan harga baru.`);
                }
            } else {
                barang.push({
                    kode: kode,
                    nama: nama,
                    hargaBeli: hargaBeli,
                    hargaJual: hargaJual,
                    stok: stok,
                    terjual: 0
                });
                console.log(`Item ${nama} ditambahkan.`);
            }
        }

        // Simpan data ke localStorage
        localStorage.setItem('barang', JSON.stringify(barang));

        // Muat ulang data barang untuk menampilkan yang terbaru
        loadBarang();

        Swal.fire({
            icon: 'success',
            title: 'Upload Berhasil!',
            text: 'Data barang berhasil di-upload dan disimpan.'
        });
    };

    reader.readAsArrayBuffer(file);
}



function formatRupiah(angka, prefix = 'Rp. ') {
    if (angka === null || angka === undefined) {
        return prefix + '0';
    }

    let numberString = angka.toString().replace(/[^,\d]/g, ''),
        split = numberString.split(','),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
        let separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix + rupiah;
}

function jalankanBanyakFile() {
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;

    if (files.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Tidak ada file',
            text: 'Pilih setidaknya satu file.',
        });
        return;
    }

    if (files.length > 10) {
        Swal.fire({
            icon: 'error',
            title: 'Terlalu banyak file',
            text: 'Maksimal hanya 10 file yang bisa dipilih.',
        });
        return;
    }

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        const fileType = file.name.split('.').pop().toLowerCase();
        const storageKey = `file_${fileType}_${i}`;

        reader.onload = function (e) {
            const fileContent = e.target.result;

            // Simpan konten file ke localStorage berdasarkan tipe file
            if (fileType === 'html' || fileType === 'css' || fileType === 'js') {
                // Update jika sudah ada di localStorage
                if (localStorage.getItem(storageKey)) {
                    Swal.fire({
                        icon: 'info',
                        title: 'File diperbarui',
                        text: `${file.name} sudah ada di penyimpanan lokal dan telah diperbarui.`,
                    });
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: 'File berhasil dimuat',
                        text: `${file.name} berhasil dimuat dan disimpan ke penyimpanan lokal`,
                    });
                }

                localStorage.setItem(storageKey, fileContent);

                // Jalankan konten file sesuai tipe
                if (fileType === 'html') {
                    document.open();
                    document.write(fileContent);
                    document.close();
                } else if (fileType === 'css') {
                    const style = document.createElement('style');
                    style.innerHTML = fileContent;
                    document.head.appendChild(style);
                } else if (fileType === 'js') {
                    const script = document.createElement('script');
                    script.innerHTML = fileContent;
                    document.body.appendChild(script);
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'File tidak didukung',
                    text: `${file.name} tidak didukung. Hanya file HTML, CSS, dan JS yang bisa dijalankan.`,
                });
            }
        };

        reader.readAsText(file);
    }
}





document.getElementById('lihatDiskonButton').onclick = lihatDiskon;

function lihatDiskon() {
    let diskon = JSON.parse(localStorage.getItem('diskon')) || [];

    if (diskon.length === 0) {
        Swal.fire('Info', 'Tidak ada diskon yang tersedia', 'info');
        return;
    }

    let tableHTML = `
        <table id="diskonTable" border="1" style="width:100%; text-align: left;">
            <thead>
                <tr>
                    <th>Nama Barang</th>
                    <th>Persen Diskon (%)</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
    `;

    diskon.forEach((item, index) => {
        tableHTML += `
            <tr>
                <td>${item.nama}</td>
                <td>${item.persenDiskon}</td>
                <td><button onclick="hapusDiskon(${index})">Hapus</button></td>
            </tr>
        `;
    });

    tableHTML += `
            </tbody>
        </table>
        <button onclick="downloadExcel()">Download Excel</button>
    `;

    Swal.fire({
        title: 'Daftar Diskon',
        html: tableHTML,
        showCloseButton: true,
        focusConfirm: false,
        showConfirmButton: false
    });
}

function hapusDiskon(index) {
    let diskon = JSON.parse(localStorage.getItem('diskon')) || [];
    diskon.splice(index, 1);
    localStorage.setItem('diskon', JSON.stringify(diskon));
    lihatDiskon();  // Refresh daftar diskon setelah penghapusan
}

function downloadExcel() {
    let diskon = JSON.parse(localStorage.getItem('diskon')) || [];
    if (diskon.length === 0) {
        Swal.fire('Info', 'Tidak ada data untuk diunduh', 'info');
        return;
    }

    let worksheet = XLSX.utils.json_to_sheet(diskon);
    let workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Diskon');

    XLSX.writeFile(workbook, 'daftar_diskon.xlsx');
}




function masukkanKeranjang(kode, nama, hargaJual, stok) {
    Swal.fire({
        title: `Masukkan Jumlah untuk ${nama}`,
        input: 'number',
        inputAttributes: {
            min: 1,
            max: stok,
            step: 1,
            placeholder: 'Jumlah',
        },
        showCancelButton: true,
        confirmButtonText: 'Masukkan ke Keranjang',
        cancelButtonText: 'Batal',
        inputValidator: (value) => {
            if (!value || value <= 0 || value > stok) {
                return `Jumlah harus antara 1 dan ${stok}`;
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            let jumlah = parseInt(result.value);

            // Simpan barang ke keranjang
            let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
            keranjang.push({
                kode: kode,
                nama: nama,
                hargaJual: hargaJual,
                jumlah: jumlah,
                total: hargaJual * jumlah
            });
            localStorage.setItem('keranjang', JSON.stringify(keranjang));

            // Update stok barang
            let barang = JSON.parse(localStorage.getItem('barang')) || [];
            barang = barang.map(item => {
                if (item.kode === kode) {
                    item.stok -= jumlah; // Kurangi stok dengan jumlah yang dimasukkan
                }
                return item;
            });
            localStorage.setItem('barang', JSON.stringify(barang));

            // Update tampilan stok di tabel
            const row = document.getElementById(`barang-${kode}`);
            if (row) {
                row.cells[2].innerText = barang.find(item => item.kode === kode).stok; // Update stok di tabel
            }

            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: `${jumlah} ${nama} telah ditambahkan ke keranjang.`,
                timer: 1500,
                showConfirmButton: false
            });
        }
    });
}



// Function untuk membuka pop-up scan
function bukaPopupScan() {
    document.getElementById('popupScan').style.display = 'block';
    startScan();
}

// Function untuk menutup pop-up scan
function tutupPopupScan() {
    document.getElementById('popupScan').style.display = 'none';
    stopScan();
}

// Mulai scan menggunakan kamera

 function startScan() {
    const video = document.querySelector('video');

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(stream => {
            video.srcObject = stream;
            video.setAttribute("playsinline", true); // untuk iOS
            video.play();
            
            const scanner = new BarcodeDetector({ formats: ['qr_code', 'ean_13', 'code_128'] });
            const interval = setInterval(() => {
                scanner.detect(video).then(barcodes => {
                    if (barcodes.length > 0) {
                        const code = barcodes[0].rawValue;

                        // Cek stok barang sebelum menambah ke keranjang
                        const barang = JSON.parse(localStorage.getItem('barang')) || [];
                        const item = barang.find(item => item.kode === code); // Temukan barang berdasarkan kode

                        if (item) {
                            const stokTersedia = item.stok;
                            const jumlahBarang = parseInt(document.getElementById('jumlahBarang').value) || 1; // Ambil jumlah barang dari input atau default 1
                            
                            if (jumlahBarang > stokTersedia) {
                                alert(`Stok tidak cukup! Hanya tersedia ${stokTersedia} barang.`);
                            } else {
                                // Otomatis masukkan kode ke input dan set jumlah menjadi 1
                                document.getElementById('kodeNamaBarang').value = code;
                                document.getElementById('jumlahBarang').value = jumlahBarang;
                                tambahKeKeranjang(); // Otomatis tambahkan ke keranjang
                            }
                        } else {
                            alert("Barang tidak ditemukan!");
                        }

                        // Hentikan scan dan tampilkan opsi
                        clearInterval(interval);
                        stopScan();
                        showScanOptions(); // Tampilkan opsi scan ulang atau selesai
                    }
                }).catch(err => console.error("Error mendeteksi barcode: ", err));
            }, 1000);
        })
        .catch(err => {
            console.error("Error mengakses kamera: ", err);
            alert("Gagal mengakses kamera. Pastikan izin diberikan.");
        });
    } else {
        alert("Perangkat ini tidak mendukung akses kamera.");
    }
}

function stopScan() {
    const video = document.querySelector('video');
    
    // Pastikan video memiliki stream sebelum mencoba menghentikan
    if (video.srcObject) {
        const stream = video.srcObject;
        const tracks = stream.getTracks();
        
        // Hentikan semua track video (kamera)
        tracks.forEach(track => track.stop());
        video.srcObject = null;
    }
}

// Tampilkan opsi scan ulang atau selesai
function showScanOptions() {
    document.getElementById('scanOptions').style.display = 'block';
}

// Function untuk scan ulang
function scanUlang() {
    document.getElementById('scanOptions').style.display = 'none';
    startScan();
}

// Function jika scan selesai
function selesaiScan() {
    tutupPopupScan();
}

// Event listener tombol scan
document.getElementById('scanButton').addEventListener('click', bukaPopupScan);