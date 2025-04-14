const express = require("express");
const { 
    handleGetAllUsers,
    handleGetUserByID,
    handleUpdateUserByID,
    handleDeleteUserByID,
    handleCreateNewUser,

 } = require("../controllers/users");

const router = express.Router();

router
    .route("/")
    .get(handleGetAllUsers)
    .post(handleCreateNewUser);

router
    .route('/:id')
    .get(handleGetUserByID)
    .patch(handleUpdateUserByID)
    .delete(handleDeleteUserByID);

module.exports = router;