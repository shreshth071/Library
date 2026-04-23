const express = require('express');
const UserContoller = require('../Controllers/UserController');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({extended : false}));
router.get('/',(req,res)=>{
    res.render('login');
})
router.get('/login',(req,res)=>{
    res.render('login');
})
router.get('/signup',(req,res)=>{
    res.render('signup');
})
router.post('/add/user',(req,res)=>{
    UserContoller.addUser(req,res);
})
router.post('/login/user',(req,res)=>{
    UserContoller.getUser(req,res);
})
router.get('/users',(req,res)=>{
    UserContoller.getUsers(req,res);
})
router.get('/edit/user/page/:id',(req,res)=>{
    UserContoller.getUserForEdit(req,res);
})
router.post('/update/user/:id',(req,res)=>{
    UserContoller.UpdateUser(req,res);
})
router.get('/delete/user/page/:id',(req,res)=>{
    UserContoller.deleteUser(req,res);
})
module.exports = router