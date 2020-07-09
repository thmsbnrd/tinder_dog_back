const express = require('express');
const router = express.Router();
const connexion = require('../config');

//Get all user
router.get('/', (req, res) => {
  let sql = 'SELECT * FROM user';
  connexion.query(sql, (err, results) => {
		if (err) {
			return res.status(500).json({
					error : err.message,
					sql: err.sql
			})
		}
		return res.json(results)
		})
});

//Get one user
router.get("/:id", (req, res) => {
	let sql = 'SELECT * from user WHERE id = ?'
	const idUser = req.params.id 
	connexion.query(sql,[idUser], (err, results) => {
	  if (err) {
		res.status(500).send('Erreur lors de la récupération d\'un utilisateur');
	  } else {
		res.json(results);
	  }
	});
  });

// post one doctor
router.post('/', (req, res) => {
	const formBody = req.body;
	connexion.query('INSERT INTO user SET ?', [formBody], (err, results) => {
		if (err) {
			return res.status(500).json('Erreur lors de la modification du patient');
		};
		return res.sendStatus(201);
		});
});


//Delete one user
router.delete('/:id', (req, res) => {
	let sql = 'DELETE FROM user WHERE id = ?'
	const userId = req.params.id;
	db.query(sql, userId, err => {
	  if (err) {
		console.log(err);
		res.status(500).send("Erreur lors de la supression d'un utilisateur");
	   } else {
		res.sendStatus(200);
	  }
	});
  });

// Get all matchs for one user
router.get("/:id/matchs", (req, res) => {
	const idMatchs = req.params.id;
	let sql = ''
	connexion.query(sql, [idMatchs], (err, results) => {
	  if (err ) {
		res.status(500).json({
			error: err.message,
			sql: err.sql
		  });
	  }
	  else {
		return res.status(200).json({data: results});
	  }
	});
  });

//Get one match for one user
router.get('/:idUser/exams/:idExam', (req, res) => {
	const idUser = req.params.idUser;
	const idMatch = req.params.idMatch;
	let sql = ''
	connexion.query(sql, [idUser, idMatch], (err, results) => {
	  if(err){
		res.status(500).json({
		  error: err.message,
		  sql: err.sql
		});
	  }
	  else{
		res.json({data: results});
	  }
	});
});

module.exports = router;