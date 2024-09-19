import React, { useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import './css/questionnaire.css';

const ProForm = ({data}) => {
    const [isFlexible, setIsFlexible] = useState(false);
    const [flexibleOption, setFlexibleOption] = useState('');
    const [formData, setFormData] = useState({
        jobTitle: '',
        companyDomain: '',
        startTime: '',
        endTime: '',
        flexible: false,
        flexibleOption: '',
        hoursPerDay: '',
        modeOfWork: ''
    });

    const handleFlexibleChange = (e) => {
        setIsFlexible(e.target.checked);
        setFlexibleOption('');
    };

    const handleFlexibleOptionChange = (e) => {
        setFlexibleOption(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        debugger;
        console.log('Form Data Submitted: ', formData);
    };

    const handleChange = (e) => {
        console.log('event 3', e.target);
        const { name, value } = e.target;
            setFormData({
                ...formData,
                [name]: value
            });
        };

    return (
            <Form onSubmit={handleSubmit} className='Form' hidden={data.hideProfData}>
                <Form.Group controlId="formJobTitle" className='group'>
                    <Form.Label>Title of Job:</Form.Label>
                    <Form.Control type="text" name="jobTitle" onChange={handleChange}/>
                </Form.Group>
                <Form.Group controlId="formCompanyDomain" className='group'>
                    <Form.Label>Company Domain:</Form.Label>
                    <Form.Control as="select" name="companyDomain" onChange={handleChange}>
                        <option value="select">Select</option>
                        <option value="health">Health</option>
                        <option value="it">IT</option>
                        <option value="services">Services</option>
                        <option value="customerCare">Customer Care</option>
                        <option value="legal">Legal</option>
                        <option value="others">Others</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formWorkingHours" className='group'>
                    <Form.Label>Working Hours:</Form.Label>
                        <Col style={{paddingRight: '10px'}}>
                            <Form.Control type="time" name="startTime" disabled={isFlexible} onChange={handleChange} />
                        </Col>
                        <Col>
                            <Form.Control type="time" name="endTime" disabled={isFlexible} onChange={handleChange} />
                        </Col>
                </Form.Group>
                <Form.Group controlId="formFlexible" className='group'>
                    <Form.Check 
                        type="checkbox" 
                        label="Flexible" 
                        name="flexible" 
                        checked={isFlexible} 
                        onChange={handleFlexibleChange} 
                    />
                </Form.Group>
                {isFlexible && (
                    <Form.Group controlId="formFlexibleOption" className='group'>
                        <Form.Label>Flexible Option:</Form.Label>
                        <Form.Control as="select" name="flexibleOption" value={flexibleOption} onChange={handleFlexibleOptionChange}>
                            <option value="">Select</option>
                            <option value="hoursPerDay">Number of hours per day</option>
                            <option value="split">Split</option>
                            <option value="helpMeDecide">Help me decide the best option for me</option>
                        </Form.Control>
                        {flexibleOption === 'hoursPerDay' && (
                            <Form.Group controlId="formHoursPerDay" className='group'>
                                <Form.Label>Hours:</Form.Label>
                                <Form.Control type="number" name="hoursPerDay" />
                            </Form.Group>
                        )}
                    </Form.Group>
                )}
                <Form.Group controlId="formModeOfWork" className='group'>
                    <Form.Label>Mode of Work:</Form.Label>
                    <Form.Control as="select" name="modeOfWork" onChange={handleChange} >
                            <option value="">Select</option>
                            <option value="office">Office</option>
                        <option value="hybrid">Hybrid</option>
                        <option value="remote">Remote</option>
                    </Form.Control>
                </Form.Group>
                <button type="submit" className='Button'>Submit</button>
                </Form>
                
                
                
               
            
    );
};

export default ProForm;