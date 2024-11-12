const express = require('express');
const router = express.Router();
const database = require('./db-connection');

import { TCategories } from './types';

router.get('/events', (req: null, res: any) => {
  const query = 'SELECT * FROM data_category';

  database.query(query, (error: Error, results: TCategories) => {
    if (error) throw error;
    res.status(200).send(results);
  });
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
});

router.delete('/events/evendelete/');

module.exports = router;
