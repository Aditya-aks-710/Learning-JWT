const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "aditya123";

const app = express();
app.use(express.json());

const users = [];

app.post("/signup", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(u => u.username === username);

    users.push({
        username: username,
        password: password
    });

    res.json({
        message: "Login Successful !!"
    });

});

app.post("/signin", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(u => u.username === username);

    if(user){
        return res.json({
            message: "Username already exists !!"
        });
    }

    const token = jwt.sign({
        username
    }, JWT_SECRET);

    users.push({
        username: username,
        password: password
    });

    res.json({
        token: token
    });
});

//middleware for authentication

function auth(req, res, next){
    const token = req.headers.token;
    if(!token){
        return res.status(404).json({
            message: "No token found in headers"
        });
    }
    let decodedData;
    try{
        decodedData = jwt.verify(token, JWT_SECRET);
    } catch(err){
        return res.status(404).json({
            message: "Invalid token"
        });
    }
    if(decodedData.username){
        req.username = decodedData.username;
        next();
    } else{
        return res.json({
            message: "You are not logged in"
        });
    }
}

app.get("/me", auth, function(req, res) {
    
    //req.username was set to decodedData.username in auth function so can be used easily
    const userind = users.findIndex(u => u.username === req.username);
    if(userind === -1){
        return res.status(404).json({
            message: "Username not found in Database"
        });
    }
    const retrievedusername = users[userind].username;
    const retrievedpassword = users[userind].password;
    
    res.json({
        username: retrievedusername,
        password: retrievedpassword
    });
});

app.listen(3000);