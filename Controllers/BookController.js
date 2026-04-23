const Books = require('../Models/Book');
const cloudinary = require("cloudinary").v2;

async function addBook(req,res){
    try{
        let book = new Books(req.body);
        if(req.file){
            cloudinary.config({ 
                cloud_name: 'dd47rge5f', 
                api_key: '768345956955758', 
                api_secret: 'urFrQMIi4MzxgVmfkYVV6LjJQjw' // Click 'View API Keys' above to copy your API secret
            });
            const result = await cloudinary.uploader.upload(req.file.path);
            console.log(result.secure.url,'upload.secure.url');
            console.log(req.file,'req.file');
            book.bookImage=result.secure_url
        }
        await books.save();
        let books=await Book.find({});
        res.render('booklist',{
            books: books
        })
    } catch(error){
        console.log(error);
    }
    console.log("Reciver from data :" , req.body);
    // console.log("hrer..")
    console.log(req.file,'req.file');
    res.end("<h1>Uploading in process....</h1>");
    // try {
    //     console.log(req.body);
    //     let Book = new Books(req.body);
    //     Book.isbn = await Book._id;
    //     await Book.save();
    //     let books = await Books.find({});
    //     res.render('bookList',{
    //         books:books
    //     })  
    // } catch (err) {
    //     console.log(err);
        
    // }
}
async function getBooks(req,res) {
    try {
        let books = await Books.find({});  
        res.render('bookList.ejs',({
            books:books
        }))
    } catch (err) {
        console.log(err);
        
    }
}

async function deleteBook(req,res) {
    try {
        let id = req.params.id;
        await Books.deleteOne({_id : id});
        let books = await Books.find({});  
        res.render('bookList.ejs',({
            books:books
        }))
    } catch (err) {
        console.log(err);
        
    }
}
async function getBookForEdit(req,res) {
    try {
        let id = req.params.id;
        let book = await Books.findOne({_id:id});
        if(book){
            res.render('UpdateBook',{
                book:book
            })
        }
    } catch (err) {
        console.log(err);
        
    }
}
async function updateBook(req,res) {
    let id = req.params.id;
    let book = await Books.findOne({_id:id});
    book.bookTitle = req.body.bookTitle;
    book.publisher = req.body.publisher;
    book.price = req.body.price;
    book.language = req.body.language;
    book.edition = req.body.edition;
    book.noOfPages = req.body.noOfPages;
    book.country = req.body.country;
    await book.save();
    books = await Books.find({});
    res.render('bookList',{
        books : books
    })

}
async function getBookForUser(req,res) {
    try {
        let books = await Books.find({});  
        res.render('BookListForUser.ejs',({
            books:books
        }))
    } catch (err) {
        console.log(err);
        
    }
}
module.exports={
    addBook,
    getBooks,
    deleteBook,
    getBookForEdit,
    updateBook,
    getBookForUser
}