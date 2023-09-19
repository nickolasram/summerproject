import { config } from 'dotenv';
import { executeCrudOperations } from './mongoconn.js';
import express from 'express';
import cors from 'cors';


config();

await executeCrudOperations();

const app = express();
app.use(cors());
app.set('port', process.env.PORT || 5001);

app.get('/', async (req,res) => {
    res.type('json');
    res.status(200);
    res.json({
        classes: await executeCrudOperations(req.query.classTitle),
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

  /*


const app = express();
app.set('port', process.env.PORT || 3000);

app.get('/', (req,res) => {
    console.log(req.query);
    console.log(req.query.number);

    res.type('json');
    res.status(200);
    res.json({
        facts: factsSet,
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
  */