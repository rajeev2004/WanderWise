import React,{useState} from 'react'
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
    const navigate=useNavigate();
    async function generateInvoice(e){
        e.preventDefault();
        try{
            const user_id=localStorage.getItem('id');
            const information=await axios.get(`${backend}/api/users/packagedetail/${location.state.id}`);
            console.log(information.data);
            const result=await axios.post(`${backend}/api/users/booking`,[user_id,location.state.id,email,startDate,EndDate,people,information.data[0].place,information.data[0].name,information.data[0].image_url,information.data[0].amount]);
            console.log(result.data);
            navigate('/invoice',{
                state:{
                    booking_id:result.data[0].id,
                    user_id:user_id,
                    package_id:location.state.id,
                    place:information.data[0].place,
                    name:information.data[0].name,
                    image_url:information.data[0].image_url,
                    amount:information.data[0].amount,
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
                        <label htmlFor="NO. of People">No. of People:</label>
                        <input type='number'
                        className='input-people'
                        placeholder='No. of People'
                        value={people}
                        onChange={(e)=>setPeople(e.target.value)}
                        required/>
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