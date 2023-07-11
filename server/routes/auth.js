const express = require("express");
const app = express();
const router = express.Router();
const nodemailer = require('nodemailer');
const generateToken  = require('../utils/jwt.js');
const jwt =require('jsonwebtoken');
require("dotenv").config();

const transportOptions = {
    host: process.env.SMTP_HOST,
    port : process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.APP_PASSWORD
    }
    };
    
const transporter = nodemailer.createTransport(transportOptions);
console.log(transporter.options)
const emailHtmlTemplate = ({email, link}) => `
<p> <b> Dear ${email} </b></p>  
<p> Click the link to get account access: ${link}</p>
 `;



router.get('/account', (req,res) => {
    // taking token query parameter from the request 
    const {token} = req.query;
    if(!token) {
        res.status(403).send({
            message: "No token found",
        })
    }
    
    let user;
    try {
     user = jwt.verify(token, process.env.JWT_SECRET);
    }
    catch (err){
 res.status(403).send({message: err.message})
    }

    if(!user) {
        res.status(403)
        .send({
            message: "Token signature invalid"
        })
     }
     else {
        const {email, expirationDate} = user;
        if(!email || !expirationDate) {
            res.status(403)
            .send({
                message: " invalid user credentials => email and expirationDate not found"
            })
        }

        if(expirationDate < new Date()) {
            res.status(403)
            .send({
                message: "token expired"
            })
        };

        res.status(200).send("user is validated")
     }
})

router.post("/login", async (req, res) => {
    const email = req.body.email;
    console.log(email);
    if(!email) {
        res.sendStatus(404);
    }

//get token
 const accessToken = generateToken(email);
 const mailOptions = {
    from: "donotreply",
    to: email,
    subject: "Login using the magic link",
    html : emailHtmlTemplate({
       email,
       link:  `http://localhost:5000/account?token=${accessToken}`,
    })
};

return  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      res.send({message: error.message});
    } else {
      res.status(200);
      res.send(`Magic link sent. : http://localhost:5000/account?token=${accessToken}`);
    }
  });
});


module.exports = router;