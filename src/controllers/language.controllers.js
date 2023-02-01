import { getConnection } from "./../database/database";
import bodyparser from "body-parser";   
import { response } from "express";


const getLanguages = async (req, res) => {
   const connection= await getConnection();
    // res.json("gngbvcssf");
    const result=await connection.query("SELECT * FROM general");
    console.log(result);
    res.json(result);
};

const getLanguage = async (req, res) => {
   const connection= await getConnection();
    // res.json("gngbvcssf");
     const result=await connection.query("SELECT * FROM general WHERE RPU= ?", [req.params.RPU]);
     console.log(result);
     res.json(result[0]);
    
 };


 const createLanguage = async (req, res) => {
    const {RPU, Dependencia, Men_Bim, TFA } = req.body;
    const connection= await getConnection();
    const result=await connection.query('INSERT INTO general (Id_categoria, RPU, Dependencia, Men_Bim, TFA) VALUES (?, ?, ?, ?)', [RPU, DEPENDENCIA, MEN_BIM, TFA]);
      console.log(result);
      res.json(result);
     
  };
 

  const updateLanguage = async (req, res) => {
    const connection= await getConnection();
     
      const result=await connection.query("UPDATE general SET ? WHERE RPU = ?", [req.body, req.params.RPU]);
      console.log(result);
      res.json(result);
     
  };

  const deleteLanguage = async (req, res) => {
    const connection= await getConnection();
     // res.json("gngbvcssf");
      const result=await connection.query("DELETE FROM general WHERE RPU= ?", [req.params.RPU]);
      console.log(result);
      res.json(result);
     
  };

 const getSector= async (req, res) => {
    const connection= await getConnection();
     // res.json("gngbvcssf");
     const result=await connection.query("SELECT * FROM categorias");
     console.log(result);
     res.json(result);
 };
 
 const getSector1= async (req, res) => {
  const connection= await getConnection();
   const result=await connection.query("SELECT * FROM `poder ejecutivo`");
   console.log(result);
   res.json(result);
};



export const methods = {
    /* uploadExcel,*/ getSector1, getSector, getLanguages, getLanguage, createLanguage, updateLanguage, deleteLanguage
};