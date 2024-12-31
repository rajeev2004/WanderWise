import React,{useRef} from "react";
import {useNavigate} from 'react-router-dom';
import {useInView,motion} from 'framer-motion';
import './View.css';
function View(props){
    const ref=useRef();
    const isInView=useInView(ref,{threshold:0.2});
    return (
        <motion.div 
            ref={ref}
            className="View-container"
            initial={{opacity:0,y:50}}
            animate={isInView?{opacity:1,y:0}:{opacity:0,y:50}}
            transition={{duration:1.0,type:'spring'}}
        >
            <div className="packageview-container">
                <div className="nameAndDest">
                    <p>Destination: {props.place}</p>
                </div>
                <motion.img src={props.image} alt="destination image" 
                initial={{opacity:1,scale:0.8}}
                animate={{opacity:1,scale:1.0}}
                transition={{duration:1.0}}
                />
                {props.edit && (<div className="button-container">
                    <button className="edit-btn" onClick={()=>props.edit(props.id)}>edit</button>
                    <button className="delete-btn" onClick={()=>props.delete(props.id)}>Delete</button> </div>
                )}
                <div className="button-container">
                    <button className="view-btn" onClick={()=>props.view(props.id)}>View</button>
                    <button className="book-btn" onClick={()=>props.book(props.id)}>Book</button>
                </div>
            </div>
        </motion.div>
    )
}
export default View;