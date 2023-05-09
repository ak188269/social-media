import { Spinner} from '@chakra-ui/react'
import React from 'react'

function Loader({loadingMsg="Loading..."}) {
  return (
   <>
    <Spinner size={"xl"}  style={{display:"flex" ,justifyContent:"center",position:"absolute",top:'45vh' ,left:"45vw"}}/>
 <p  style={{display:"flex" ,justifyContent:"center",position:"absolute",top:'55vh' ,left:"45vw"}}>
  {loadingMsg}
 </p>
   </>
  )
}

export default Loader