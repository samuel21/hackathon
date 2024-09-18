import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import './css/questionnaire.css';

const GoalsForm = ({data}) => {
    const [selectedGoal, setSelectedGoal] = useState('');
    const [otherGoal, setOtherGoal] = useState('');
    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState('');
    const [formData, setFormData] = useState({
        ...data
    });


    const handleGoalChange = (e) => {
        setSelectedGoal(e.target.value);
        if (e.target.value !== 'other') {
            setOtherGoal('');
        }
    };

    const handleOtherGoalChange = (e) => {
        setOtherGoal(e.target.value);
    };

    const handleStepChange = (e) => {
        setCurrentStep(e.target.value);
    };

    const handleStepKeyPress = (e) => {
        if (e.key === 'Enter' && currentStep.trim() !== '') {
            setSteps([...steps, currentStep.trim()]);
            setCurrentStep('');
            e.preventDefault();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        debugger;
        Object.keys(formData).forEach(key => {
            console.log('Form Data Submitted: ', key);
            console.log('Form Data Submitted: ', formData[key]);
            data[key] = formData[key];
        });
        console.log("Data ", data);
        setFormData({
            ...formData,
            hideGoalsForm: !formData.hideGoalsForm,
            hideProfData: !formData.hideProfData
        });
    };

    return (
            <Form onSubmit={handleSubmit} className='Form' hidden={data.hideGoalsForm}>
                <Form.Group controlId="formGoals" className='group'>
                    <Form.Label>Your personal goals:</Form.Label>
                    <Form.Control as="select" value={selectedGoal} onChange={handleGoalChange}>
                        <option value="">Select a goal</option>
                        <option value="health">Health</option>
                        <option value="family">Family</option>
                        <option value="hobbies">Hobbies</option>
                        <option value="other">Other</option>
                    </Form.Control>
                </Form.Group>
                {selectedGoal === 'other' && (
                    <Form.Group controlId="formOtherGoal" className='group'>
                        <Form.Label>Please specify:</Form.Label>
                        <Form.Control type="text" value={otherGoal} onChange={handleOtherGoalChange} />
                    </Form.Group>
                )}
                {(selectedGoal && selectedGoal !== 'other') || otherGoal ? (
                    <div>
                        <Form.Group controlId="formSteps" className='group'>
                            <Form.Label>In order to enjoy the process of attaining your {selectedGoal === 'other' ? otherGoal : selectedGoal} goals, please enter the various components or steps of the goal as follows:</Form.Label>
                            <Form.Control
                                type="text"
                                value={currentStep}
                                onChange={handleStepChange}
                                onKeyPress={handleStepKeyPress}
                                placeholder="Enter a step and press Enter"
                            />
                        </Form.Group>
                        <ul>
                            {steps.map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ul>
                    </div>
                ) : null}
                <button type="submit" className='Button' onClick={handleSubmit}>Save and Continue</button>
                </Form>
    );
};

export default GoalsForm;