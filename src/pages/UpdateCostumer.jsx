import React,{useState} from 'react'

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
      const response = await fetch('/api/updateCustomer', {
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
    <div className="container border rounded p-4">
    <div className="row">
    <h2>Update Customer</h2>
    <form onSubmit={handleSubmit}>
      <label className="form-group">
        Name:
        <input
          type="text"
          className="form-control"
          name="name"
          value={customer.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label className="form-group">
        Mobile Number:
        <input
          type="text"
          className="form-control"
          name="mobileNumber"
          value={customer.mobileNumber}
          onChange={handleChange}
        />
      </label>
      <br />
      <label className="form-group">
        Password:
        <input
          type="password"
          className="form-control"
          name="password"
          value={customer.password}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit" className="btn btn-primary mt-4">Update</button>
    </form>
    </div>
  </div>
);
}

export default UpdateCostumer
