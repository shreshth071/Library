const express = require('express');
const multer = require('multer');
const BookController = require('../Controllers/BookController');
const router = express.Router();
const upload = multer({
     storage:multer.diskStorage({}),
     limits: {fileSize: 10*1024*1024}
 })
router.use(express.json());
router.use(express.urlencoded({extended : false}));
router.get('/',(req,res)=>{
    
})
router.get('/book/add/page',(req,res)=>{
     res.render('AddBook');
})
router.post('/book/add',upload.single('bookImage'),(req,res)=>{
     BookController.addBook(req,res);
})
router.get('/books/list',(req,res)=>{
     BookController.getBooks(req,res);
})
router.get('/book/delete/:id',(req,res)=>{
     BookController.deleteBook(req,res);
})
router.get('/book/update/page/:id',(req,res)=>{
     BookController.getBookForEdit(req,res);
})
router.post('/book/update/:id',(req,res)=>{
     BookController.updateBook(req,res);
})
router.get('/user/book/list',(req,res)=>{
     BookController.getBookForUser(req,res);
})
router.get('/user/home',(req,res)=>{
     res.render('userHome');
})
router.get('/contact',(req,res)=>{
     res.render('Contact');
})
router.get('/about',(req,res)=>{
     res.render('AboutUs');
})
module.exports=router;