import { Link} from "react-router-dom"
import "./Settings.css"

import KeyIcon from "@mui/icons-material/Key";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import BlockIcon from "@mui/icons-material/Block"
import { Button } from "@chakra-ui/button"
import { useDispatch, useSelector } from "react-redux";
import { changePassword, deleteUserAccount, logout } from "./Actions/user";
import { useEffect, useState } from "react";
import ModalBox from "./ModalBox";
import { ToastContainer, toast } from "react-toastify";


function Settings({id}) {
    const dispatch=useDispatch();
    const [OpenChangePasswordDialog,setOpenChangePasswordDialog]=useState(false);
    const [OpenDeleteAccountDialog,setOpenDeleteAccountDialog]=useState(false);
const [OldPassword,setOldPassword]=useState("");
const [Password,setPassword]=useState("");
const [ConfirmPassword,setConfirmPassword]=useState("");
    // -------log out -------

   const handleLogout=() => {
   dispatch(logout())
   }



//    ---------- delete user account ----------

const handleDeleteAccount=()=>{
dispatch(deleteUserAccount())
}

// ----handle change password ----------
const {msg,loaging:pwdLoading,error:pwdError} =useSelector((state)=>state.changePassword);

const handleChangePassword=(e)=>{
   e.preventDefault();
   if(!Password || !ConfirmPassword || !OldPassword){
      if(!OldPassword)
      {

      alert("Please enter your old password");
      return;
}
      else if(!Password)
{
      alert("Please enter your new password");
     
      return;
      }
      else
   {
         alert("Please enter your confirm password");
      return;
      
      }
   }
   if(Password !== ConfirmPassword){
      alert("Please enter your confirm password");
      return;
      
   }
   dispatch(changePassword(OldPassword,ConfirmPassword))
}
useEffect(()=>{
if(!pwdError && !pwdLoading && msg){
   setOpenChangePasswordDialog(false);
   setOpenDeleteAccountDialog(false);
   toast(msg,{position:"top-left",type:"success",autoClose:600,theme:"dark"});
   setPassword("");
   setOldPassword("");
   setConfirmPassword("");
   dispatch({type:"CHANGE_PASSWORD_CLEAR"});
}
else {
   toast(pwdError,{position:"top-left",type:"error",autoClose:600,them:"dark"});
}
},[msg,pwdLoading,pwdError,dispatch])
  return (
   <>
   <ToastContainer/>
   <Link to={`/edit/profile/${id}`} className="settings-items"><EditIcon/> <span>Edit Profile</span></Link>
   <Link to={`#`} onClick={()=>setOpenChangePasswordDialog(true)} className="settings-items"><KeyIcon/> <span>Change Password</span></Link>
   <Link to={`#`} 
   className="settings-items"
   onClick={()=>setOpenDeleteAccountDialog(true)}
   ><DeleteIcon /> <span>Delete Account</span></Link>
   <Link to={`#`} 
   onClick={()=>alert("coming soon ..")} className="settings-items"><LockPersonIcon/> <span>Lock Profile</span></Link>
   <Link to={`#`} 
   onClick={()=>alert("coming soon ..")} className="settings-items"><BlockIcon/> <span>Deactivate Account</span></Link>
  <div className="settings-items" style={{justifyContent:"center",border:"none",marginTop:"10px"}} onClick={handleLogout}>
     <Button  color={"white"} colorScheme="red" >Log out</Button>
    </div>

    {/* ----------modal for deleting the account -------- */}
    <ModalBox size="sm" header={"Delete account"} body={
    <>
    <div style={{marginBottom:"20px"}}> Do you want to delete your account</div> 
    <Button color={"white"} 
     colorScheme="red" onClick={handleDeleteAccount}>Delete</Button>
    <Button color={"white"} colorScheme="green" style={{float:"right"}} onClick={()=>setOpenDeleteAccountDialog(false)}>No</Button>
    </>
} OpenDialog={OpenDeleteAccountDialog}setOpenDialog={setOpenDeleteAccountDialog}/>
<ModalBox 
size="sm" header={"Change Password"}
body={
   <form id="change-password-form" onSubmit={handleChangePassword}>

      <h5 style={{marginTop:"10px"}} >Old Password</h5>
      <input type="text" id="old-password" value={OldPassword} onChange={(e)=>setOldPassword(e.target.value)} style={{borderBottom:"1px solid black" ,width:"100%",outline:"none",padding:"5px"}}/>
      <h5 style={{marginTop:"10px"}} >New Password</h5>
      <input type="text" id="new-password" value={Password} onChange={(e)=>setPassword(e.target.value)} style={{borderBottom:"1px solid black" ,width:"100%",outline:"none",padding:"5px"}}/>
    
      <h5 
      style={{marginTop:"30px"}}>Confirm Password</h5>
      <input type="text"  id='confirm-password' vlaue={ConfirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}  
      style={{borderBottom:"1px solid black" ,width:"100%",outline:"none",padding:"5px"}}
      />
   
      <br />
      <button className='my-button' id='form-btn'>Change Password</button>
      </form>
}
OpenDialog={OpenChangePasswordDialog}setOpenDialog={setOpenChangePasswordDialog}
/>
   </>
  )
}

export default Settings