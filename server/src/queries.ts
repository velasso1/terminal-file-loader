const express = require('express');
require('dotenv').config();
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
          res.status(EmptyPayload.ERROR.emptyPayload.code).send((new Error(), EmptyPayload.ERROR.emptyPayload));
          return;
        }
      }

      // save files on server
      const uploadedImage = req.files['image'][0];
      const uploadedVideo = req.files['video'][0];

      fs.writeFileSync(`${process.env.FILES_DIR}/${req.body.id}/${uploadedImage.originalname}`, req.files['image'][0].buffer);
      fs.writeFileSync(`${process.env.FILES_DIR}/${uploadedVideo.originalname}`, req.files['video'][0].buffer);

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
            image: `${process.env.BASE_URL}/upload_files/${req.body.id}/${uploadedImage.originalname}`,
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
    res.status(200).send({ status: 200, message: 'subcategory created successfull' });
  }
);

// delete a subcategory
router.delete('/categories/subcategories/delete', (req: any, res: any) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  // DELETE VIDEO === COMPLETE
  fs.unlinkSync(`${process.env.FILES_DIR}/test-video.mp4`, (error: Error) => {
    if (error) {
      res.status(EmptyPayload.ERROR.noSuchFile.code).send((new Error(), EmptyPayload.ERROR.noSuchFile));
      throw error;
    }
  });

  // fs.unlinkSync(`${req.body.imagePath}`, (error) => {if (error) throw error;}); - UNCOMMENT ON PRODUCTION!!!!!

  fs.unlinkSync(`${process.env.FILES_DIR}/${req.body.paramsId}/test-image.jpg`, (error: Error) => {
    if (error) throw error;
  });

  const deleteFromContent = `DELETE from content WHERE id = '${req.body.id}'`;
  const deleteFromDataCategory = `SELECT subcategory FROM data_category WHERE id=${req.body.paramsId}`;

  // DELETE FROM CONTENT = COMPLETED
  database.query(deleteFromContent, (error: Error, result: any) => {
    if (error) throw error;
    res.status(200).send();
  });

  database.query(deleteFromDataCategory, (error: Error, result: any) => {
    if (error) throw error;

    const filteredSubcategory = JSON.parse(result[0].subcategory).filter(
      (item: { id: number; name: string; image: string }) => item.id !== req.body.id
    );

    const updateSubcategory = `UPDATE data_category SET subcategory='${JSON.stringify(filteredSubcategory)}' WHERE id = ${req.body.paramsId}`;

    database.query(updateSubcategory, (error: Error, result: any) => {
      if (error) throw error;
    });
  });
});

module.exports = router;
