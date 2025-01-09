import React,{useState,useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import View from './View';
import './Dashboard.css';
function Dashboard(){
    const backend='https://travel-agency-backend-atxk.onrender.com';
    const[Packages,setPackage]=useState([]);
    const[filteredPackages,setFilteredPackages]=useState([]);
    const[bookedpackages,setBookedpackages]=useState([]);
    const[role,setRole]=useState("");
    const[searchterm,setSearchterm]=useState("");
    const[question,setQuestion]=useState([]);
    const[answer,setAnswer]=useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
        const Role=localStorage.getItem('role');
        setRole(Role);
    },[])
    useEffect(()=>{
        async function showPackages(){
            try{
                const result=await axios.get(`${backend}/api/users/everyPackage`);
                console.log("Packages fetched");
                setPackage(result.data);
                setFilteredPackages(result.data);
            }catch(err){
                console.error(err.message);
            }
        }
        showPackages();
    },[])
    async function viewPackage(id){
        try{
            const result=await axios.get(`${backend}/api/users/packagedetail/${id}`);
            if(result.data.length==0){
                console.log("error occured");
            }else{
                navigate('/viewPackage',{
                    state:{
                        packageDetails: result.data
                    }
                })
            }
        }catch(err){
            console.error("error occured",err.message);
        }
    }
    async function bookPackage(id){
        navigate('/book',{
            state:{
                id
            }
        });
    }
    async function deletePackage(id){
        try{
            const result=await axios.delete(`${backend}/api/users/deletePackage/${id}`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(result.data.message);
            const updatedPackages=Packages.filter(packageInfo=>packageInfo.id!==id);
            setPackage(updatedPackages);
            setFilteredPackages(updatedPackages);
        }catch(err){
            console.error(err.message);
        }
    }
    async function editPackage(id){
        try{
            navigate('/editPackage',{
                state:{
                    id
                }
            })
        }catch(err){
            console.error(err.message);
        }
    }
    async function logout(){
        localStorage.removeItem('token');
        navigate('/login');
    }
    async function showBookedPackages(){
        try{
            if(role==="admin"){
                const result=await axios.get(`${backend}/api/users/getallpackages`);
                if(result.data.length>0){
                    setBookedpackages(result.data);
                    navigate('/bookedpackages',{
                        state:{
                            bookedpackage:result.data
                        }
                    })
                }else{
                    alert("no packages booked");
                }
            }else{
                const result=await axios.get(`${backend}/api/users/getuserpackage/${localStorage.getItem('id')}`);
                if(result.data.length>0){
                    setBookedpackages(result.data);
                    console.log(bookedpackages);
                    navigate('/bookedpackages',{
                        state:{
                            bookedpackage:result.data
                        }
                    })
                }else{
                    alert("no packages booked");
                }
            }
        }catch(err){
            console.error(err.message);
        }
    }
    async function handleSearch(e){
        const term=e.target.value.toLowerCase();
        setSearchterm(term);
        if(term===""){
            setFilteredPackages(Packages);
        }else{
            try{
                const result=await axios.get(`${backend}/api/users/search`,{
                    params:{term},
                })
                console.log("Filtered Packages:", result.data.data);
                setFilteredPackages(result.data.data);
            }catch(err){
                console.error(err.message)
            }
        }
    }
    async function helpAndSupport(){
        try{
            console.log("Role:",role);
            const userId=localStorage.getItem('id');
            console.log("User ID for query:",userId);
            navigate('/queries',{
                state:{
                    role:role,
                    userId:userId,
                }
            })
            
        }catch(err){
            console.error(err.message);
        }
    }
    return (
        <div className="dashboard-container">
            <header><p>Book your perfect vacation with us.</p></header>
            <div className="heading">
                <input type="text"
                placeholder="Destination"
                value={searchterm}
                onChange={handleSearch}/>
                <button className="help-btn" onClick={helpAndSupport}>Help & Support</button>
                <button className="logout-btn" onClick={logout}>Logout</button>
                <button className="showPackage-btn" onClick={showBookedPackages}>Show Booked Packages</button>
            </div>
            <div className="package-container">
                {filteredPackages.length>0?(
                    role==="user"?(
                        filteredPackages.map(packageInfo=>{
                            return (
                                <div key={packageInfo.id}>
                                    <View 
                                    id={packageInfo.id}
                                    place={packageInfo.place}
                                    image={packageInfo.image_url}
                                    view={viewPackage}
                                    book={bookPackage}/>
                                </div>
                            )
                        })
                    ):(
                        filteredPackages.map(packageInfo=>{
                            return (
                                <div key={packageInfo.id}>
                                    <View 
                                    id={packageInfo.id}
                                    place={packageInfo.place}
                                    image={packageInfo.image_url}
                                    view={viewPackage}
                                    book={bookPackage}
                                    delete={deletePackage}
                                    edit={editPackage}/>
                                </div>
                            )
                        })
                    )
                ):(
                    <p>No packages Available...</p>
                )}
            </div>
        </div>
    )
}
export default Dashboard;