import React,{useState,useEffect} from "react";
import {useNavigate,useLocation} from 'react-router-dom';
import axios from "axios";
import './EditPackage.css';
function EditPackage(){
    const backend = 'https://travel-agency-backend-atxk.onrender.com';
    const navigate=useNavigate();
    const location=useLocation();
    const id=location.state.id;
    const[details,setDetails]=useState({
        name:"",
        place:"",
        image_url:"",
        people:"",
        amount:"",
        month:""
    });
    useEffect(()=>{
        async function fetchDetails(){
            console.log(id);
            const result=await axios.get(`${backend}/api/users/packagedetail/${id}`);
            console.log(result.data);
            setDetails(result.data[0]);
        }
        fetchDetails();
    },[id])
    function handleChange(e){
        const {name,value}=e.target;
        setDetails(prev=>({
            ...prev,
            [name]:value
        }))
    }
    async function SaveChanges(){
        try{
            const result=await axios.put(`${backend}/api/users/updatepackage/${id}`,details,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            navigate('/dashboard');
        }catch(err){
            console.error(err.message);
        }
    }
    return (
        <div className="container">
            <div className="info-container">
                <h2>Edit package</h2>
                <form>
                    <div className="editDiv">
                        <label>
                            Name
                        </label>
                            <input type="text"
                            name="name"
                            value={details.name || ''}
                            onChange={handleChange}/>
                    </div>
                    <div className="editDiv">
                        <label>
                            Image
                        </label>
                            <input type="text"
                            name="image_url"
                            value={details.image_url || ''}
                            onChange={handleChange}/>
                    </div>
                    <div className="editDiv">
                        <label>
                            No. of people
                        </label>
                            <input type="number"
                            name="people"
                            value={details.people || ''}
                            onChange={handleChange}/>
                    </div>
                    <div className="editDiv">
                        <label>
                            Destination
                        </label>
                            <input type="text"
                            name="place"
                            value={details.place || ''}
                            onChange={handleChange}/>
                    </div>
                    <div className="editDiv">
                        <label>
                            Preferred Month
                        </label>
                            <input type="text"
                            name="month"
                            value={details.month || ''}
                            onChange={handleChange}/>
                    </div>
                    <div className="editDiv">
                        <label>
                            Amount
                        </label>
                            <input type="number"
                            name="amount"
                            value={details.amount || ''}
                            onChange={handleChange}/>
                    </div>
                    <button type="button" onClick={SaveChanges}>Save</button>
                    <button onClick={()=>navigate('/dashboard')}>Cancel</button>
                </form>
            </div>
        </div>
    )
}
export default EditPackage;