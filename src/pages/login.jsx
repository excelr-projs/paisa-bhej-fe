import { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import './login.css';

function Login() {
    const [mobileNumber, setMobileNumber] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        checkLogin();
    }, []);

    async function checkLogin() {
        const uuid = localStorage.getItem('uuid');
        const mobileNumber = localStorage.getItem('mobileNumber');
        if (uuid && mobileNumber) {
            navigate('/home');
        }
    }

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
            const data = await response.text();
            const uuidRegex = /uuid=([^,]*)/;
            const match = data.match(uuidRegex);
            if (match) {
                const uuid = match[1];
                localStorage.setItem('uuid', uuid);
                localStorage.setItem('mobileNumber', mobileNumber);
                navigate('/home');
            } else {
                alert("Login failed. Please try again.");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred. Please try again.");
        }
    }

    return (
        <div className="login">
            <div >
                <div className="loginborder">
                    <h2>Sign In</h2>
                    <form onSubmit={handleLogin}>
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
                                type="password"
                                className="horizontal-lines"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div id="loginicon">
                            <button type="submit" className="btn">Sign In</button>
                        </div>
                    </form>
                </div>
                <div id="dou" >
                    Do you have an account?
                    <Link to="/Register" id="registernow">Register</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
