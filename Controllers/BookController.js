const Books = require('../Models/Book');
const cloudinary = require("cloudinary").v2;

const { Readable } = require('stream');

async function addBook(req, res) {
    try {
        let book = new Books(req.body);
        if (req.file) {
            cloudinary.config({ 
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dd47rge5f', 
                api_key: process.env.CLOUDINARY_API_KEY || '768345956955758', 
                api_secret: process.env.CLOUDINARY_API_SECRET || 'urFrQMIi4MzxgVmfkYVV6LjJQjw'
            });

            const uploadStream = () => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { folder: "library_books" },
                        (error, result) => {
                            if (result) resolve(result);
                            else reject(error);
                        }
                    );
                    Readable.from(req.file.buffer).pipe(stream);
                });
            };

            const result = await uploadStream();
            book.bookImage = result.secure_url;
        }
        await book.save();
        let books = await Books.find({});
        return res.render('bookList', {
            books: books
        });
    } catch (error) {
        console.error("Error adding book:", error);
        return res.status(500).send("Error adding book");
    }
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