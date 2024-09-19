import { Form } from "react-bootstrap";
import BasicInfoForm from "./basicInfo"
import GoalsForm from "./goalsform"
import ProForm from "./professionalform"
import React, {useState, useRef} from "react";

const Questionnaire = () => {
    const section1Ref = useRef(null);
    const section2Ref = useRef(null);
    const section3Ref = useRef(null);
    
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        age: '',
        maritalStatus: '',
        kids: '',
        occupation: '',
        location: '',
        hideBasicInfo: false,
        selectedGoal: '',
        otherGoal: '',
        steps: [],
        hideGoalsForm: true,
        jobTitle: '',
        companyDomain: '',
        startTime: '',
        endTime: '',
        flexible: false,
        flexibleOption: '',
        hoursPerDay: '',
        modeOfWork: '',
        hideProfData: true
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
        // You can send formData to your server here if it's the last section
    };

    return (
        <Form onSubmit={handleSubmit}>
            <BasicInfoForm data={formData} ref={section1Ref} scrollTo={section2Ref} />
            <GoalsForm data={formData} ref={section2Ref} scrollTo={section3Ref} />
            <ProForm data={formData} ref={section3Ref}/>
        </Form>
    );
};

export default Questionnaire;