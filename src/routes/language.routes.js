import { request, response, Router } from "express";
import { methods as languageController } from "./../controllers/language.controllers";
import { connection, getConnection } from "../database/database.js";

const path = require('path')
const multer = require('multer')
const fs = require('fs')
const router = Router();

const diskstorage = multer.diskStorage({
    destination: path.join(__dirname, '../files'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + 'cobcen' + file.originalname)
    }
})

const fileUpload = multer({
    storage: diskstorage,
}).single('excel')


router.get("/", languageController.getLanguages);
router.get("/sectores", languageController.getSector);
router.get("/poderejecutivo", languageController.getSector1);
router.get("/:RPU", languageController.getLanguage);
router.post("/", languageController.createLanguage);
router.put("/:RPU", languageController.updateLanguage);
router.delete("/:RPU", languageController.deleteLanguage);

router.post("/files/post", fileUpload, (req, res) => {
   
  req.g((err, conn) => {
        if(err) return res.status(500).send('server error')

        const type = req.file.mimetype
        const name  = req.file.originalname
        const data = fs.readFileSync(path.join(__dirname, '../files' + req.file.filename))

     conn.query('INSERT INTO prueba set ?', [{type, name, data}], (err, rows) => {
            if(err) return res.status(500).send('server error')

            res.send('image saved')
    
       })
    })

    console.log(req.file)
})


export default router;
