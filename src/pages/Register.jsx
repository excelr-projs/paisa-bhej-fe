import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Register.css';

function Register() {
    const [employeename, setEmployeename] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleRegister(event) {
        event.preventDefault();
        try {
            const response = await fetch("https://paisa-bhej-backend.onrender.com/customer/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: employeename,
                    mobileNumber: mobileNumber,
                    email: email,
                    password: password
                })
            });
            if (!response.ok) {
                throw new Error('Registration failed');
            }
            alert("Employee Registration Successful");
            navigate('/');
        } catch (err) {
            alert(err.message || "An error occurred. Please try again.");
        }
    }

    return (
        <div className="login">
            <div >
                <div className="loginborder">
                    <h2>Register</h2>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="horizontal-lines"
                                placeholder="Enter Name"
                                value={employeename}
                                onChange={(event) => setEmployeename(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="horizontal-lines"
                                placeholder="Enter Mobile Number"
                                value={mobileNumber}
                                onChange={(event) => setMobileNumber(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="horizontal-lines"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="horizontal-lines"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div id="loginicon">
                            <button type="submit" classname="btn">Register</button>
                        </div>
                    </form>
                </div>
                <div id="dou" >
                    Do you have an account?
                    <Link to="/" id="registernow">Login</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
