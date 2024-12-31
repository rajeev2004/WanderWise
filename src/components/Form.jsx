import React,{useState,useEffect} from 'react'
import {useNavigate,useLocation} from 'react-router-dom'
import axios from 'axios'
import './Form.css';
function Form(){
    const backend = 'https://travel-agency-backend-atxk.onrender.com';
    const location=useLocation();
    const[email,setEmail]=useState('');
    const[startDate,setStartDate]=useState('');
    const[EndDate,setEndDate]=useState('');
    const[people,setPeople]=useState('');
    const[tripType,setTripType]=useState('');
    const[amount,setAmount]=useState(0);
    const[packageInformation,setPackageInformation]=useState({});
    const navigate=useNavigate();
    useEffect(()=>{
        async function getPackageInformation(){
            const information=await axios.get(`${backend}/api/users/packagedetail/${location.state.id}`);
            setPackageInformation(information.data[0]);
        }
        getPackageInformation();
    },[]);
    async function generateInvoice(e){
        e.preventDefault();
        try{
            const user_id=localStorage.getItem('id');
            const result=await axios.post(`${backend}/api/users/booking`,[user_id,location.state.id,email,startDate,EndDate,people,packageInformation.place,packageInformation.name,packageInformation.image_url,amount]);
            console.log(result.data);
            navigate('/invoice',{
                state:{
                    booking_id:result.data[0].id,
                    user_id:user_id,
                    package_id:location.state.id,
                    place:packageInformation.place,
                    name:packageInformation.name,
                    image_url:packageInformation.image_url,
                    amount:amount,
                    email,
                    startDate,
                    EndDate,
                    people
                    
                }
            })
        }catch(err){
            console.error(err.message);
        }
    }
    async function handleTripType(e){
        setTripType(e.target.value);
        if(tripType==='honeymoon'){
            setPeople(2);
            setAmount(packageInformation.amount*2);
        }else if(tripType==='solo Trip'){
            setPeople(1);
            setAmount(packageInformation.amount);
        }else{
            setPeople('');
        }
    }
    async function setFamilyTripPeople(e){
        setPeople(e.target.value);
        setAmount(packageInformation.amount*e.target.value);
    }
    return (
        <div className='container'>
            <div className='form-container'>
                <h2 className='booking-form'>Submit the form to Confirm your booking with us.</h2>
                <form onSubmit={generateInvoice}>
                    <div className='labelAndDate'>
                        <label htmlFor="Email">Email:</label>
                        <input type='email'
                        className='input-email'
                        placeholder='Email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        required />
                    </div>
                    <div className='labelAndDate'>
                        <label htmlFor="Start Date">Start Date:</label>
                        <input type='date'
                        className='input-Startdate'
                        placeholder='From'
                        value={startDate}
                        onChange={(e)=>setStartDate(e.target.value)}
                        required/>
                    </div>
                    <div className='labelAndDate'>
                        <label htmlFor="End Date">End Date:</label>
                        <input type='date'
                        className='input-Enddate'
                        placeholder='To'
                        value={EndDate}
                        onChange={(e)=>setEndDate(e.target.value)}
                        required/>
                    </div>
                    <div className='labelAndDate'>
                        <label htmlFor="Email">Trip Type:</label>
                        <select className='select-trip-type'
                            value={tripType}
                            onChange={handleTripType}
                            required >
                            <option value='' disabled>Select Trip Type And No. of People</option>
                            <option value='family Trip'>Family Trip</option>
                            <option value='solo Trip'>Solo Trip</option>
                            <option value='honeymoon'>Honeymoon</option>
                        </select>
                    </div>
                    {tripType==='family Trip' && (
                        <div className='labelAndDate'>
                            <label htmlFor="NO. of People">No. of People:</label>
                            <input type='number'
                            className='input-people'
                            placeholder='No. of People'
                            value={people}
                            onChange={setFamilyTripPeople}
                            required/>
                        </div>
                    )}
                    {(tripType==='solo Trip' || tripType==='honeymoon') && (
                        <div className='labelAndDate'>
                            <label htmlFor="NO. of People">No. of People:</label>
                            <input type='number'
                            className='input-people'
                            value={people}
                            readOnly/>
                        </div>
                    )}
                    <div className='labelAndDate'>
                        <label htmlFor="Total Amount">Total Amount:</label>
                        <input type='number'
                        className='total-amount'
                        value={amount}
                        readOnly/>
                    </div>
                    <button className='submit-btn' type='submit'>Confirm Booking</button>
                    <button className='cancel-btn' onClick={()=>navigate('/dashboard')}>Cancel</button>
                    <div>
                        <strong>Note: Packages can be cancelled only within a week of their booking.</strong>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Form;