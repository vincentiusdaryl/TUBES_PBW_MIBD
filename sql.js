import { pool } from "./app.js";

// Koneksi dari routes.js ke sql.js
export const dbConnect = () =>{
    return new Promise((resolve, rejects) =>{
        pool.getConnection((err, conn) =>{
            if(err){
                rejects(err);
            }
            else{
                resolve(conn);
            }
        })
    })
};

// Mencari 1 info pengguna berdasarkan username
export const getUserDetail = (conn,username) => {
    return new Promise((resolve, rejects) =>{
        conn.query(`
        SELECT idPengguna, Email, Username, namaPengguna, peran 
        FROM Pengguna 
        WHERE Username = "${username}" LIMIT 1`,(err, result) =>{
            if(err){
                rejects(err);
            }else{
                if(result.length === 1) resolve(result[0]);
                else rejects(null);
            }
        });
    });
};

// Mengambil password dari pengguna
export const getUserPassword = (conn, username) => {
    return new Promise((resolve, reject) => {
    conn.query(`SELECT Pass as password
    FROM Pengguna
    WHERE Username = "${username}" 
    LIMIT 1`,
    (err, res) => {
        if(err) 
            reject(err);
        else 
            resolve(res[0]);
        });
    });
}


// Insert user baru
export const addUser = (conn, name, username, password, email, alamat, nomorHp, tipe) => {
    return new Promise((resolve, reject) => {
        conn.query(
        `INSERT INTO Pengguna(Email, Username, Pass, namaPengguna, peran, alamat, noHP)
        VALUES(?,?,?,?,?,?,?)`,
        [email, username, password, name, tipe, alamat, nomorHp], (err, res) => {
            if(err) reject(err);
            else resolve(res);
        })
    })
}


// Mengambil info semua pengguna
export const getAllUsers = (conn) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'SELECT Email, Username, Pass, namaPengguna, peran, alamat, noHp FROM Pengguna',
            (err, res) => {
                if(err) reject(err);
                else resolve(res);
            }
        );
    })
}

// Fitur Search user berdasarkan username
export const getUsersByUsername = (conn, username) => {
    return new Promise((resolve, reject) => {
        conn.query(
            `SELECT Email, Username, Pass, namaPengguna, peran, alamat, noHp 
            FROM Pengguna 
            WHERE Username 
            LIKE "%${username}%"`,
            (err, res) => {
                if(err) reject(err);
                else resolve(res);
            }
        );
    })
}

// Mengambil semua transaksi yang dilakukan pengguna
export const getTransactions = (conn) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT *
        FROM Transaksi t
        INNER JOIN
        Pengguna p
        ON t.idPengguna = p.idPengguna`,
        (err, res) => {
            if(err) reject(err);
            else resolve(res);
        })
    });
}

// Mengambil transaksi tertentu yang dilakukan pengguna
export const getTransactionsById = (conn, id) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT *
        FROM Transaksi t
        INNER JOIN Pengguna p
        ON t.idPengguna = p.idPengguna
        WHERE idTransaksi = ?`,
        [id], (err, res) => {
            if(err) reject(err);
            else resolve(res);
        })
    })
}

// Mengambil bahan baku
export const getAllBahan = (conn) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * 
        FROM BahanBaku`,
        (err, res) => {
            if(err) reject(err);
            else resolve(res);
        })
    });
}

// Menambah bahan baku
export const addBahan = (conn, name, desc, stock, buy, sell, img) => { //conn, name, desc, stock, buy, sell, img parameter
    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO BahanBaku (namaBahanBaku, hargaBeliBahan, hargaJualBahan, deskripsiBahanBaku, stock, gambarBahanBaku)
        VALUES(?,?,?,?,?,?)`,
        [name, buy, sell, desc, stock, img], (err, res) => {
            if(err) reject(err);
            else resolve(res);
        })
    });
}

// Mengambil semua aksesoris
export const getAllAksesoris = (conn) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT *
        FROM Aksesoris`,
        (err, res) => {
            if(err) reject(err);
            else resolve(res);
        })
    });
}

// Mengambil semua aksesoris yang memiliki stock yang lebih dari 0
export const getAllAvailableAksesoris = (conn) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT *
        FROM Aksesoris
        WHERE stock > 0`, (err, res) => {
            if(err) reject(err);
            else resolve(res);
        })
    });
}

// Menambah aksesoris
export const addAksesoris = (conn, name, desc, stock, buy, sell, img) => {
    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO Aksesoris (namaAksesoris, hargaBeliAksesoris, hargaJualAksesoris, deskripsiAksesoris, stock, gambarAksesoris)
        VALUES(?,?,?,?,?,?)`,
        [name, buy, sell, desc, stock, img], (err, res) => {
            if(err) reject(err);
            else resolve(res);
        })
    });
}

// Mengambil semua model Baju
export const getAllModel = (conn) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT *
        FROM ModelBaju`,
        (err, res) => {
            if(err) reject(err);
            else resolve(res);
        })
    });
}

// Mengambil jumlah model baju yang berada di database
export const getModelCount = (conn) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT COUNT(*) as count
        FROM ModelBaju`,
        (err, res) => {
            if(err) reject(err);
            else resolve(res[0].count);
        })
    })
}

// Mengambil List model dengan pagination
export const getModelPaginated = (conn, page, pageSize) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * 
        FROM ModelBaju
        LIMIT ${pageSize}
        OFFSET ${(page-1)*pageSize}`, //OFFSET buat pagination
        (err, res) => {
            if(err) reject(err);
            else resolve(res);
        })
    })
}

// Menambah Model Baju
export const addModel = (conn, name, desc, price, img) => {
    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO ModelBaju(namaModel, hargaModel, deskripsiModel, gambarModel)
        VALUES(?,?,?,?)`,
        [name, price, desc, img], (err, res) => {
            if(err) reject(err);
            else resolve(res);
        })
    });
}

// Update status pemesanan
export const updatePemesanan = (conn, idTransaksi, idKurir, stat) => {
    return new Promise((resolve, reject) => {
        conn.query(`UPDATE Transaksi
        SET statPemesanan = ?, idKurir = ?
        WHERE idTransaksi = ?`,
        [stat, idKurir, idTransaksi], (err, res) => {
            if(err) reject(err);
            else resolve(res);
        })
    });
}

// Menambah Baju
export const addBaju = (conn, idModel, idBahan, ukuran) => {
    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO Baju(Ukuran, idBahanBaku, idModel, hargaBaju)
        VALUES(?, ?, ?, (
            SELECT hargaModel+hargaJualBahan
            FROM ModelBaju
            CROSS JOIN BahanBaku
            WHERE idModel = ? AND idBahanBaku = ?))`,
        [ukuran, idBahan, idModel, idModel, idBahan], (err, res) => {
            if(err) reject(err);
            else resolve(res.insertId);
        })
    });
}

// Mencari informasi baju berdasarkan id
export const getBajuById = (conn, idBaju) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Baju WHERE idBaju = ?', [idBaju], (err, res) => {
            if(err) reject(err)
            else resolve(res[0]);
        })
    })
}

// Menambah transaksi
export const addTransaction = (conn, idPengguna, idAksesoris, idBaju, hargaBaju) => {
    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO Transaksi(idPengguna, idAksesoris, idBaju, idKurir, tglTransaksi, statPemesanan, statPembayaran, progresPesanan, buktiTransfer, hargaTotal)
        VALUES (?,?,?,1,now(),"belum dikerjakan","belum","belum dikerjakan","",?+(SELECT hargaJualAksesoris FROM Aksesoris WHERE idAksesoris = ?))`,
        [idPengguna, idAksesoris, idBaju, hargaBaju, idAksesoris], (err, res) => {
            if(err) reject(err);
            else resolve(res.insertId);
        })
    });
}

// Mengambil informasi detail transaksi berdasarkan id
export const getTransactionDetailById = (conn, idTransaction) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT idTransaksi, namaModel, hargaBaju, namaBahanBaku, hargaJualBahan, Ukuran, namaAksesoris, hargaJualAksesoris, hargaBaju+hargaJualBahan+hargaJualAksesoris as hargaTotal FROM Transaksi t INNER JOIN Aksesoris a ON t.idAksesoris = a.idAksesoris INNER JOIN Baju b ON t.idBaju = b.idBaju INNER JOIN BahanBaku bb ON b.idBahanBaku = bb.idBahanBaku INNER JOIN ModelBaju m ON b.idModel = m.idModel WHERE idTransaksi=?',
        [idTransaction], (err, res) => {
            if(err) reject(err);
            else resolve(res[0]);
        })
    })
}

// Mengubah bukti pembayaran
export const updateBuktiBayar = (conn, idTransaksi, buktiBayar) => {
    return new Promise((resolve, reject) => {
        conn.query('UPDATE Transaksi SET buktiTransfer = ? WHERE idTransaksi = ?',
        [buktiBayar, idTransaksi], (err, res) => {
            if(err) reject(err);
            else resolve(res);
        })
    });
}

// Mengambil informasi status pemesanan dari transaksi 
export const getPesananStatus = (conn) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT idTransaksi, idPengguna, tglTransaksi, statPemesanan, idKurir FROM Transaksi',
        (err, res) => {
            if(err) reject(err);
            else resolve(res);
        });
    })
}

// Mengambil semua kurir yang ada pada database
export const getKurirs = (conn) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Kurir',
        (err, res) => {
            if(err) reject(err);
            else resolve(res);
        })
    })
}

// Membuat laporan dari transaksi 
export const getLaporan = (conn) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT idTransaksi, namaModel, namaAksesoris, hargaTotal, hargaJualAksesoris+hargaJualBahan as totalBeli FROM Transaksi t INNER JOIN Baju b ON t.idBaju = b.idBaju INNER JOIN ModelBaju m ON b.idModel = m.idModel INNER JOIN Aksesoris a ON t.idAksesoris = a.idAksesoris INNER JOIN BahanBaku bb ON b.idBahanBaku = bb.idBahanBaku',
        (err, res) => {
            if(err) reject(err);
            else resolve(res);
        })
    })
}

// Mengambil total pemasukkan toko baju
export const getTotalPemasukan = (conn) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT SUM(hargaTotal) AS total FROM Transaksi',
        (err, res) => {
            if(err) reject(err);
            else resolve(res);
        })
    })
}

// Menghapus pengguna berdasarkan username
export const deleteUserByUsername = (conn, username) => {
    return new Promise((resolve, reject) => {
        conn.query('DELETE FROM Pengguna WHERE Username = ?', 
        [username], (err, res) => {
            if(err) reject(err);
            else resolve(res);
        }
        )
    })
}

// Menghapus Model berdasarkan id
export const deleteModelById = (conn, id) => {
    return new Promise((resolve, reject) => {
        conn.query('DELETE FROM ModelBaju WHERE idModel = ?', 
        [id], (err, res) => {
            if(err) reject(err);
            else resolve(res);
        }
        )
    })
}

// Menghapus Bahan berdasarkan id
export const deleteBahanById = (conn, id) => {
    return new Promise((resolve, reject) => {
        conn.query('DELETE FROM BahanBaku WHERE idBahanBaku = ?', 
        [id], (err, res) => {
            if(err) reject(err);
            else resolve(res);
        }
        )
    })
}

// Menghapus aksesoris baju berdasarkan id
export const deleteAksesorisById = (conn, id) => {
    return new Promise((resolve, reject) => {
        conn.query('DELETE FROM Aksesoris WHERE idAksesoris = ?', 
        [id], (err, res) => {
            if(err) reject(err);
            else resolve(res);
        }
        )
    })
}