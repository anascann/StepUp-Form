import React,{useState,useContext} from 'react'
import {Row, Col, InputGroup, InputGroupAddon, Input, Container, Label,Button} from "reactstrap";
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import CallIcon from '@material-ui/icons/Call';
import TodayIcon from '@material-ui/icons/Today';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ImageIcon from '@material-ui/icons/Image';
import WcIcon from '@material-ui/icons/Wc';
import PublishIcon from '@material-ui/icons/Publish';
import {UserContext} from "./UserContext"
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';





export default function AcademicForm() {
    const {name,email,pass,dob,mobno, sex} = useContext(UserContext);

    const [NameValue,setNameValue]=name;
    const [EmailValue,setEmailValue]=email;
    const [PassWordValue, setPassWordValue]=pass;
    const [DOBvalue, setDOBvalue]=dob;
    const [GenderValue,setGenderValue]=sex;
    const [MobileNumberVal,setMobileNumberVal]=mobno


    const [EmailValid, setEmailValid]=useState(null);
    const [PassValid, setPassValid]=useState(null);
    const [PassMatch, setPassMatch]=useState(null);

    const [image, setImage] = useState([]);

    var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    const handleEmailChange=(e)=>{
        console.log(e.target.value);
        if(regexEmail.test(e.target.value)){
                setEmailValid(true);
                setEmailValue(e.target.value);
        }else{
                setEmailValid(false);
        }
    }
    var strongRegex = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const handlePasswordChange=(e)=>{
        console.log(e.target.value);

        if(strongRegex.test(e.target.value)){
            setPassValid(true);
            
            setPassWordValue(e.target.value);
        }else{
            setPassValid(false);
        }

    }

    const handleConfirmPasswordChange=(e)=>{
        console.log(PassWordValue);
        console.log(e.target.value);
        let pass=e.target.value
        if(PassWordValue === pass){
            setPassMatch(true);
        }else{
            setPassMatch(false);
        }
    }

    const handleImageChange = e => {
        console.log(e.target.files[0])
    setImage(e.target.files[0]);

    setImage([...image, e.target.files[0]]);


    // var res=document.querySelector('upload-img').get(0).files[0];
    //         console.log(res);
};

      const handleUpload=async(e)=>{
        e.preventDefault();

console.log(image[0]);
        

        await axios({
            url:'http://localhost:5000/upload',
            method:'post',
            data:{
                'image': image[0]
            },

         headers:{
            'Content-Type': ' application/json'
            
         }
            
        }).then(response=>{
            console.log(response);
        }).catch(err=>console.log(err));

      }
    



    return (
        <div  style={{display:'flex' ,justifyContent:'center'}}>
        <Container>
        <h2>Enter your Personal details:</h2>
        <br/>
            <Row>
                <Col>
                
                <InputGroup>
                <h6>Name : </h6>
                <InputGroupAddon addonType="prepend"><PersonIcon/></InputGroupAddon>
                     <Input onChange={(e=> setNameValue(e.target.value))} />
                 </InputGroup>
                </Col>

                <Col>
                <InputGroup>
                <h6>Email : </h6>
                <InputGroupAddon addonType="prepend"><EmailIcon/></InputGroupAddon>
                     <Input type="email" onChange={handleEmailChange} />
                     {EmailValid ? <p style={{color:'green'}}>Email is Valid</p> : <p style={{color:'red'}}>Enter a valid Email</p>}
                 </InputGroup>
                </Col>
                </Row>
                    <br/>
                    <br/>
                <Row>

                
                    <Col>

                    <InputGroup>
                    <h6>Mobile : </h6>
                    <InputGroupAddon addonType="prepend"><CallIcon/></InputGroupAddon>
                         <Input type="text" onChange={(e)=>setMobileNumberVal(e.target.value)} />
                     </InputGroup>

                    </Col>

                    <Col>

                    <InputGroup>
                    <h6>DOB : </h6>
                    <InputGroupAddon addonType="prepend"> <TodayIcon/> </InputGroupAddon>
                         <Input onChange={(e)=>setDOBvalue(e.target.value)}  type="date"
                         name="date"
                         id="exampleDate"
                         placeholder="date placeholder"/>
                     </InputGroup>

                    </Col>

                    
                </Row>

                <br/>

                <Row>

                <Col>

                <InputGroup>
                <h6>Password : </h6>
                <InputGroupAddon addonType="prepend"> <VpnKeyIcon/> </InputGroupAddon>
                     <Input type="password" onChange={handlePasswordChange} />
                 </InputGroup>
                 {PassValid ? <p style={{color: 'green'}}>Strong Password!</p> : <p style={{color: 'red'}}>Weak PassWord!!</p>}

                </Col>

                <Col>

                <InputGroup>
                <h6>Confirm Password : </h6>
                <InputGroupAddon addonType="prepend"> <VpnKeyIcon/> </InputGroupAddon>
                     <Input type="password" onChange={handleConfirmPasswordChange} />
                 </InputGroup>
                 {PassMatch ? <p style={{color: "green"}}>Password match</p>: <p style={{color: 'red'}}>Password doesn't match</p>}

                </Col>
                </Row>
                    <br/>
                <Row>
                <Col xs="4">

                <InputGroup>
                <h6>Upload Image : </h6>
                <InputGroupAddon addonType="prepend"> <ImageIcon/> </InputGroupAddon>
                    <div className="upload-img"> <input type="file" onChange={handleImageChange} /></div>
                 </InputGroup>
                 <br/>
                 <Button color="secondary" onClick={handleUpload} ><PublishIcon/>   Upload</Button>
            <br/>
            <br/>
            </Col>

            <Col>
            
            <h6>
            Gender: 
            </h6>

           
            <Input type="radio" value="male" onChange={()=>setGenderValue('male')} name="radio2"/>{' '}
            <h6>Male</h6>


          
          <Input type="radio" value="female" onChange={()=>setGenderValue('female')} name="radio2" />{' '}
          <h6>Female</h6>
        
            </Col>
            </Row>
            

              

                </Container>

        </div>
    )
}
