import { useState } from "react";
import { Link } from "react-router-dom";
import './Register.css';
function Register() {
    const [employeename, setEmployeename] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [password, setPassword] = useState("");

    async function save(event) {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/customer/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: employeename,
                    mobileNumber: mobileNumber,
                    password: password
                })
            });
            if (!response.ok) {
                throw new Error('Registration failed');
            }
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

                            <div id="regicon">
                                <button type="submit" >Register</button>
                            </div>

                        </div>
                    </form>

                </div>
                <div id="todown">
                    Have an account?
                    <Link to="/login" id="registernows"> SignIn</Link>

                </div>

            </div>
        </div>
    );
}

export default Register;
