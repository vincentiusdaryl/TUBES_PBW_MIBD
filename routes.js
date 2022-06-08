import { getUserDetail, getUserPassword, dbConnect } from './sql.js';
import { hashPassword } from './app.js';

export const routes = (app) => {
  app.get('/',async (req, res) => {
      const conn = await dbConnect();
      let pengguna = null;
      try{
          pengguna = await getUserDetail(conn, req.cookies);
      }
      catch(e){
          if(e){
              console.log(e);
          }
      }
      res.render('home', {
          pengguna,
          books: []
      });
  });

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
          const dbPassword = getUserPassword(conn, username ?? "");
          if(hashPassword(password ?? "") === dbPassword){
              res.cookie("username", username);
              res.render('LoginPage', {error: false})
          } else {
              res.status(401);
              res.render('LoginPage', {error: true})
          }
      }
  });


  app.get('/login',async (req,res) =>{
      res.render('login')
  });

  app.post('/login',async (req,res) => {
      console.log('hello')
      res.body.username
      const pw = res.body.password
      console.log(res.body.username)
      const hashed_pass = crypto.createHash('sha256').update(password).digest('based64')
      res.render('login')
  })

  app.get('/logout', (req, res) => {
    res.redirect('/')
  })
}