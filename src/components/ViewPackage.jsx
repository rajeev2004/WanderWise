import React,{useState,useEffect} from "react";
import {useNavigate,useLocation} from "react-router-dom";
import axios from "axios";
import './ViewPackage.css';
function ViewPackage(){
    const navigate=useNavigate();
    const location=useLocation();
    return(
        <div className="container">
            <div className="packageInfo-container">
                <div className="NameAndDest">
                    <p>Package: {location.state.packageDetails[0].name}</p>
                    <p>Destination: {location.state.packageDetails[0].place}</p>
                </div>
                <img src={location.state.packageDetails[0].image_url}/>
                <div className="otherDetail">
                    <p>No. of people allowed: {location.state.packageDetails[0].people}</p>
                    <p>Amount (Amount can change depending on the number of people): {location.state.packageDetails[0].amount}</p>
                    <p>Best Month To visit: {location.state.packageDetails[0].month}</p>
                </div>
            </div>
            <button onClick={()=>navigate('/dashboard')}>Go To Homepage</button>
        </div>
    )
}
export default ViewPackage;