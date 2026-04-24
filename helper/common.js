let User = require('../Models/Users');
const bcrypt = require('bcryptjs');
const saltRound = 10;

async function createAdmin(){
    try {
        let existingAdmin = await User.findOne({ email: 'admin@rdec.in' });
        if (existingAdmin) {
            console.log("Admin user already exists.");
            return;
        }
        let password = bcrypt.hashSync('55555',saltRound)
        let adminData = {
            FirstName : 'Devang',
            LastName : 'Singh',
            email : 'admin@rdec.in',
            PassWord : password,
            MobileNo : 78954321,
            userType : 1,

        }
        let user = new User(adminData);
        await user.save();

    } catch (err) {
        console.log(err);
        
    }
}
module.exports = {
    createAdmin
}