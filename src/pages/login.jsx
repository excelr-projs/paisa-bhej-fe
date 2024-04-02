import { useState } from "react";
import { useNavigate ,Link } from 'react-router-dom';


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
                    email: mobileNumber, // Assuming the mobile number is used as email in your backend
                    password: password,
                })
            });
            const data = await response.json();
            if (data.message === "Login Success") {
                navigate('/home');
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred. Please try again.");
        }
    }

    return (
        <div>
            <div className="container border rounded p-4">
                <div className="row">
                    <h2>Login</h2>
                    <hr />
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label>Mobile Number</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Mobile Number"
                                value={mobileNumber}
                                onChange={(event) => setMobileNumber(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <br/>
                        <Link to ="/Register">New Register</Link>
                        <button type="submit" className="btn btn-primary ms-4">Login</button>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default Login;
