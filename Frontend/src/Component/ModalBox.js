import React from 'react'
import {  Modal ,ModalBody,ModalCloseButton,ModalContent,ModalHeader, ModalOverlay,} from "@chakra-ui/react";
function ModalBox({header, body,OpenDialog,setOpenDialog,size="md"}) {
  
  return (
    <>
    <Modal isOpen={OpenDialog} size={size} onClose={()=>setOpenDialog(false)} >
    <ModalOverlay/>
    <ModalContent>
        <ModalHeader color={"white"} bgColor={"black"} display={"flex"} height={"sm"} padding={"8px"} fontSize={"lg"}>
          {header}
        </ModalHeader>
<ModalCloseButton color={"white"}/>
    
    <ModalBody>
       { body}
    </ModalBody>
    </ModalContent>
   </Modal>
    </>
  )
}

export default ModalBox;