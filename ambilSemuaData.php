<?php
// Koneksi ke database AWS
$host = '0.0.0.0:3306';
$dbname = 'data_barang_fx';
$username = 'root';
$password = 'root';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Ambil data dari tabel barang
    $stmt = $conn->prepare("SELECT * FROM barang");
    $stmt->execute();
    $barang = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Ambil data dari tabel transaksi
    $stmt = $conn->prepare("SELECT * FROM transaksi");
    $stmt->execute();
    $transaksi = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Ambil data dari tabel laporanSetoran
    $stmt = $conn->prepare("SELECT * FROM laporanSetoran");
    $stmt->execute();
    $laporanSetoran = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Ambil data dari tabel adjustmentHistory
    $stmt = $conn->prepare("SELECT * FROM adjustmentHistory");
    $stmt->execute();
    $adjustmentHistory = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'barang' => $barang,
        'transaksi' => $transaksi,
        'laporanSetoran' => $laporanSetoran,
        'adjustmentHistory' => $adjustmentHistory
    ]);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error: ' . $e->getMessage()]);
}
?>