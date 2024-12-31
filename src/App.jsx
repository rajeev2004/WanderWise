import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Bookedpackages from './components/BookedPackages';
import Dashboard from './components/Dashboard';
import EditPackage from './components/EditPackage';
import Login from './components/Login';
import Register from './components/Register';
import Form from './components/Form';
import Invoice from './components/Invoice';
import ViewPackage from './components/ViewPackage';
import Notfound from './components/Notfound';
function App(){
    return (
        <Router basename="/WanderWise">
            <div>
                <Routes>
                    <Route exact path="/" element={<Register />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/dashboard" element={<Dashboard />}/>
                    <Route path="/viewPackage" element={<ViewPackage />}/>
                    <Route path="/book" element={<Form />}/>
                    <Route path="/editPackage" element={<EditPackage />}/>
                    <Route path="/bookedpackages" element={<Bookedpackages />}/>
                    <Route path="/invoice" element={<Invoice />}/>
                    <Route path="*" element={<Notfound />}/>
                </Routes>
            </div>
        </Router>
    );
}
export default App;
