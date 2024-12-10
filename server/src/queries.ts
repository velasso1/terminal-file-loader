const express = require('express');
require('dotenv').config();
const router = express.Router();
const database = require('./db-connection');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const normalizePath = require('./helpers/path-normalizer');

import { ICreateSubcategoryRequest, IPatchRequest, TCategories, IDeleteCategoryResult } from './types';
import { EmptyPayload } from './errors';

const upload = multer();

// get all events
router.get('/events', (req: null, res: any) => {
  const query = 'SELECT * FROM data_category';

  database.query(query, (error: Error, results: TCategories) => {
    if (error) throw error;

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.status(200).send(results);
  });
});

let fullImagePath: string = '';
let newImageName: string = '';

let fullVideoPath: string = '';
let newVideoName: string = '';

// create a subcategory

router.post(
  '/categories/subcategory/create',
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

      for (const item in req.files) {
        const fileName = req.files[item][0].originalname;
        const ext = path.extname(fileName);
        const baseName = path.basename(fileName, ext);
        const index = `${Math.random()}`.slice(2, 7);

        if (item === 'image') {
          fullImagePath = path.join(process.env.FILES_DIR, req.body.id, fileName);
          newImageName = `${baseName}${ext}`;

          if (fs.existsSync(fullImagePath)) {
            fullImagePath = path.join(process.env.FILES_DIR, req.body.id, `${baseName}(${index})${ext}`);
            newImageName = `${baseName}(${index})${ext}`;
          }

          fs.writeFileSync(fullImagePath, req.files['image'][0].buffer);
        } else {
          fullVideoPath = path.join(process.env.FILES_DIR, fileName);
          newVideoName = `${baseName}${ext}`;

          if (fs.existsSync(fullVideoPath)) {
            fullVideoPath = path.join(process.env.FILES_DIR, `${baseName}(${index})${ext}`);
            newVideoName = `${baseName}(${index})${ext}`;
          }

          fs.writeFileSync(fullVideoPath, req.files['video'][0].buffer);
        }
      }

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
            image: normalizePath(fullImagePath),
          };
          // and push new data to array
          subcategoryData.push(newSubcategoryData);

          const addSubcategoryQuery = `UPDATE data_category SET subcategory='${JSON.stringify(subcategoryData)}' WHERE id = ${req.body.id}`;
          const addNewVideoQuery = `INSERT INTO content (id, title, video) VALUES ('${results[0].id + 1}', '${req.body.name}', '${newVideoName}')`;

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
    res.status(200).send({ status: 200, message: 'SUCCESS' });
  }
);

// delete a subcategory
router.delete('/categories/subcategory/delete', (req: any, response: any) => {
  const deleteFromContent = `DELETE from content WHERE id = '${req.body.id}'`;
  const deleteFromDataCategory = `SELECT subcategory FROM data_category WHERE id=${req.body.paramsId}`;
  const getVideoNameById = `SELECT video FROM content WHERE id = ${req.body.id}`;

  // DELETE VIDEO === COMPLETE
  database.query(getVideoNameById, (req: any, res: { video: string }[]): void => {
    fs.unlinkSync(`${process.env.FILES_DIR}/${res[0].video}`, (error: Error) => {
      if (error) {
        response.status(EmptyPayload.ERROR.noSuchFile.code).send((new Error(), EmptyPayload.ERROR.noSuchFile));
        throw error;
      }
    });
  });

  fs.unlinkSync(`${req.body.image}`, (error: Error) => {
    if (error) throw error;
  });

  // DELETE FROM CONTENT = COMPLETED
  database.query(deleteFromContent, (error: Error, result: any) => {
    if (error) throw error;
    response.status(200).send();
  });

  database.query(deleteFromDataCategory, (error: Error, result: any) => {
    if (error) throw error;

    const filteredSubcategory = JSON.parse(result[0].subcategory).filter((item: { id: number; name: string; image: string }) => item.id !== req.body.id);

    const updateSubcategory = `UPDATE data_category SET subcategory='${JSON.stringify(filteredSubcategory)}' WHERE id = ${req.body.paramsId}`;

    database.query(updateSubcategory, (error: Error, result: any) => {
      if (error) throw error;
    });
  });

  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  response.status(200).send({ status: 200, message: 'SUCCESS REMOVED' });
});

// patch subcategory

router.patch('/categories/subcategory/update', (req: IPatchRequest, res: any) => {
  console.log('ID FOR PATCH:', req.body);

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.status(200).send({ status: 200, message: 'SUCCESS UPDATED' });
});

// Routes for categories

router.post(
  '/categories/category/create',
  upload.fields([{ name: 'image', maxCount: 1 }]),
  (req: { body: { name: string }; files: { image: [{ buffer: string; originalname: string }] } }, response: any) => {
    const newSubcategoryField: { id: number; name: string; image: string }[] = [];

    const getLastCategoryId = `SELECT id FROM data_category ORDER BY id DESC LIMIT 1`;

    database.query(getLastCategoryId, (error: Error, res: { id: number }[]) => {
      if (error) {
        throw error;
      }

      const newId = res[0].id + 1;

      fs.mkdir(`${process.env.FILES_DIR}/${newId}`, (creatingError: Error) => {
        if (creatingError) {
          throw error;
        }
      });

      const categoryImage = req.files['image'][0];
      const imagePath = process.env.CATEGORY_IMAGE + categoryImage.originalname;
      fs.writeFileSync(imagePath, categoryImage.buffer);

      const addNewCategory = `INSERT INTO data_category (id, category, subcategory, style) VALUES ('${newId}', '${req.body.name}', '${JSON.stringify(newSubcategoryField)}', '${imagePath}')`;

      database.query(addNewCategory, (error: Error, result: any) => {
        if (error) {
          throw error;
        }
      });
    });

    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    response.status(200).send({ STATUS: 200, MESSAGE: 'SUCCESS CREATED' });
  }
);

router.delete('/categories/category/delete', (req: { body: { id: number } }, response: any) => {
  const getSubcategoriesById = `SELECT * FROM data_category WHERE id = '${req.body.id}'`;
  const deleteCategory = `DELETE FROM data_category WHERE id = '${req.body.id}'`;

  database.query(getSubcategoriesById, (error: Error, result: IDeleteCategoryResult[]) => {
    if (error) {
      throw error;
    }
    // @ts-ignore
    const subcategories: ISubcategory[] = JSON.parse(result[0].subcategory);
    const ids: number[] = [];

    subcategories.map((item) => {
      ids.push(item.id);
    });

    const queryForDeleteCategories = `DELETE FROM content WHERE id IN (${ids.join(', ')})`;

    database.query(deleteCategory, (error: Error, res: any) => {
      if (error) {
        throw error;
      }
    });

    database.query(queryForDeleteCategories, (error: Error, res: any) => {
      if (error) {
        throw error;
      }
    });

    fs.unlinkSync(result[0].style, (error: Error) => {
      if (error) {
        throw error;
      }
    });

    fs.rm(`${process.env.FILES_DIR}/${req.body.id}`, { recursive: true }, (error: Error) => {
      if (error) {
        throw error;
      }
    });
  });

  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  response.status(200).send({ STATUS: 200, MESSAGE: 'SUCCESS CREATED' });
});

module.exports = router;
