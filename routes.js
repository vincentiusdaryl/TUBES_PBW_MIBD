import { getUserDetail, getUserPassword, dbConnect, getTransactions, getAllBahan, addBahan, getAllAksesoris, addAksesoris, addModel, getAllModel, addUser, getAllUsers, getTransactionsById, updatePemesanan, getUsersByUsername, getModelPaginated, getModelCount, addTransaction, getAllAvailableAksesoris, addBaju, getBajuById, getTransactionDetailById, updateBuktiBayar, getPesananStatus, getKurirs, getLaporan, getTotalPemasukan, deleteUserByUsername, deleteModelById, deleteAksesorisById, deleteBahanById } from './sql.js';
import { hashPassword } from './app.js';

export const routes = (app, upload) => {
  app.get('/',async (req, res) => {
        const conn = await dbConnect();
        let pengguna = null;
        try{
            pengguna = await getUserDetail(conn, req.cookies['username']);
        }
        catch(e){
            if(e){
                console.log(e);
            }
        }
        if(!pengguna){
            res.render('home');
        }
        else if(pengguna.peran === 'admin'){
            const transaksi = await getTransactions(conn);
            const users = await getAllUsers(conn);
            res.render('home-admin', {transaksi, users})
        }
        else if(pengguna.peran === 'pemilik'){
            const bahan = await getAllBahan(conn);
            const aksesoris = await getAllAksesoris(conn);
            const model = await getAllModel(conn);
            const pengiriman = await getPesananStatus(conn);
            const kurir = await getKurirs(conn);
            const laporan = await getLaporan(conn);
            const pemasukan = await getTotalPemasukan(conn);
            res.render('home-pemilik', {bahan, aksesoris, model, pengiriman, kurir, laporan, pemasukan})
        }
        else if(pengguna.peran === 'customer'){
            res.render('home-costumer', {pengguna})
        }
        else{
            res.render('home')
        }
  });

  app.get('/keranjang', (req, res) => res.render('keranjang'));

  app.get('/catalog', (req, res) => res.render('Catalog'));
  app.get('/cookies', (req, res) => res.render('Cookies'));
  app.get('/faq', (req, res) => res.render('Faq'));
  app.get('/privacy', (req, res) => res.render('privacy'));

  const modelPageSize = 3;
  app.get('/custom', async (req, res) => {
    const conn = await dbConnect();
    const modelCount = await getModelCount(conn);
    const modelPages = Math.ceil(modelCount/modelPageSize);
    const models = await getModelPaginated(conn, 1, modelPageSize);
    const bahan = await getAllBahan(conn);
    const aksesoris = await getAllAvailableAksesoris(conn);
    res.render('custom', {models, modelPages, bahan, aksesoris})
  })
  app.get('/models', async (req, res) => {
    const conn = await dbConnect();
    const page = req.query['page'];
    try{
        const models = await getModelPaginated(conn, page, modelPageSize);
        res.render('model-display', {models});
    }
    catch(e){
        res.status(500).send();
    }
  })

  app.post('/custom', async (req, res) => {
    const { modelId, bahanId, size, aksesorisId } = req.body;
    const conn = await dbConnect();
    const { idPengguna } = await getUserDetail(conn, req.cookies['username']);
    const idBaju = await addBaju(conn, modelId, bahanId, size);
    const { hargaBaju } = await getBajuById(conn, idBaju);

    const transactionId = await addTransaction(conn, idPengguna, aksesorisId, idBaju, hargaBaju);
    res.status(201).json({transactionId}).send();
  })

  app.get('/pay', async(req, res) => {
    const transactionId = req.query['id'];
    const conn = await dbConnect();
    const transaction = await getTransactionDetailById(conn, transactionId);
    res.render('bayar', {baju: transaction});
  })

  app.post('/pay_upload', upload.single('buktibayar'), async(req, res) => {
    const idTransaksi = +req.query['id'];
    const file = req.file.filename;
    console.log(idTransaksi, file);
    const conn = await dbConnect();
    await updateBuktiBayar(conn, idTransaksi, file);
    res.redirect('/')
  })

  app.get('/login', async (req, res) => {
      res.render('LoginPage', {error: false});
  });

  app.post('/login', async (req, res) => {
      const { username, password } = req.body;
      const conn = await dbConnect();
      if(!username || !password){
          res.status(401);
          res.render('LoginPage', {error: true})
      }
      else{
          const dbPassword = (await getUserPassword(conn, username ?? ""))?.password;
          if(hashPassword(password ?? "") === dbPassword){
              res.cookie("username", username);
              res.redirect('/');
          } else {
              res.status(401);
              res.render('LoginPage', {error: true})
          }
      }
  });

  app.post('/register', async (req, res) => {
      const {name,username,password,email,alamat,nomorHp,tipe} = req.body;
      if(!name || !username || !password || !email || !alamat || !nomorHp || !tipe){
          res.status(401).end();
      }
      else{
          const hashedPassword = hashPassword(password);
          const conn = await dbConnect();
          addUser(conn, name, username, hashedPassword, email, alamat, nomorHp, tipe)
            .then(() => {
                res.status(201).send();
            })
            .catch((e) => {
                res.status(500).send();
            });
      }
  })

  app.get('/logout', (req, res) => {
      res.clearCookie('username');
    res.redirect('/')
  })

  app.post('/add_bahan', upload.single('img'), async (req, res) => {
      const {name, desc, stock, buy, sell} = req.body;
      const img = req.file.filename
      const conn = await dbConnect();
      addBahan(conn, name, desc, stock, buy, sell, img)
        .then(() => res.status(200).send('OK'))
        .catch((e) => {
            console.error(e);
            res.status(500).send('NOT OK')
        });
  })
  app.post('/add_aksesoris', upload.single('img'), async (req, res) => {
      const {name, desc, stock, buy, sell} = req.body;
      const img = req.file.filename;
      const conn = await dbConnect();
      addAksesoris(conn, name, desc, stock, buy, sell, img)
        .then(() => res.status(200).send('OK'))
        .catch((e) => {
            console.error(e);
            res.status(500).send('NOT OK')
        });
  })
  app.post('/add_model', upload.single('img'), async (req, res) => {
      const {name, desc, price} = req.body;
      const img = req.file.filename;
      const conn = await dbConnect();
      addModel(conn, name, desc, price, img)
        .then(() => res.status(200).send('OK'))
        .catch((e) => {
            console.error(e);
            res.status(500).send('NOT OK')
        });
  })

  app.get('/transaksi', async(req, res) => {
      const id = +req.query['id'];
      const conn = await dbConnect();
      try{
        const transactions = await getTransactionsById(conn, id);
        res.json(transactions)
      }
      catch(e){
          console.error(e);
          res.status(500).send();
      }
  })

  app.get('/users', async(req, res) => {
    const username = req.query['username'];
    const conn = await dbConnect();
    try{
        const users = await getUsersByUsername(conn, username);
        res.json(users);
    }
    catch(e){
        console.error(e);
        res.status(500).send();
    }
  })

  app.post('/update_pengiriman', async(req, res) => {
    const { idTransaksi, stat, idKurir } = req.body;
    const conn = await dbConnect();
    try{
        console.log(idTransaksi, idKurir, stat);
        await updatePemesanan(conn, +idTransaksi, +idKurir, stat);
        res.status(200).send();
    }
    catch(e){
        console.error(e);
        res.status(500).send();
    }
  })

  app.delete('/delete_user', async(req, res) => {
    const {username} = req.query;
    const conn = await dbConnect();
    await deleteUserByUsername(conn, username);
    res.send();
  })

  app.delete('/delete_model', async(req, res) => {
    const {id} = req.query;
    const conn = await dbConnect();
    await deleteModelById(conn, id);
    res.send();
  })

  app.delete('/delete_bahan', async(req, res) => {
    const {id} = req.query;
    const conn = await dbConnect();
    await deleteBahanById(conn, id);
    res.send();
  })

  app.delete('/delete_aksesoris', async(req, res) => {
    const {id} = req.query;
    const conn = await dbConnect();
    await deleteAksesorisById(conn, id);
    res.send();
  })
}