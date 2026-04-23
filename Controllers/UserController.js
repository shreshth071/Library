const bcrypt = require('bcrypt');
const { log } = require('console');
const Users = require('../Models/Users');

const saltRound = 10;



async function addUser(req,res) {
    try {
        console.log(req.body);
        let password = bcrypt.hashSync(req.body.PassWord,saltRound);
        console.log(password);
        //check id has been alredy registerd or not;
        let userExits = await Users.find({email:req.body.email})
        if(userExits){
            res.end("<h1>User Already Exists </h1>")
        }
        let user = new Users(req.body);
        if (req.body.PassWord==req.body.ConfirmPass) {
            user.PassWord=password;
            user.userType=2;
            await user.save();
            res.render('login');
        } else {
            res.end("Password Did'nt match")
        }
        await user.save();
        res.redirect('login');    
    } catch (err) {
        console.log(err);
        
    }
}
async function getUser(req, res) {
    try {
        console.log(req.body);
        const { username, password } = req.body;

        console.log(username, 'username');
        console.log(password, 'password');

        // Find user by email
        let user = await Users.findOne({ email: username });

        if (user) {
            // Compare provided password with stored hash
            let isMatch = await bcrypt.compare(password, user.PassWord);
            
            if (isMatch) {
                // Check if the user is admin (userType 1)
                if (user.userType == 1) {
                    return res.render('home', {
                        user: user
                    }); // Render admin home page
                } else {
                    return res.render('userHome', {
                        user: user
                    }); // Render regular user home page
                }
            } else {
                return res.status(401).send("<h1>Password didn't match</h1>");
            }
        } else {
            return res.status(404).send("User not found");
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
}

async function getUsers(req,res){
    try {
        let users = await Users.find({});
        res.render('userList.ejs',{
            users: users
        });
    } catch (err) {
        console.log(err);
        
    }
}
async function getUserForEdit(req,res){
    try {
        let id = req.params.id;
        console.log(id);
        
        let user = await Users.findOne({_id:id});
        console.log(user);
        res.render('UpdateUser.ejs',{
            user: user
        });
    } catch (err) {
        console.log(err);
        
    }
}
async function UpdateUser(req,res) {
    try {
        let id = req.params.id;
        let user = await Users.findOne({_id:id});
        user.email = req.body.email;
        user.FirstName = req.body.FirstName;
        user.LastName = req.body.LastName;
        user.MobileNo = req.body.MobileNo;
        if(req.body.PassWord == req.body.ConfirmPass){
            user.PassWord = bcrypt.hashSync(req.body.PassWord,saltRound);
        }
        else{
            res.end("Password not match....")
        }
        await user.save();
        let users = await Users.find({});
        res.render('userList.ejs',{
            users: users
        });

    } catch (err) {
        console.log(err);
        
    }
}
async function  deleteUser(req,res) {
    try {
        let id = req.params.id;
        await Users.deleteOne({_id:id});
        let users = await Users.find({});
        res.render('userList',({
            users:users
        }));
    } catch (err) {
        console.log(err);
        
    }
}
module.exports = {
    addUser,
    getUser,
    getUsers,
    getUserForEdit,
    UpdateUser,
    deleteUser
}