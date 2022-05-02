const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const requst = require('request')

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.post('/',(req,res)=>{
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;
    var data = {
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]

    };
    var jsonData = JSON.stringify(data);
    const url = "https://us12.api.mailchimp.com/3.0/lists/f52ae2c766";
    const options = {
        method :"POST",
        auth:"gorgz:5bc97cb57af992f1c922fd70bf671ded-us12"

    }
    const request = https.request(url,options,(response)=>{
        if(response.statusCode === 200){
            res.sendFile(__dirname+'/sucess.html');
        }
        else{
            res.sendFile(__dirname+'/failure.html');
        }
        response.on("data",(data)=>{
            // console.log(JSON.parse(data));

        });


    });

    request.write(jsonData);
    request.end();



});

app.post("/failure",(req,res)=>{
    res.redirect('/');
})
app.post("/sucess",(req,res)=>{
    res.redirect('/');
})

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/signup.html');
})

app.listen(process.env.PORT|| 3000,()=>{
    console.log('server is running in port 3000');
})


// API KEY
// 5bc97cb57af992f1c922fd70bf671ded-us12

// list id
// f52ae2c766