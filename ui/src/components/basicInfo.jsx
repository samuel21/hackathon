import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import './css/questionnaire.css';

const BasicInfoForm = ({ data, scrollTo }) => {
    const [formData, setFormData] = useState({
        ...data
    });

    const handleChange = (e) => {
        console.log('event at basic info', e.target);
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    useEffect(() => {
        setFormData(data);
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        debugger;
        Object.keys(formData).forEach(key => {
            console.log('Form Data Submitted: ', key);
            console.log('Form Data Submitted: ', formData[key]);
            data[key] = formData[key];
        });
        console.log("Data ", data);
        console.log("scrollTo ", scrollTo)
        // scrollTo.current.scrollIntoView({ behavior: 'smooth' });
        setFormData({
            ...formData,
            hideBasicInfo: !formData.hideBasicInfo,
            hideGoalsForm: !formData.hideGoalsForm
        });
        data = formData;
    };

    return (
        <Form onSubmit={handleSubmit} className='Form' hidden={data.hideBasicInfo}>
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
                <Form.Control as="select" name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} required>
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
            <button type="submit" className='Button' onClick={handleSubmit} >Save and Continue</button>
        </Form>
    );
};

export default BasicInfoForm;