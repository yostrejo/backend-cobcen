
import { request, response, Router } from "express";
import { methods as languageController } from "./../controllers/language.controllers";
import { connection, getConnection } from "../database/database.js";

const path = require('path')
const multer = require('multer')
const fs = require('fs')
const router = Router();
const xlsx = require('xlsx');


const diskstorage = multer.diskStorage({
  destination: path.join(__dirname, '../files'),
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})


const fileUpload = multer({
  storage: diskstorage,
}).single('file')


router.get("/", languageController.getLanguages);
router.get("/registros", languageController.getRegistros);
router.get("/sectores", languageController.getSector);
router.get("/poderejecutivo", languageController.getSector1);
router.get("/:RPU", languageController.getLanguage);
router.post("/", languageController.createLanguage);
router.put("/:RPU", languageController.updateLanguage);
router.delete("/:RPU", languageController.deleteLanguage);

router.put("/formatear", languageController.formatRegistros);


router.post('/files', fileUpload, languageController.createRegistro);
/*
async (req, res) => {

  const workbook = xlsx.readFile(path.join(__dirname, '../files/' + req.file.filename));
  const sheet_name_list = workbook.SheetNames;
  const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

  //const RPU = data.map(row => row.RPU);
  //const CONSUMO = data.map(row => row.CONSUMO);
  //const IMPORTE = data.map(row => row.IMPORTETOTAL);
  const connection = await getConnection();
  //console.log(data);
  const sql = `UPDATE general SET Consumo = ?, Importe = ? WHERE RPU = ?`;

  data.forEach(row => {
    const values = [row.CONSUMO, row.IMPORTETOTAL, row.RPU];
    
    connection.query(sql, values, (error, results) => {
       console.log(values, data, results);
    }); 
  });
*/
  /*const connection = await getConnection();
  const result = await connection.query(`UPDATE general SET Consumo = ?, Importe = ? WHERE RPU = ?`);
  console.log(result);
  res.json(result);*/



//})

/* router.post('/files', (req, res) => {
 

 const workbook = xlsx.read(req.body, { type: 'buffer' });
 const worksheet = workbook.Sheets[workbook.SheetNames[0]];
 const data = xlsx.utils.sheet_to_json(worksheet);

 data.forEach((row) => {
   const { RPU, CONSUMO, IMPORTETOTAL } = row;

   const sql = `UPDATE general SET Consumo = ?, Importe = ? WHERE RPU = ?`;
   const values = [CONSUMO, IMPORTETOTAL, RPU];

   connection.query(sql, values, (error, results) => {
     if (error) throw error;
     console.log(results.affectedRows);
   });
  res.json(sql);
 });

 
}); */
/* router.post('/files', (req, res) => {
   const workbook = xlsx.read(req.body.archivo, { type: 'buffer' });
   const worksheet = workbook.Sheets[workbook.SheetNames[0]];
   const datos = xlsx.utils.sheet_to_json(worksheet);
   const RPU = datos.map((dato) => dato.RPU);
   const Consumo = datos.map((dato) => dato.CONSUMO);
   const Importe = datos.map((dato) => dato.IMPORTETOTAL);
   const sql = "UPDATE general SET Consumo = ?, Importe = ? WHERE RPU = ?";
   const values = datos.map((dato) => [dato.CONSUMO, dato.IMPORTETOTAL, dato.RPU]);
   connection.query(sql, [values], (error, result) => {
     if (error) {
       res.status(500).send(error);
     } else {
       res.send('Datos guardados correctamente');
     }
   });
 });*/






/* (req, res) => {
    const file = req.file;
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    // obtiene la hoja de trabajo
    const sheet = workbook.Sheets[workbook.SheetNames[0]];   
    // convierte la hoja de trabajo en un objeto de JavaScript
    const data = xlsx.utils.sheet_to_json(sheet);    
    // itera sobre los datos y los inserta en la base de datos
    data.forEach((row) => {
      const { RPU, CONSUMO, IMPORTETOTAL } = row;     
      // realiza una consulta para actualizar los datos en la tabla 'usuarios' que coincidan con el id del archivo de Excel
      const query = `UPDATE general SET Consumo='${CONSUMO}', Importe='${IMPORTETOTAL}' WHERE RPU=${RPU}`;
      connection.query(query, (error, results, fields) => {
        if (error) throw error;
        console.log(results);
      });
    });
   res.send('Archivo cargado exitosamente');
})*/
/*(req, res) => {
 
 
 
req.getConnection((err, connection) => {
    if(err) return res.status(500).send('server error')

        const data = fs.readFileSync(path.join(__dirname, '../files' + req.file.filename)),
       
 
connection.query('INSERT INTO image set ?', [{type, name, data}], (err, rows) => {
            if(err) return res.status(500).send('server error')
 
        res.send('image saved')
 
   })
})

console.log(req.file)
})*/


export default router;
