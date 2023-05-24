import { Link } from "react-router-dom";
import "./User.css";
import AcountCircleIcon from '@mui/icons-material/AccountCircle';

const User=({direction,id,name,image,fs=30})=>{

    return(
        <>
  <Link to={`/profile/${id}`} style={{textDecoration:"none",color:"black"}}><div id="user-details"   style={{   flexDirection :`${direction}`}}>
    {
      image ?  <img src={image} alt="avatar" style={{width:`${fs+10}px`}}/> :

        <AcountCircleIcon  style={{
            backgroundColor:"white" ,
 
            borderRadius:"60%",fontSize:`${fs}px`}}/>
    }
{name && <span id="name">{name}</span>}
</div>
</Link>

  
        </>
    )
}
export default User;

