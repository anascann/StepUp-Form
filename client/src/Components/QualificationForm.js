import React,{useEffect,useState,useContext} from 'react'
import {Row, Col, InputGroup, InputGroupAddon, Input, Container, Label,FormGroup} from "reactstrap";
import axios from "axios";  
import {UserContext} from "./UserContext"; 
import SchoolIcon from '@material-ui/icons/School';
import HomeIcon from '@material-ui/icons/Home';
import WorkIcon from '@material-ui/icons/Work';

import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css"


export default function QualificationForm() {
      const {degree, skill, address, city , state, county} = useContext(UserContext);

      const [DegreeType,setDegreeType]=degree;
      const [SkillsSetValue, setSkillsSetValue]= skill;
      const [AddressValue, setAddressValue]=address;
      const [CityValue,setCityValue]=city;
      const [StateValue,setStateValue]=state;
      const [CountryValue, setCountryValue]=county;



    const [MetaData,setMetaData]=useState([]);
    const [Country,setCountry]=useState(' ');
    const [States,setStates]=useState([]);
    //const [state,setstate]=useState(' ');
    const [Cities,setCities]=useState([]);
    const [City,setCity]=useState(' ');

    const [Items,setItems]=useState([]);
const [Value,setValue]=useState(' ');


   const FetchCountries=async()=>{
        await axios({
            url:'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bstates%2Bcities.json',
            method:'get',
        }).then(response=>{
            console.log(response.data);
            setMetaData(response.data);
        }).catch(err=>console.log(err));
   }

   useEffect(()=>{
        FetchCountries();
   },[])

   const handleCountryChange=async(e)=>{
    console.log(e.target.value);

        await MetaData.map((key,index)=>{
            if(e.target.value === key.name){
                
                setCountry(key.name);
                setStates(key.states);
                setCountryValue(key.name);

            }
        })

   }

   const handleStateChange=(e)=>{
       console.log(e.target.value);

       States.map(key=>{
           if(key.name === e.target.value){
              // setstate(key.name);
               setCities(key.cities);
               setStateValue(key.name);
           }
       })
   }

   const handleDelete = item => {
    // this.setState({
    //   items: this.state.items.filter(i => i !== item)
    // });

    setItems(Items.filter(i=>i!=item));
    setSkillsSetValue(SkillsSetValue.filter(i=>i!=item));
  };

  const handleKeyDown = evt => {
    if (["Enter", "Tab", ","].includes(evt.key)) {
      evt.preventDefault();

      var value = Value.trim();

      
        // this.setState({
        //   items: [...this.state.items, this.state.value],
        //   value: ""
        // });

        // setItems({
        //     ...Items,
        //     Value
        // });

        setItems([...Items, value]);
        setSkillsSetValue([...SkillsSetValue, value]);
        setValue(" ");
      
    }
  };

  const handleChange = evt => {
    // this.setState({
    //   value: evt.target.value,
    //   error: null
    // });

    setValue(evt.target.value);
    console.log(Items)
    
  };

  const  handlePaste = evt => {
    evt.preventDefault();

    var paste = evt.clipboardData.getData("text");
    var skillset = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

    if (skillset) {
      var toBeAdded = skillset.filter(email => !isInList(email));

    //   this.setState({
    //     items: [...this.state.items, ...toBeAdded]
    //   });

     // setItems(...Items, ...toBeAdded );
    setItems([
        ...Items,
        ...toBeAdded
    ])

    setSkillsSetValue([
      ...SkillsSetValue,
      ...toBeAdded
    ])
    }
  };

  function isInList(email) {
    return Items.includes(email);
  }

    const handleCityChange=(e)=>{
          console.log(e.target.value);
      Cities.map(key=>{
        if(key.name===e.target.value){
          setCityValue(key.name);
        }
      })

    }

    return (
        <div  style={{display:'flex' ,justifyContent:'center'}}>
            <Container>
            
            <h2>Let's Talk about skills & your Place:</h2>
            <br/>
                <Row>
                    <Col>
                    
                    <InputGroup>
                    <h6>Qualification : </h6>
                    <InputGroupAddon addonType="prepend"> <SchoolIcon/> </InputGroupAddon>
                         <Input onChange={(e)=>setDegreeType(e.target.value)} />
                     </InputGroup>
                    </Col>
    
                    <Col>
                    <InputGroup>
                    <Label>Address:</Label>
                    <InputGroupAddon addonType="prepend"> <HomeIcon/> </InputGroupAddon>
                         <Input onChange={(e)=> setAddressValue(e.target.value)} />
                     </InputGroup>
                    </Col>
                    </Row>
                        <br/>
                        <br/>
                    <Row>

                    <Col xs={6}>
                    <Label>Enter your Skills:  </Label>
                    
                    {Items.map(item => (
                        <div className="tag-item" key={item}>
                          {item}
                          <button
                            type="button"
                            className="button"
                            onClick={() => handleDelete(item)}
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                      <FormGroup>
                      
                      <Input
                  
                  value={Value}
                  placeholder="Enter your skills here.."
                  onKeyDown={handleKeyDown}
                  onChange={handleChange}
                  onPaste={handlePaste}
                />
               
                </FormGroup>
        
                {Error && <p className="error">{Error}</p>}
                    </Col>
                    
                
    
                        <Col>
                        <FormGroup row>
                        <Label for="exampleSelect" sm={2}>Country</Label>
                        <Col sm={10}>
                        <Input type="select" name="select" defaultValue="Please select country" onChange={handleCountryChange} id="exampleSelect">
                            <option disabled>Please select country</option>
                            {MetaData.map((key,index)=>{
                                return(
                                    <option value={key.name} >{key.name}</option>
                                )
                                
                            })}
                          </Input>
                          </Col>
                          </FormGroup>
                        </Col>
    
                        
                    </Row>
    
                    <br/>
    
                    <Row>
    
                    <Col>
    
                    <FormGroup row>
                    <Label for="exampleSelect" sm={2}>State:</Label>
                    <Col sm={10}>
                    <Input type="select" name="select" defaultValue="Please select state" onChange={handleStateChange} id="exampleSelect">
                        <option disabled>Please select state</option>
                        {States.map((key,index)=>{
                            return(
                                <option value={key.name} >{key.name}</option>
                            )
                        })}
                      </Input>
                      </Col>
                      </FormGroup>
    
                    </Col>
    
                    <Col>
    
                    <FormGroup row>
                    <Label for="exampleSelect" sm={2}>City:</Label>
                    <Col sm={10}>
                    <Input type="select" name="select" onChange={handleCityChange} defaultValue="Please select City" id="exampleSelect">
                        <option disabled>Please select City</option>
                        {Cities.map((key,index)=>{
                            return(
                                <option value={key.name} >{key.name}</option>
                            )
                        })}
                      </Input>
                      </Col>
                      </FormGroup>
    
                    </Col>
                    </Row>
                        <br/>
                  
    
            
            </Container>
        </div>
    )
}
