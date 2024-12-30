import React,{useState} from "react";
import {useNavigate} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import axios from "axios";
import './Register.css';
function Register(){
    const backend = 'https://travel-agency-backend-atxk.onrender.com';
    const [email,setEmail]=useState('');
    const [pass,setPass]=useState('');
    const [error,setError]=useState('');
    const[username,setUsername]=useState('');
    const navigate=useNavigate();
    async function handleRegister(e){
        e.preventDefault();
        try{
            const result=await axios.post(`${backend}/api/users/register`,{username,email,pass});
            if(result.data.token){
                const decodedToken = jwtDecode(result.data.token);
                console.log("Decoded Token:", decodedToken);
                localStorage.setItem('token',result.data.token);
                localStorage.setItem('role',decodedToken.role);
                localStorage.setItem('id',decodedToken.id);
            }
            navigate('/dashboard');
        }catch(err){
            console.error(err.message || 'Something went wrong, please try again');
            setError(err.message);
        }
    }
    return (
        <div className="container">
            <div className="heading">
                <p><h2>WanderWise - Explore smartly and wisely</h2></p>
            </div>
            <div className="form-container">
                <form onSubmit={handleRegister}>
                    <div>
                        <input type="text"
                        placeholder="Username"
                        className="input-username"
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                        required/>
                    </div>
                    <div>
                        <input type="email"
                        placeholder="Email"
                        className="input-email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        required/>
                    </div>
                    <div>
                        <input type="password"
                        placeholder="Password"
                        className="password-input"
                        value={pass}
                        onChange={(e)=>setPass(e.target.value)}
                        required/>
                    </div>
                    <button type="submit" className="register-btn">Register</button>
                    <button className="login-navigate" onClick={()=>navigate('/login')}>Already a user login here...</button>
                </form>
            </div>
            <div className="error-container">
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    )
}
export default Register;