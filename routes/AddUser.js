const express = require('express');
 var router= express.Router();
 var multer = require('multer');
 var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0/\/", salt);
//var hash = bcrypt.hashSync('bacon', 8);
 const Users= require('../Modals/User');
 var bodyParser = require('body-parser')

 router.get('/test', (req,res)=>{res.json(200).send('Route is working')});

 router.post('/add_user',(req,res)=>{
    let Name=req.body.name;
    let Email=req.body.email;
    let dob=req.body.dob;
    let mobile = req.body.mobile;
    let password=req.body.password;
    let gender= req.body.gender;
    let qualification=req.body.qualification;
    let skills=req.body.skills;
    let address= req.body.address;
    let city= req.body.city;
    let state= req.body.state;
    let country=req.body.country;
    

    Users.findOne({Email : Email}).then(user=>{
        if(user){
            res.status(409).json({error: `${email} is already registered`});
        }else{
                // var skillset=[];
                //     for(let i=0; i<skills.length; i++){
                //         skillset[i]=skills[i].toString();
                //     }


            const newUser= new Users ({
                    Name: Name,
                    Email: Email,
                    Mobile: mobile,
                    DOB: dob,
                    Password: password,
        
                
                    Gender: gender,
                    Qualification: qualification,
                    Skills: skills,
                    Address: address,
                    City: city,
                    States: state,
                    Country: country

            })

            bcrypt.genSalt(10, (err, salt)=>{

                bcrypt.hash(newUser.Password, salt,  (err, hash)=>{
                        if(err) throw err;

                        newUser.Password= hash;

                      newUser
                        .save()
                        .then(response=>res.json({
                            status: 200,
                            msg : response
                        }))
                        .catch(err=>console.log(err))
                })

            })

           
        }
    }).catch(err=>console.log(err));

 })

 module.exports=router;
 