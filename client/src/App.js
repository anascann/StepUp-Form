import React,{useState} from 'react';
import StepUp from "./Components/StepUp"
import {UserContext} from "./Components/UserContext";
import './App.css';

function App() {
  const [Name, setName]=useState(' ');
  const [Email, setEmail]=useState(' ');
  const [Password, setPassword]=useState(' ');
  const [DOB,setDOB]=useState(' ');
  const [Number, setNumber]=useState(' ');
  const [Gender, setGender]=useState(' ');
  const [Qualifications, setQualifications]=useState(' ');
  const [SkillsSet,setSkillsSet]=useState([]);
  const [Address, setAddress]=useState(' ');
  const [MainCity, setMainCity]=useState(' ');
  const [MainState, setMainState]=useState(' ');
  const [HomeCountry, setHomeCountry]=useState(' ');
  return (
    <div className="App">
    <UserContext.Provider value={{
      name:[Name,setName], email:[Email,setEmail], pass:[Password,setPassword], dob :[DOB,setDOB],
      mobno:[Number,setNumber], sex:[Gender,setGender], degree: [Qualifications, setQualifications],
      skill:[SkillsSet,setSkillsSet], address:[Address, setAddress], city:[MainCity, setMainCity],
      state:[MainState,setMainState], county:[HomeCountry,setHomeCountry]

    }}>
    <StepUp/>
    </UserContext.Provider>
    </div>
  );
}

export default App;
