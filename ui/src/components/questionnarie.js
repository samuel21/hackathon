import BasicInfoForm from "./basicInfo"
import GoalsForm from "./goalsform"
import ProfessionalForm from "./proferssionalform"
import React, {useState} from "react";

const Questionnaire = () => {
        const [formData, setFormData] = useState({
            BasicInfoFormData: '',
            GoalsFormData: '',
            ProfessionalFormData: ''
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
            console.log('Form Data Submitted:', formData);
            // You can send formData to your server here
        };

        return (
            <form onSubmit={handleSubmit}>
                <BasicInfoForm onChange={handleChange} />
                <GoalsForm onChange={handleChange} />
                <ProfessionalForm onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
        );
};

export default Questionnaire;