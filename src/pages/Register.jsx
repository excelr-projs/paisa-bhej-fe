import { useState } from "react";

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
            <div className="container mt-4 ">
                <div className="card">
                    <h1>User Registration</h1>
                    <hr />
                    <form onSubmit={save}>
                        <div className="form-group">
                            <label>Employee name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Name"
                                value={employeename}
                                onChange={(event) => setEmployeename(event.target.value)}
                            />
                        </div>
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
                        <div className="form-group">
                            <label>Wallet</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter Amount"
                                value={wallet}
                                onChange={(event) => setWallet(event.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mt-4">Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
