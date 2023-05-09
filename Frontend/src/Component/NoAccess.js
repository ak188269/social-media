import { Button } from '@chakra-ui/button'
import React from 'react'
import { Link } from 'react-router-dom'

function NoAccess() {
  return (
    <>
     <h1
        style={{textAlign:"center",transform:"translateY(30vh)",fontSize:"2.5rem"}}
        > 👎<br /> Don`t have access to this page
        <br />
      <Link to="/login"> <Button color='red'>Login</Button></Link>
        </h1>
    </>
  )
}

export default NoAccess