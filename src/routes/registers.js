const { Router } = require('express');
const router = Router();
const { getAllRegisters } = require('../services/registers.services');
// const { getAllRegisters, getRegisterForId, deleteRegisterForId, insertRegister } = require('../services/registers.services');

// GET all registerss
router.get('/', getAllRegisters ); 

// GET An registers
// router.get('/:id', getRegisterForId );

// // DELETE An registers
// router.delete('/:id', deleteRegisterForId );

// // INSERT An registers
// router.post('/', insertRegister );

// router.put('/:id', (req, res) => {
//   const { name, salary } = req.body;
//   const { id } = req.params;
//   const query = `
//     SET @id = ?;
//     SET @name = ?;
//     SET @salary = ?;
//     CALL registersAddOrEdit(@id, @name, @salary);
//   `;
//   mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
//     if(!err) {
//       res.json({status: 'registers Updated'});
//     } else {
//       console.log(err);
//     }
//   });
// });

module.exports = router;
