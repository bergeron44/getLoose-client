import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPackage } from '../../store/actions/packagesActions';
import './AddPackage.css'; // Import the CSS file

const AddPackage = () => {
    const [price, setPrice] = useState('');
    const [packagesContant, setPackagesContant] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate the form fields
        if (!price || !packagesContant) {
            alert('Please fill in all required fields.');
            return;
        }

        // Create a new package object
        const newPackage = {
            price: parseFloat(price), // Convert price to a number
            packagesContant,
        };

        // Dispatch the action to create a new package
        dispatch(createPackage(newPackage));

        // Optionally, clear the form after submission
        setPrice('');
        setPackagesContant('');
    };

    return (
        <div className="add-package-container">
            <h2>Add New Package</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="packagesContant">Package Content:</label>
                    <input
                        type="text"
                        id="packagesContant"
                        value={packagesContant}
                        onChange={(e) => setPackagesContant(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Package</button>
            </form>
        </div>
    );
};

export default AddPackage;
