import { pool } from "./app.js";

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

export const getUserDetail = (conn,username) => {
    return new Promise((resolve, rejects) =>{
        conn.query(`SELECT idPengguna, Email, Username, namaPengguna, peran FROM Pengguna WHERE Username = "${username}" LIMIT 1`,(err, result) =>{
            if(err){
                rejects(err);
            }else{
                if(result.length === 1) resolve(result[0]);
                else rejects(null);
            }
        });
    });
};

export const getUserPassword = (conn, username) => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT Pass as password FROM Pengguna WHERE Username = "${username}" LIMIT 1`, (err, res) => {
      if(err) reject(err);
      else resolve(res[0]);
    });
  });
}

export const addUser = (conn, name, username, password, email, alamat, nomorHp, tipe) => {
    return new Promise((resolve, reject) => {
        conn.query(
        `INSERT INTO Pengguna(Email, Username, Pass, namaPengguna, peran, alamat, noHP) VALUES(?,?,?,?,?,?,?)`,
        [email, username, password, name, tipe, alamat, nomorHp], (err, res) => {
            if(err) reject(err);
            else resolve(res);
        })
    })
}

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

export const getTransactions = (conn) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM Transaksi t INNER JOIN Pengguna p ON t.idPengguna = p.idPengguna`, (err, res) => {
            if(err) reject(err);
            else resolve(res);
        })
    });
}

export const getTransactionsById = (conn, id) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM Transaksi t INNER JOIN Pengguna p ON t.idPengguna = p.idPengguna WHERE idTransaksi = ?`,
        [id], (err, res) => {
            if(err) reject(err);
            else resolve(res);
        })
    })
}

export const getAllBahan = (conn) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM BahanBaku`, (err, res) => {
            if(err) reject(err);
            else resolve(res);
        })
    });
}

export const addBahan = (conn, name, desc, stock, buy, sell) => {
    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO BahanBaku (namaBahanBaku, hargaBeliBahan, hargaJualBahan, deskripsiBahanBaku, stock) VALUES(?,?,?,?,?)`,
        [name, buy, sell, desc, stock], (err, res) => {
            if(err) reject(err);
            else resolve(res);
        })
    });
}

export const getAllAksesoris = (conn) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM Aksesoris`, (err, res) => {
            if(err) reject(err);
            else resolve(res);
        })
    });
}

export const addAksesoris = (conn, name, desc, stock, buy, sell) => {
    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO Aksesoris (namaAksesoris, hargaBeliAksesoris, hargaJualAksesoris, deskripsiAksesoris, stock) VALUES(?,?,?,?,?)`,
        [name, buy, sell, desc, stock], (err, res) => {
            if(err) reject(err);
            else resolve(res);
        })
    });
}

export const getAllModel = (conn) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM ModelBaju`, (err, res) => {
            if(err) reject(err);
            else resolve(res);
        })
    });
}

export const addModel = (conn, name, desc, price) => {
    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO ModelBaju(namaModel, hargaModel, deskripsiModel) VALUES(?,?,?)`,
        [name, price, desc], (err, res) => {
            if(err) reject(err);
            else resolve(res);
        })
    });
}