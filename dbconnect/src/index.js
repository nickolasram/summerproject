import { config } from 'dotenv';
import { executeCrudOperations, authenticate, pushClass, pullClass } from './mongoconn.js';
import express from 'express';
import cors from 'cors';

config();

const app = express();
app.use(cors());
app.set('port', process.env.PORT || 5001);

app.get('/', async (req,res) => {
    res.type('json');
    res.status(200);
    let data = await executeCrudOperations(req.query.classTitle, req.query.username);
    res.json({
        classes: data.allClasses,
        completed: data.studentClasses,
        success: true
    });
  });

app.post('/login', async (req, res) => {
  res.type('json');
  res.status(200);
  let {status, username} = await authenticate(req.query.username, req.query.password);
  res.json({
      authentication: status,
      user: username,
      success: true
  });
});
app.post('/update/add', async (req, res) => {
  res.type('json');
  res.status(200);
  res.json({
      classes: await pushClass(req.query.username, req.query.className),
      success: true
  });
});

app.post('/update/remove', async (req, res) => {
  res.type('json');
  res.status(200);
  res.json({
      classes: await pullClass(req.query.username, req.query.className),
      success: true
  });
});

app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('Express started');
});