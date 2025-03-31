import React,{useState} from 'react';
import axiosBase from '../../axiosConfig';
import classes from "./Ask.module.css"
import { Link } from 'react-router-dom';
import { IoMdArrowRoundForward } from "react-icons/io";
function Ask() {
    const[title,setTitle] = useState("");
    const [description,setDescription] = useState("")

     async function handlePost(){
        try{
            const token = localStorage.getItem("token");
            await axiosBase.post("/questions/add-question",{
                title,description
            },
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
            alert("question posted successfully")

        }catch(error){
            console.error("error posting questions",error)
            alert("failed to post the question .please try again")
            
        }
    }
  return (
    <div className={classes.post_question}>
        <h1 className={classes.instruction_title}>steps to write a good question</h1>
        
        <ul>
            <li className={classes.instruction}><IoMdArrowRoundForward />summerize your problems in a one-line-title</li>
            <li className={classes.instruction}><IoMdArrowRoundForward />describe your problem in more detail.</li>
            <li className={classes.instruction}><IoMdArrowRoundForward />Describe what you tried and what you expected to happen</li>
            <li className={classes.instruction}><IoMdArrowRoundForward />review your question and post it here</li>
        </ul>
        <h2 className={classes.post}>Post Your Question</h2>
        <div className={classes.inputs}>
        <input type="text"
         placeholder='Question Title' 
         value={title}
         onChange={(e)=>setTitle(e.target.value)} className={classes.title}/>
        <textarea name="" id="" placeholder='Question detail...'
        value={description}
        onChange={(e)=>{
            setDescription(e.target.value)
        }}></textarea>
        </div>
        <Link to={"/"}><button onClick={handlePost}className={classes.post_btn}>Post Question</button></Link>
        
    </div>
    
  )
}

export default Ask