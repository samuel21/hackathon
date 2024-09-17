import React, { useState } from 'react';

const ProfessionalForm = () => {
    const [isFlexible, setIsFlexible] = useState(false);
    const [flexibleOption, setFlexibleOption] = useState('');

    const handleFlexibleChange = (e) => {
        setIsFlexible(e.target.checked);
        setFlexibleOption('');
    };

    const handleFlexibleOptionChange = (e) => {
        setFlexibleOption(e.target.value);
    };

    return (
        <form>
            <div>
                <label>Title of Job:</label>
                <input type="text" name="jobTitle" />
            </div>
            <div>
                <label>Company Domain:</label>
                <select name="companyDomain">
                    <option value="health">Health</option>
                    <option value="it">IT</option>
                    <option value="services">Services</option>
                    <option value="customerCare">Customer Care</option>
                    <option value="legal">Legal</option>
                    <option value="others">Others</option>
                </select>
            </div>
            <div>
                <label>Working Hours:</label>
                <input type="time" name="startTime" disabled={isFlexible} />
                <input type="time" name="endTime" disabled={isFlexible} />
            </div>
            <div>
                <label>Flexible:</label>
                <input type="radio" name="flexible" checked={isFlexible} onChange={handleFlexibleChange} />
            </div>
            {isFlexible && (
                <div>
                    <label>Flexible Option:</label>
                    <select name="flexibleOption" value={flexibleOption} onChange={handleFlexibleOptionChange}>
                        <option value="">Select an option</option>
                        <option value="hoursPerDay">Number of hours per day</option>
                        <option value="split">Split</option>
                        <option value="helpMeDecide">Help me decide the best option for me</option>
                    </select>
                    {flexibleOption === 'hoursPerDay' && (
                        <div>
                            <label>Hours:</label>
                            <input type="number" name="hoursPerDay" />
                        </div>
                    )}
                </div>
            )}
            <div>
                <label>Mode of Work:</label>
                <select name="modeOfWork">
                    <option value="office">Office</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="remote">Remote</option>
                </select>
            </div>
        </form>
    );
};

export default ProfessionalForm;