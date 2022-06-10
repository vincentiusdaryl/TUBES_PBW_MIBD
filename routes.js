import { getUserDetail, getUserPassword, dbConnect, getTransactions, getAllBahan, addBahan, getAllAksesoris, addAksesoris, addModel, getAllModel, addUser, getAllUsers } from './sql.js';
import { hashPassword } from './app.js';

export const routes = (app) => {
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
            res.render('home-pemilik', {bahan, aksesoris, model})
        }
        else if(pengguna.peran === 'customer'){
            res.render('home-costumer', {pengguna})
        }
  });

  app.get('/keranjang', (req, res) => res.render('keranjang'));

  app.get('/catalog', (req, res) => res.render('Catalog'));
  app.get('/cookies', (req, res) => res.render('Cookies'));
  app.get('/faq', (req, res) => res.render('Faq'));
  app.get('/privacy', (req, res) => res.render('privacy'));

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

  app.post('/add_bahan', async (req, res) => {
      const {name, desc, stock, buy, sell} = req.body;
      const conn = await dbConnect();
      addBahan(conn, name, desc, stock, buy, sell)
        .then(() => res.status(200).send('OK'))
        .catch((e) => {
            console.error(e);
            res.status(500).send('NOT OK')
        });
  })
  app.post('/add_aksesoris', async (req, res) => {
      const {name, desc, stock, buy, sell} = req.body;
      const conn = await dbConnect();
      addAksesoris(conn, name, desc, stock, buy, sell)
        .then(() => res.status(200).send('OK'))
        .catch((e) => {
            console.error(e);
            res.status(500).send('NOT OK')
        });
  })
  app.post('/add_model', async (req, res) => {
      const {name, desc, price} = req.body;
      const conn = await dbConnect();
      addModel(conn, name, desc, price)
        .then(() => res.status(200).send('OK'))
        .catch((e) => {
            console.error(e);
            res.status(500).send('NOT OK')
        });
  })
}