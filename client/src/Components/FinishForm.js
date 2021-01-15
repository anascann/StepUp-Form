import React,{useState, useContext} from 'react'
import {UserContext} from "./UserContext"
import {Button,Row, Col} from "reactstrap"
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';
export default function FinishForm() {

    const {name,email,pass,dob,mobno, sex,degree, skill, address, city , state, county} = useContext(UserContext);

    const [NameValue,setNameValue]=name;
    const [EmailValue,setEmailValue]=email;
    const [PassWordValue, setPassWordValue]=pass;
    const [DOBvalue, setDOBvalue]=dob;
    const [GenderValue,setGenderValue]=sex;
    const [MobileNumberVal,setMobileNumberVal]=mobno

    const [DegreeType,setDegreeType]=degree;
      const [SkillsSetValue, setSkillsSetValue]= skill;
      const [AddressValue, setAddressValue]=address;
      const [CityValue,setCityValue]=city;
      const [StateValue,setStateValue]=state;
      const [CountryValue, setCountryValue]=county;


    const handleClick=async(e)=>{
        e.preventDefault();

        var object={
            name : NameValue,
            email: EmailValue,
            dob: DOBvalue,
            mobile: MobileNumberVal,
            password: PassWordValue,
            gender : GenderValue,
            qualification: DegreeType,
            skills: SkillsSetValue,
            address: AddressValue,
            city: CityValue,
            state: StateValue,
            country: CountryValue
        }

        console.log(object);

        await axios({
            url:'http://localhost:5000/add_user',
            method:'post',
            data: object

            
        }).then(response=>{
            console.log(response);
        }).catch(err=>console.log(err));    }

    return (
        <div >
        <Row>
        <Col>
        <h3 style={{marginLeft:'20%'}} >Submit your Form</h3>
        </Col>
        <Col>
           
        </Col>
        </Row>

        <Row>
        <Col>
        <Button style={{marginLeft:'20%'}} color="primary" size="lg" onClick={handleClick} active>Submit</Button>
        </Col>
        <Col>
        
        </Col>

        </Row>
            <br/><br/>
        </div>
    )
}
