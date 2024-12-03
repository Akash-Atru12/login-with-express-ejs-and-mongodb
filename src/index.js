const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config")

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended:false}));

app.set('view engine','ejs');
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("login");
})

app.get("/signup",(req,res)=>{
    res.render("signup");
})
app.get('/login', (req, res) => {
    res.render('login'); // Render the login.ejs page
});

app.post("/signup",async(req,res)=>{
    try {
    const data ={
        name:req.body.username,
        password:req.body.password 
    }

    const existuser = await collection.findOne({name:data.name});
    
    if(existuser){
        res.send("user already exist. please choose different username")
    }else{
        const saltRounds = 10;
        const hashpass = await bcrypt.hash(data.password , saltRounds);

        data.password = hashpass;
        const userdata = await collection.insertMany(data);
        console.log(userdata);
    }
    console.log('User signed up successfully!');
        // Redirect to login page
        res.redirect('/login');
    } catch (error) {
        console.error('Error signing up:', error);
        res.render('signup', { error: 'Error signing up. Please try again.' });
    }

})

app.post("/login",async(req,res) =>{
    try{
        const check = await collection.findOne({name:req.body.username})
        if(!check){
            res.send("username not found")
        }

        const matchpass = await bcrypt.compare(req.body.password,check.password);
        if(matchpass){
            res.render("home");
        }
        else{
            req.send(" wrong password");
        }
    }catch{
        res.send("wrong details");
    }
})


const PORT=5000;
app.listen(PORT,()=>{
    console.log(`server conevted in ${PORT}`);
})