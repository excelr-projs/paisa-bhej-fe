import { useState } from "react";
import { Link } from "react-router-dom";
import './Register.css';
function Register() {
    const [customerID, setCustomerId] = useState(1); // Initialize customer ID to 1
    const [employeename, setEmployeename] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [password, setPassword] = useState("");
    const [wallet, setWallet] = useState("");

    async function save(event) {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/customer/saveCustomer", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    customerID: customerID,
                    employeename: employeename,
                    mobileNumber: mobileNumber,
                    password: password,
                    wallet: wallet
                })
            });
            if (!response.ok) {
                throw new Error('Registration failed');
            }
            setCustomerId(customerID + 1); // Increment customer ID after successful registration
            alert("Employee Registration Successful");
        } catch (err) {
            alert(err.message || "An error occurred. Please try again.");
        }
    }

    return (
        <div>
            <div className="register-border ">
                <div className="cards">
                    <h1>Register</h1>
                    
                    <form onSubmit={save}>
                        <div className="first">
                            
                            <input
                                type="text"
                                className="horizontal-line"
                                placeholder="Enter Name"
                                value={employeename}
                                onChange={(event) => setEmployeename(event.target.value)}
                            />
                        </div>
                        <div >
                           
                            <input
                                type="text"
                                className="horizontal-line"
                                placeholder="Enter Mobile Number"
                                value={mobileNumber}
                                onChange={(event) => setMobileNumber(event.target.value)}
                            />
                        </div>
                        <div >
                            
                            <input
                                type="password"
                                className="horizontal-line"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                          </div>
                        <div>
                            
                            <input
                                type="number"
                                className="horizontal-line"
                                placeholder="Enter Amount"
                                value={wallet}
                                onChange={(event) => setWallet(event.target.value)}
                            />

<div id="regicon">
                            <button type="submit" >Register</button>
                            </div>
                        
                        </div>
                    </form>
                    
                </div>
                <div  id="todown">
                    Have an account?
                            <Link to ="/login"  id="registernows"> SignIn</Link>
                            
                            </div>

            </div>
        </div>
    );
}

export default Register;
