import React from 'react';

const CustomerDetails = ({ customer }) => {
    return (
        <div>
            <h2>Customer Details</h2>
            <p>Name: {customer.name}</p>
            <p>ID: {customer.id}</p>
        </div>
    );
};

export default CustomerDetails;