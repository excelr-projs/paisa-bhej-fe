import { useState  } from "react";
import { Link } from "react-router-dom";
import './Register.css';
function Register() {
    const [customerID, setCustomerId] = useState(null);
    const [name, setName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [password, setPassword] = useState("");
    const [wallet, setWallet] = useState("");


    async function save(event) {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/customer/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    customerID: customerID,
                    name: name,
                    mobileNumber: mobileNumber,
                    password: password,
                    wallet: wallet
                })
            });

            if (!response.ok) {
                throw new Error('Failed to register. Please try again later.');
            }
              
            setCustomerId(customerID);
            console.log("sucessfull added")
            alert("Employee Registration Successful");
        } catch (err) {
            if (err instanceof TypeError && err.message === 'Failed to fetch') {
                alert("Failed to connect to the server. Please check your internet connection and try again.");
            } else {
                alert(err.message || "An error occurred. Please try again.");
            }
        }
    }

    return (
        <div>
<<<<<<< Updated upstream
            <div className="register-border ">
                <div className="cards">
                    <h1>Register</h1>
                    
                    <form onSubmit={save}>
                        <div className="first">
                            
=======
            <div className="container mt-4">
                <div className="card">
                    <h1>User Registration</h1>
                    <hr />
                    <form onSubmit={save}>
                        <div className="form-group">
                            <label>Customer name</label>
>>>>>>> Stashed changes
                            <input
                                type="text"
                                className="horizontal-line"
                                placeholder="Enter Name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
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
<<<<<<< Updated upstream
                          </div>
                        <div>
                            
=======
                        </div>
                        <div className="form-group">
                            <label>Wallet</label>
>>>>>>> Stashed changes
                            <input
                                type="number"
                                className="horizontal-line"
                                placeholder="Enter Amount"
                                value={wallet}
                                onChange={(event) => setWallet(event.target.value)}
                            />
<<<<<<< Updated upstream

<div id="regicon">
                            <button type="submit" >Register</button>
                            </div>
                        
=======
>>>>>>> Stashed changes
                        </div>
                        <div className="form-group">
                            <label>Customer ID</label>
                            <div>{customerID}</div>
                        </div>
                        <Link to="/update">Update Register</Link>
                        <button type="submit" className="btn btn-primary m-4">Save</button>
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
