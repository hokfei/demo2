import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const CustomerInput = ({ onSubmit, customerName, setCustomerName }) => {
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (customerName.trim().length < 1) {
            setError('Customer name must be at least one character');
            return;
        }

        onSubmit({ name: customerName });
        setError(''); // Clear the error message after successful submission
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Customer Name"
                variant="outlined"
                value={customerName}
                onChange={(e) => {
                    setCustomerName(e.target.value);
                    setError(''); // Clear the error message when user types in the input
                }}
                error={error !== ''}
                helperText={error}
            />
            <Button type="submit" variant="contained" color="primary">
                Add Customer
            </Button>
        </form>
    );
};

export default CustomerInput;
