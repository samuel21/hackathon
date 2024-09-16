import React, { useState } from 'react';

const BasicInfoForm = ({onChange}) => {
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        age: '',
        maritalStatus: '',
        kids: '',
        occupation: '',
        location: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Submitted: ', formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Gender:</label>
                <select name="gender" value={formData.gender} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div>
                <label>Age:</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} required />
            </div>
            <div>
                <label>Married:</label>
                <select name="married" value={formData.married} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </div>
            <div>
                <label>Kids:</label>
                <select name="kids" value={formData.kids} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </div>
            <div>
                <label>Occupation:</label>
                <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} required />
            </div>
            <div>
                <label>Location:</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} required />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default BasicInfoForm;