import React,{useState} from 'react';
import './update.css';

function UpdateCostumer() {

    // State variables to hold customer data
  const [customer, setCustomer] = useState({
    name: '',
    mobileNumber: '',
    password: '',
  });

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Assuming you have an API endpoint to update customer details
    try {
      const response = await fetch('http://localhost:8080/customer/updateCustomer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer),
      });

      if (response.ok) {
        // Success message or further actions
        console.log('Customer updated successfully');
      } else {
        // Handle errors
        console.error('Failed to update customer');
      }
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  return (
    <div className="updateborder">
    <div className="row">
      <div id="headerU">
    <h2>Update Customer</h2>
    </div>
    <form onSubmit={handleSubmit}>
      <label className="form-group">
        
        <input
          type="text"
          className="formcontrolU"
          placeholder="Enter Name"
          name="name"
          value={customer.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label className="form-group">
        
        <input
          type="text"
          className="formcontrolU"
          placeholder="Enter Mobile Nmber"
          name="mobileNumber"
          value={customer.mobileNumber}
          onChange={handleChange}
        />
      </label>
      <br />
      <label className="form-group">
       
        <input
          type="password"
          className="formcontrolU"
          placeholder="Enter Password "
          name="password"
          value={customer.password}
          onChange={handleChange}
        />
      </label>
      <br />
      <div id="updateicon">
      <button type="submit" className="btns">Update</button>
      </div>
    </form>
    </div>
  </div>
);
}

export default UpdateCostumer
