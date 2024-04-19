import { useState } from "react";
import { useNavigate ,Link } from 'react-router-dom';
import './login.css';

function Login() {
    const [mobileNumber, setMobileNumber] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleLogin(event) {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    mobileNumber: mobileNumber, 
                    password: password,
                })
            });
            if (response.ok) {
                // Login successful, navigate to home
                navigate('/home');
            } else {
                // Login failed, extract error message from response
                const errorMessage = await response.text();
                alert(errorMessage || "An error occurred. Please try again.");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred. Please try again.");
        }
    }
    

    return (
        <div>
<<<<<<< Updated upstream
            <div >
                
                <div className="loginborder">


                     


                    <h2>Sign In</h2>
                    
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            
                            <input
                                type="text"
                                className="horizontal-lines"
=======
            <div id="login">
                <div>
                    <h2>Login</h2>
                    <hr />
                    <form onSubmit={handleLogin}>
                        <div>
                            <label>Mobile Number</label>
                            <br/>
                            <input
                                type="text" 
>>>>>>> Stashed changes
                                placeholder="Enter Mobile Number"
                                value={mobileNumber}
                                onChange={(event) => setMobileNumber(event.target.value)}
                            />
                        </div>
<<<<<<< Updated upstream

                        <div className="form-group">
                           
                            <input
                                type="password"
                                className="horizontal-lines"
=======
                        <div>
                            <label>Password</label>
                            <br/>
                            <input
                                type="password"
>>>>>>> Stashed changes
                                placeholder="Enter Password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
<<<<<<< Updated upstream
                        


                        

                        <div id="loginicon">
                        <button type="submit" className="btn">Sign In</button>
                        </div>
=======
                        <br/>
                        <button type="submit" id="loginbtn">Login</button>
>>>>>>> Stashed changes
                    </form>
                </div>
                <div id="dou" >
                    Do you have an account? 

                    
                    <Link to ="/Register"  id="registernow">  Register</Link>
                    
                        
                       
                        </div>
                
            </div>
            <div id="loginrs">
                <p>Do not have an Account ?</p>
                <Link to="/Register" id="loginrss">New Register</Link>
            </div>
        </div>
    );
}


export default Login;
