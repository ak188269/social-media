const express = require('express')
const { exec,spawn } = require('child_process');
const fs = require('fs')
const app = express()
const dotenv=require("dotenv").config();
const PORT = process.env.PORT || 5500;
const path= require("path");
app.use(express.json());

app.get("/",(req,res)=>{
 
  res.send("hello user welcome to online compiler");
}
)
// --------api to run code ----------------------------------
app.post("/run",(req,res)=>{
let {language,code,input}=req.body;
// making a file of code 
const pathName=path.join(__dirname);
console.log(code);
let fileName;
let command;
let string="";
let pos;
let newCode="";
let firstPart="",secondPart="";
if(language==="python"){
  fileName="test.py";
  command="python test.py";
  string="import sys\nsys.stdin = open('input.txt', 'r')";
  newCode=string+"\n"+code;
}
else if (language==="js"){
  fileName="test.js";
  command="node test.js";
  newCode=code;
}
else if (language==="java"){
  fileName="Test.java";
  command="javac Test.java && java Test";
  if(code.indexOf("Test")==-1){
    res.send({"output":"Class name must be Test and there must be a main function"});
    return;
  }
  pos= code.indexOf("main");
  pos=code.indexOf("{", pos);
  firstPart= firstPart=code.substring(0,pos+1);
  secondPart=code.substring(pos+1);
  string= "\n try{\nInputStream is= new FileInputStream(\"input.txt\");System.setIn(is);\n}\n\
  catch(FileNotFoundException ex)\n{\
  System.out.println(\"error occured\");\n}\n";
  newCode="import java.io.*;\n"+firstPart+string+secondPart;
}
else if (language==="cpp"){
  fileName="test.cpp";
  command=`g++ test.cpp -o test && test.exe`;
  pos= code.indexOf("main");
  pos=code.indexOf("{", pos);
  firstPart= firstPart=code.substring(0,pos+1);
  secondPart=code.substring(pos+1);
   string = "\nfreopen(\"input.txt\",\"r\",stdin);";
newCode= firstPart+string+secondPart;
}
else if (language==="c"){
  fileName="test.c";
  command=`gcc test.c -o test && test.exe`;
  pos= code.indexOf("main");
  if(pos!==-1){
 firstPart=code.substring(0,pos+7);
 secondPart=code.substring(pos+7);
  }
   string = "\nfreopen(\"input.txt\",\"r\",stdin);";
newCode= firstPart+string+secondPart;
}
else {
  fileName="test.js";
  command="node test.js";
}


// console.log("pos is ",pos," first is ",firstPart,"second is ",secondPart);
 fs.writeFile(`${pathName}/${fileName}`, newCode, err => {
  // if error found 
  if (err) {
    console.error("file error is ",err)
    return
  }
  //file written successfully
  console.log("File is made successfully");
})
 fs.writeFile(`${pathName}/input.txt`, input,err => {
  // if error found 
  if (err) {
    console.error("file error is ",err)
    return
  }
  //file written successfully
  console.log("File is made successfully");
})
//  here we will be executing code 

exec(command, {maxBuffer: 1024 * 2024}, (error, stdout, stderr) => {
  
  if (stderr) {
    console.error(`stderr: ${stderr} this was error`);
    res.send({"output" :stderr.substring(10)});
    return;
  }
if (error) {
    console.error(`error is : ${error.message}`);
    res.status(501).send({"error is": error.message});
    return;
  }
  console.log(`stdout:\n${stdout}`);
  res.json({"output":stdout});
});
})
app.listen(PORT, () => {
  console.log(`your app is  listening on port ${PORT}`)
})
