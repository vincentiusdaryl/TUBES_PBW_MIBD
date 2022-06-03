

-- Drop Table
DROP TABLE Pengguna;
DROP TABLE Customer;
DROP TABLE BahanBaku;
DROP TABLE Aksesoris;
DROP TABLE ModelBaju;
DROP TABLE Baju;
DROP TABLE Transaksi;
DROP TABLE Kurir;

-- BUAT TABLE

-- Buat Table Pengguna
CREATE TABLE Pengguna (
	idPengguna int,
    Email varchar(30),
    Username varchar(20),
    Pass varchar(20),
    namaPengguna varchar(20)
);


-- Buat Table Customer
CREATE TABLE Customer (
	namaCustomer varchar(20), 
    Alamat varchar(30),
    noHP varchar(14)
);


-- Buat Table Bahan Baku
CREATE TABLE BahanBaku (
	idBahanBaku int,
    namaBahanBaku varchar(20), 
    hargaBeliBahan decimal NOT NULL,
    hargaJualBahan decimal NOT NULL
);


-- Buat Table Aksesoris
CREATE TABLE Aksesoris (
	idAksesoris int,
    namaAksesoris varchar(20),
    hargaBeliAksesoris decimal NOT NULL,
    hargaJualAksesoris decimal NOT NULL
);


-- Buat Table Model Baju
CREATE TABLE ModelBaju (
	idModel int, 
    namaModel varchar(20),
    hargaModel decimal NOT NULL
);


-- Buat Table Baju
CREATE TABLE Baju (
	idBaju int,
    Ukuran varchar(5),
    idBahanBaku int,
    idAksesoris int,
    idModel int,
    hargaBaju decimal NOT NULL,
    hargaJahit decimal NOT NULL
);


-- Buat Table Kurir
CREATE TABLE Kurir (
	idKurir int, 
    namaKurir varchar(20)
);


-- Buat Table Transaksi
CREATE TABLE Transaksi (
	idTransaksi int, 
    idPengguna int,
    idKurir int, 
    tglTransaksi date,
    statPemesanan varchar(20),
    statPembayaran varchar(5),
    buktiTransfer varchar(50)
);


-- INSERT TABLE

-- Insert Table Pengguna
INSERT INTO Pengguna(idPengguna, Email, Username, Pass, namaPengguna) VALUES
('1', 'admin@gmail.com', 'admin', 'admin', 'admin'),
('2', 'pemilik@gmail.com', 'pemilik', 'pemilik', 'pemilik'),
('3', 'joko@gmail.com', 'joko', 'joko1234', 'Joko');

INSERT INTO Customer(namaCustomer, Alamat, noHP) VALUES
('joko', 'Jl. Ciumbuleuit No.94', '081234567890');

-- Insert Table Bahan Baku
INSERT INTO BahanBaku(idBahanBaku, namaBahanBaku, hargaBeliBahan, hargaJualBahan) VALUES
('1', 'cotton20s', '', ''),
('2', 'cotton30s', '', ''),
('3', 'polyester', '', ''),
('4', 'wool', '', ''),
('5', 'denim', '', ''),
('6', 'sutra', '', '');


-- Insert Table Aksesoris
INSERT INTO Aksesoris(idAksesoris, namaAksesoris, hargaBeliAksesoris, hargaJualAksesoris) VALUES
('1', 'kancing', '', ''),
('2', 'renda', '', ''),
('3', 'taliHoodie', '', '');


-- Insert Table Model Baju
INSERT INTO ModelBaju(idModel, namaModel, hargaModel) VALUES
('1', 'crewneck', ''),
('2', 'hoodie', ''),
('3', 'hoodieZip', ''),
('4', 'kaosPolo', ''),
('5', 'kaosVNeck', ''),
('6', 'kaos', ''),
('7', 'turtleneck', '');


-- Insert Table Baju
INSERT INTO Baju(idBaju, Ukuran, idBahanBaku, idAksesoris, idModel, hargaBaju, hargaJahit) VALUES
('1', 'L', '1', '1', '1', '0', '3000');


-- Insert Table Kurir
INSERT INTO Kurir(idKurir, namaKurir) VALUES
('1', 'JNE'),
('2', 'J&T'),
('3', 'SiCepat');


-- Insert Table Transaksi
INSERT INTO Transaksi(idTransaksi, idPengguna, idKurir, tglTransaksi, statPemesanan, statPembayaran, buktiTransfer) VALUES
('1', '1', '1', '20220527', 'Pembuatan Pola', 'Sudah', '');

SELECT *
FROM Pengguna;
-- 