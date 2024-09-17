import React, { useState } from 'react';
import { Button, Form, Col } from 'react-bootstrap';
import './css/questionnaire.css';

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
        <Form onSubmit={handleSubmit} className='Form'>
            <Form.Group controlId='formGridName' className='group'>
                <Form.Label>Name:</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formGridGender" className='group'>
                <Form.Label>Gender:</Form.Label>
                <Form.Control as="select" name="gender" value={formData.gender} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formGridAge" className='group'>
                <Form.Label>Age:</Form.Label>
                <Form.Control type="number" name="age" value={formData.age} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formGridMarried" className='group'>
                <Form.Label>Married:</Form.Label>
                <Form.Control as="select" name="married" value={formData.married} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formGridKids" className='group'>
                <Form.Label>Kids:</Form.Label>
                <Form.Control as="select" name="kids" value={formData.kids} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formGridOccupation" className='group'>
                <Form.Label>Occupation:</Form.Label>
                <Form.Control type="text" name="occupation" value={formData.occupation} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formGridLocation" className='group'>
                <Form.Label>Location:</Form.Label>
                <Form.Control type="text" name="location" value={formData.location} onChange={handleChange} required />
            </Form.Group>
            <button type="submit" className='Button'></button>
        </Form>
    );
};

export default BasicInfoForm;