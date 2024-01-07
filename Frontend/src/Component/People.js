import "./People.css";
import { Button, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from "react-redux";
import User from "./User";
import {searchUser} from "./Actions/user"
import { ToastContainer, toast } from "react-toastify";
function People() {
const dispatch=useDispatch();
    const [value, setValue] = React.useState('')
    const handleChange = (event) => setValue(event.target.value)

    const [people, setPeople] = useState([]);
    
const handleSearch=()=>{
dispatch(searchUser(value));
setValue("");
}

const {people:users,loading,error}=useSelector(state=>state.searchUser);
useEffect(()=>{
    if(users?.length>0){
    setPeople(users);
    }
    else if(users && users.length===0){ 
        toast.info("No user found",{position:"top-center",theme:"dark",autoClose:600});
    }
},[error,loading,users]);
  return (
<>
<ToastContainer/>
<div id="people">

<InputGroup    paddingY={"10px"}>
    <InputLeftElement pointerEvents='none' style={{paddingTop:"20px"}}>
      <SearchIcon />
    </InputLeftElement>
    <Input  value={value}
        onChange={handleChange}
 type='text' placeholder='search someone ..'focusBorderColor="black.100" borderWidth={"1px"}  _focusVisible={"outline:none"}  fontSize={"16px"}/>
    <Button color={"white"} colorScheme="red" marginLeft={"4px"} onClick={handleSearch} >Search</Button>
  </InputGroup>

{people && people.length > 0 && people.map((person,ind) =>{
    return (
        <User key={ind} direction={"row"} name={person.name} id={person._id} image={person.avatar.url}/>
    )
})}
  </div>
</> 
 )
}

export default People