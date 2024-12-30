import React from "react";
import {useNavigate,useLocation} from 'react-router-dom';
import axios from "axios";
import './Invoice.css';
function Invoice(){
    function goToHomepage(){
        navigate('/dashboard');
    }
    const navigate=useNavigate();
    const location=useLocation();
    return (
        <div className="container">
            <div className="invoice-container">
                <p><strong>Booking Confirmed.</strong></p>
                <p>Booking ID: {location.state.booking_id}</p>
                <p>Package ID: {location.state.package_id}</p>
                <p>Name: {location.state.name}</p>
                <p>Email: {location.state.email}</p>
                <p>Start Date: {location.state.startDate}</p>
                <p>End Date: {location.state.EndDate}</p>
                <p>No. of People: {location.state.people}</p>
                <p>Place: {location.state.place}</p>
                <p>Amount: {location.state.amount}</p>
                <img src={location.state.image_url} />
            </div>
            <button onClick={goToHomepage}>HomePage</button>
        </div>
    )
}
export default Invoice;