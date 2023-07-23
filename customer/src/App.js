import React, { useState } from 'react';
import CustomerInput from './CustomerInput';
import CustomerDetails from './CustomerDetails';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const App = () => {
    const [customer, setCustomer] = useState(null);
    const [customerId, setCustomerId] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const createCustomer = () => {
        // Replace this URL with the URL of your Spring Boot application
        fetch('http://localhost:8300/haha/customer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: customerName }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to create customer');
                }
                return response.json();
            })
            .then((data) => {
                setCustomer(data);
                setCustomerName(''); // Clear the input field after successful creation
            })
            .catch((error) => console.error('Error:', error));
    };

    const getCustomer = () => {
        // Replace this URL with the URL of your Spring Boot application
        fetch(`http://localhost:8300/haha/customer?id=${customerId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.status); // Throw the HTTP status code as an error
                }
                return response.json();
            })
            .then((data) => setCustomer(data))
            .catch((error) => {
                console.error('Error:', error);
                if (error.message === '404') {
                    // If the error is 404, set the localized error message here
                    setErrorMessage('Customer not found');
                } else {
                    // Handle other error status codes here
                    setErrorMessage('An error occurred'); // Default error message
                }
                setCustomer(null);
            });
    };

    return (
        <div>
            <h1>Customer App</h1>
            <CustomerInput
                onSubmit={createCustomer}
                customerName={customerName}
                setCustomerName={setCustomerName}
            />

            <div>
                <TextField
                    type="text"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    placeholder="Enter Customer ID"
                />
                <Button onClick={getCustomer} type="submit" variant="contained" color="secondary">Search</Button>
            </div>

            {customer ? (
                <CustomerDetails customer={customer} />
            ) : (
                <p>{errorMessage}</p>
            )}
        </div>
    );
};

export default App;