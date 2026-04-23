const mongoose = require('mongoose');

async function connection() {
    try {
        // Connect to UserData database
        const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/UserData';
        await mongoose.connect(dbUri);
        console.log("UserData Database Connected");

        // Create a separate connection for the bookData database
        const bookDbUri = process.env.BOOKDATA_MONGODB_URI || 'mongodb://localhost:27017/BookData';
        const bookDataConnection = await mongoose.createConnection(bookDbUri);
        console.log("Book DataBase is connected");
    } catch (err) {
        console.log(err);
    }
}

module.exports = connection;