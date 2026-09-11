require('dotenv').config();
const express = require('express');
const path = require('path');
const connection = require('./Connection');
const user = require('./Routes/User');
const book = require('./Routes/Book');
const common = require('./helper/common');

const app = express();

// View Engine & Static Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to DB and ensure admin user exists on startup
connection().then(() => {
    common.createAdmin().catch(err => console.error("Admin user creation error:", err));
}).catch(err => {
    console.error("DB initialization error:", err);
});

// Routes
app.use(user);
app.use(book);

if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Server is listening on port ${PORT}`);
        }
    });
}

module.exports = app;