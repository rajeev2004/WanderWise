import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from 'jwt-decode';
import axios from "axios";
import './Login.css'; 
function Login(){
    const backend = 'https://travel-agency-backend-atxk.onrender.com';
    const[email,setEmail]=useState('');
    const[pass,setPass]=useState('');
    const[error,setError]=useState('');
    const navigate=useNavigate();
    async function handleLogin(e){
        try{
            e.preventDefault();
            const result=await axios.post(`${backend}/api/users/login`,{email,pass});
            console.log("login successful");
            if(result.data.token){
                const decodedToken = jwtDecode(result.data.token);
                localStorage.setItem('token',result.data.token);
                localStorage.setItem('role',decodedToken.role);
                localStorage.setItem('id',decodedToken.id);
            }
            navigate('/dashboard');
        }catch(err){
            setError(err.message || 'Invalid credentials');
        }
    }
    return (
        <div className="container">
            <h2>Welcome Back...</h2>
            <div className="from-container">
            <form onSubmit={handleLogin}>
                <input type="email" 
                className="email-input"
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required/>
                <input type="password"
                className="password-input" 
                placeholder="Password"
                value={pass}
                onChange={(e)=>setPass(e.target.value)}
                required/>
                <button className="login-btn" type="submit">Login</button>
            </form>
            </div>
            <div className="error-container">
                {error && <p className="error-message">error</p>}
            </div>
            <button className="register-navigate" onClick={()=>navigate('/')}>
                new User? Register here...
            </button>
        </div>
    )
}
export default Login;