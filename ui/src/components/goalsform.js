import React, { useState } from 'react';

const GoalsForm = () => {
    const [selectedGoal, setSelectedGoal] = useState('');
    const [otherGoal, setOtherGoal] = useState('');
    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState('');

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

    return (
        <div>
            <form>
                <label>
                    Your personal goals:
                    <select value={selectedGoal} onChange={handleGoalChange}>
                        <option value="">Select a goal</option>
                        <option value="health">Health</option>
                        <option value="family">Family</option>
                        <option value="hobbies">Hobbies</option>
                        <option value="other">Other</option>
                    </select>
                </label>
                {selectedGoal === 'other' && (
                    <div>
                        <label>
                            Please specify:
                            <input type="text" value={otherGoal} onChange={handleOtherGoalChange} />
                        </label>
                    </div>
                )}
                {(selectedGoal && selectedGoal !== 'other') || otherGoal ? (
                    <div>
                        <p>
                            In order to enjoy the process of attaining your {selectedGoal === 'other' ? otherGoal : selectedGoal} goals, please enter the various components or steps of the goal as follows:
                        </p>
                        <input
                            type="text"
                            value={currentStep}
                            onChange={handleStepChange}
                            onKeyPress={handleStepKeyPress}
                            placeholder="Enter a step and press Enter"
                        />
                        <ul>
                            {steps.map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ul>
                    </div>
                ) : null}
            </form>
        </div>
    );
};

export default GoalsForm;