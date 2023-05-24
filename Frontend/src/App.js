
import {BrowserRouter as Router, Route ,Routes} from 'react-router-dom';
import Home from './Component/Home';
import Navbar from './Component/Navbar';
import Profile from './Component/Profile';
import Login from './Component/Login';
import { useDispatch, useSelector } from 'react-redux';
import Feed from './Component/Feed';
import UploadPost from './Component/UploadPost';
import { useEffect } from 'react';
import axios from 'axios';
import Post from './Component/Post';
import EditProfile from './Component/EditProfile';
import NoAccess from './Component/NoAccess';
import { baseUrl } from '.';
import People from './Component/People';
// import Chat from "./Component/Chat";
function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
    (
      async ()=>{
        try{

        dispatch({type:"LOGIN_REQUEST"});

        const config={
          withCredentials:true,
          headers:{"Content-Type":"application/json"}};
        const api=`${baseUrl}/api/v1/user/login`;
        const {data}= await axios.get(api,config);
        // console.log("data from app ",data.user);

        if(data.success)
        dispatch({type:"LOGIN_SUCCESS",payload:data.user});
        else{
          dispatch({type:"LOGIN_FAIL",payload:"Not logged in"});

        }
        }
        catch(error){

          dispatch({type:"LOGIN_FAIL",payload:"Not logged in"});
        }
      }
    )()
    
  },[dispatch])
  const user=useSelector((state)=>state.user.user);
  
  // console.log("data from app again",user);
  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={user ? <Feed/> :<Home/>}></Route>
        <Route exact path='/login' element={ <Login/>}></Route>
        <Route exact path='/profile/:id' element={<Profile/>}></Route>
        <Route exact path='/edit/profile/:id' element={user ? <EditProfile/> :<NoAccess/>}></Route>
        <Route exact path='/people' element={<People/>}></Route>
        <Route exact path='/chats' element={<h1 style={{textAlign:"center",transform:"translateY(30vh)",fontSize:"40px"}}> 🙈 <br /> Coming Soon ...</h1>}></Route>
        <Route exact path='/feed' element={<Feed/>}></Route>
        <Route exact path='/upload/post' element={user? <UploadPost/>:<NoAccess/>}></Route>
        <Route exact path='post/:id' element={<Post/>}></Route>
        <Route exact path='/*' element={<h1 style={{textAlign:"center"}}> 404 <br /> Page Not found</h1>}></Route>
        <Route exact path="/notification" element={<h1 style={{textAlign:"center",transform:"translateY(30vh)",fontSize:"40px"}}> 🙈 <br /> Coming Soon ...</h1>}/>
{/* <Route exact path="/chat" element={<Chat/>}/> */}


        </Routes>
        
    </Router>
    

    </>
  )
}

export default App