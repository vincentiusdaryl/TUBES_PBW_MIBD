

-- Drop Table
DROP TABLE IF EXISTS Pengguna;
DROP TABLE IF EXISTS Customer;
DROP TABLE IF EXISTS BahanBaku;
DROP TABLE IF EXISTS Aksesoris;
DROP TABLE IF EXISTS ModelBaju;
DROP TABLE IF EXISTS Baju;
DROP TABLE IF EXISTS Transaksi;
DROP TABLE IF EXISTS Kurir;

-- BUAT TABLE

-- Buat Table Pengguna
CREATE TABLE Pengguna (
	idPengguna int AUTO_INCREMENT,
    Email varchar(30),
    Username varchar(20),
    Pass varchar(128),
    namaPengguna varchar(20),
    peran varchar(20),
    alamat varchar(50) NOT NULL,
    noHP varchar(15) NOT NULL,
    PRIMARY KEY(idPengguna)
);


-- Buat Table Bahan Baku
CREATE TABLE BahanBaku (
	idBahanBaku int AUTO_INCREMENT,
    namaBahanBaku varchar(20), 
    hargaBeliBahan decimal NOT NULL,
    hargaJualBahan decimal NOT NULL,
    stock int NOT NULL,
    deskripsiBahanBaku varchar(50) NOT NULL,
    gambarBahanBaku varchar(100) NOT NULL DEFAULT "",
    PRIMARY KEY(idBahanBaku)
);


-- Buat Table Aksesoris
CREATE TABLE Aksesoris (
	idAksesoris int AUTO_INCREMENT,
    namaAksesoris varchar(20),
    hargaBeliAksesoris decimal NOT NULL,
    hargaJualAksesoris decimal NOT NULL,
    deskripsiAksesoris varchar(50) NOT NULL,
    stock int,
    gambarAksesoris varchar(100) NOT NULL DEFAULT "",
    PRIMARY KEY(idAksesoris)
);


-- Buat Table Model Baju
CREATE TABLE ModelBaju (
	idModel int AUTO_INCREMENT, 
    namaModel varchar(20),
    deskripsiModel varchar(50) NOT NULL,
    hargaModel decimal NOT NULL,
    gambarModel varchar(50) NOT NULL DEFAULT "",
    PRIMARY KEY(idModel)
);


-- Buat Table Baju
CREATE TABLE Baju (
	idBaju int AUTO_INCREMENT,
    Ukuran varchar(5),
    idBahanBaku int,
    idModel int,
    hargaBaju decimal NOT NULL,
    PRIMARY KEY(idBaju),
    INDEX (idBahanBaku),
    INDEX(idModel),
    FOREIGN KEY (idBahanBaku)
        REFERENCES BahanBaku(idBahanBaku),
    FOREIGN KEY (idModel)
        REFERENCES ModelBaju(idModel)
);


-- Buat Table Kurir
CREATE TABLE Kurir (
	idKurir int AUTO_INCREMENT,
    namaKurir varchar(16),
    PRIMARY KEY(idKurir)
);


-- Buat Table Transaksi
CREATE TABLE Transaksi (
	idTransaksi int AUTO_INCREMENT,
    idPengguna int,
    idAksesoris int NOT NULL,
    idBaju int NOT NULL,
    idKurir int, 
    tglTransaksi date,
    statPemesanan varchar(30),
    statPembayaran varchar(30),
    progresPesanan varchar(50),
    buktiTransfer varchar(50),
    hargaTotal int(20) NOT NULL,
    PRIMARY KEY(idTransaksi),
    INDEX(idPengguna),
    INDEX(idAksesoris),
    Index(idBaju),
    INDEX(idKurir),
    FOREIGN KEY (idPengguna)
        REFERENCES Pengguna(idPengguna),
    FOREIGN KEY (idBaju)
        REFERENCES Baju(idBaju),
    FOREIGN KEY (idKurir)
        REFERENCES Kurir(idKurir),
    FOREIGN KEY (idAksesoris)
        REFERENCES Aksesoris(idAksesoris)
);


-- INSERT TABLE

-- Insert Table Pengguna
INSERT INTO Pengguna(idPengguna, Email, Username, Pass, namaPengguna, peran, alamat, noHP) VALUES
(1, 'admin@gmail.com', 'admin', 'jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=', 'admin', 'admin', '', '');
INSERT INTO Pengguna(Email, Username, Pass, namaPengguna, peran, alamat, noHP) VALUES("email", "pemilik", "M8K0iOehtiH6CQTPXm9E2md5JYl4l2XncsYeNkyyyWo=", "a", "pemilik", "", "");

-- Insert Table Kurir
INSERT INTO Kurir(idKurir, namaKurir) VALUES
(1, 'JNE'),
(2, 'J&T'),
(3, 'SiCepat');