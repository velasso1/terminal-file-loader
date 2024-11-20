const express = require('express');
const router = express.Router();
const database = require('./db-connection');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

import { TCategories } from './types';
import { ICreateSubcategoryRequest } from './types';

import { EmptyPayload } from './errors';

const upload = multer();

// get all events
router.get('/events', (req: null, res: any) => {
  const query = 'SELECT * FROM data_category';

  database.query(query, (error: Error, results: TCategories) => {
    if (error) throw error;

    res.status(200);
    res.send(results);
  });
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
});

// create a subcategory
router.post(
  '/categories/subcategories/create',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ]),
  (req: ICreateSubcategoryRequest, res: any) => {
    try {
      // check for empty fields
      for (const item in req.body) {
        if (req.body[item].length === 0) {
          res.status(EmptyPayload.ERROR.code).send((new Error(), EmptyPayload));
          return;
        }
      }

      // save files on server
      const uploadedImage = req.files['image'][0];
      const uploadedVideo = req.files['video'][0];

      fs.writeFileSync(`backend/upload_files/${req.body.id}/${uploadedImage.originalname}`, req.files['image'][0].buffer);
      fs.writeFileSync(`backend/upload_files/${uploadedVideo.originalname}`, req.files['video'][0].buffer);

      // update info about files to database
      const checkIdQuery = `SELECT id FROM content ORDER BY id DESC LIMIT 1`;
      const query = `SELECT subcategory FROM data_category WHERE id=${req.body.id}`;

      // checkIdQuery check a last id;
      database.query(checkIdQuery, (error: Error, results: { id: number }[]) => {
        // query adding a new subcategoryData witn lastId + 1
        database.query(query, (error: Error, subcatResults: any) => {
          const subcategoryData = JSON.parse(subcatResults[0].subcategory);

          // make a new subcategoryData
          const newSubcategoryData = {
            id: results[0].id + 1,
            name: req.body.name,
            image: `http://10.10.0.11:4001/upload_files/${req.body.id}/${uploadedImage.originalname}`,
          };
          // and push new data to array
          subcategoryData.push(newSubcategoryData);

          const addSubcategoryQuery = `UPDATE data_category SET subcategory='${JSON.stringify(subcategoryData)}' WHERE id = ${req.body.id}`;
          const addNewVideoQuery = `INSERT INTO content (id, title, video) VALUES ('${results[0].id + 1}', '${req.body.name}', '${
            uploadedVideo.originalname
          }')`;

          // update array with subcategory in database
          database.query(addSubcategoryQuery, (error: Error, results: any) => {
            if (error) {
              throw new Error('Error with write new subcategory to DB');
            }
          });

          // write info about video-file to database;
          database.query(addNewVideoQuery, (error: Error, results: any) => {
            if (error) {
              throw new Error('Error with write new content to DB');
            }
          });
        });
      });
    } catch (error) {
      console.error(error);
    }

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  }
);

// delete a subcategory
router.delete('/categories/subcategories/delete', (req: any, res: any) => {});

module.exports = router;
