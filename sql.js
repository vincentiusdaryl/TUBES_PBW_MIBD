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
    conn.query(`SELECT Pass as password FROM Pengguna WHERE Username = "${username} LIMIT 1`, (err, res) => {
      if(err) reject(err);
      else resolve(res[0]);
    });
  });
}