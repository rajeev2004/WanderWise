import React,{useState,useEffect} from "react";
import {useLocation,useNavigate} from 'react-router-dom';
import axios from "axios";
import './BookedPackages.css';
function Bookedpackages(){
    const backend='https://travel-agency-backend-atxk.onrender.com';
    const location=useLocation();
    const navigate=useNavigate();
    const[bookedpackages,setBookedpackages]=useState([]);
    useEffect(()=>{
        setBookedpackages(location.state.bookedpackage);
    },[])
    console.log(bookedpackages);
    async function deleteBooking(package_id,start_date){
        try{
            const todayDate=new Date();
            const bookingDate=new Date(start_date);
            const time=todayDate-bookingDate;
            const day=time/(1000*3600*24);
            if(day<=7){
                const result = await axios.delete(`${backend}/api/users/deleteBookedPackage/${package_id}`,{
                    Headers:{
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                setBookedpackages(bookedpackages.filter(pkg=>pkg.package_id!==package_id));
            }else{
                alert('you can only cancel a package within 7 days of booking')
            }
        }catch(err){
            console.error(err.message);
        }
    }
    return (
        <div className="container">
            <div className="booked-packages">
                <h2>Booked packages</h2>
                {bookedpackages.map((packages,index)=>{
                    return (
                    <div className="package-details" key={packages.packages_id || index}>
                        <p>User ID: {packages.user_id}</p>
                        <p>Package ID: {packages.package_id}</p>
                        <p>NAME: {packages.name}</p>
                        <img src={packages.image_url}/>
                        <p>DESTINATION: {packages.place}</p>
                        <p>START DATE: {new Date(packages.start_date).toLocaleDateString()}</p>
                        <p>END DATE: {new Date(packages.end_date).toLocaleDateString()}</p>
                        <p>PEOPLE: {packages.people}</p>
                        <p>AMOUNT: {packages.amount}</p>
                        <button type="button" onClick={()=>deleteBooking(packages.package_id,packages.start_date)}>Cancel Booking</button>
                        <hr />
                    </div>
                    );
                })}
                <button onClick={()=>navigate('/dashboard')}>Go to Home</button>
            </div>
        </div>
    )
}
export default Bookedpackages;