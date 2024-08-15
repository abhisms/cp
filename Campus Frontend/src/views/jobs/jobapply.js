import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
    CForm,
    CFormInput,
    CFormLabel,
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CFormSelect,
} from '@coreui/react';

const ApplyJob = () => {
    const { id } = useParams(); // Get job ID from URL
    const [job, setJob] = useState({});
    const [formData, setFormData] = useState({
        company_name: '',
        job_title: '',
        resume: null,
        YOG: '',
        CGPA: '',
        experience: '',
        s_name: '',
        s_email: '',
        s_phone: '',
        register_no: '',
        s_address: '',
        course_id: ''
    });
    const [branch, setBranch] = useState([]);
    const [error, setError] = useState(null); // State to hold error messages

    useEffect(() => {
        // Fetch job details using job ID
        axios.get(`http://localhost:5000/api/job/get/${id}`)
            .then((res) => {
                setJob(res.data.jobList);
                setFormData((prevData) => ({
                    ...prevData,
                    company_name: res.data.jobList.company_name,
                    job_title: res.data.jobList.job_title
                }));
            })
            .catch((err) => {
                console.error('Error fetching job details:', err);
                setError('Failed to fetch job details. Please try again later.');
            });

        // Fetch student details using student ID from local storage
        const student_id = localStorage.getItem('id');
        if (!student_id) {
            console.error('No user ID found in localStorage');
            setError('No user ID found. Please log in again.');
            return;
        }

        axios.get(`http://localhost:5000/api/student/GetById/${student_id.replace(/['"]+/g, '')}`)
       
            .then((res) => {
                const student = res.data.student;
                setFormData((prevData) => ({
                    ...prevData,
                    s_name: student.s_name,
                    s_email: student.s_email,
                    s_phone: student.s_phone,
                    register_no: student.register_no,
                    s_address: student.s_address
                }));
            })
            .catch((err) => {
                console.error('Error fetching student details:', err);
                setError('Failed to fetch student details. Please try again later.');
            });
    }, [id]);

    useEffect(() => {
        // Fetch branch data
        axios.get("http://localhost:5000/api/branch/get")
            .then((res) => {
                setBranch(res.data.branch);
            })
            .catch((err) => {
                console.error('Error fetching branch data:', err);
                setError('Failed to fetch branch data. Please try again later.');
            });
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, resume: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const student_id = localStorage.getItem('id').replace(/['"]+/g, ''); // Remove any extra quotes
        const data = new FormData();
        data.append('student_id',student_id);
        data.append('job_id', id);
        data.append('resume', formData.resume);
        data.append('YOG', formData.YOG);
        data.append('CGPA', formData.CGPA);
        data.append('experience', formData.experience);
        data.append('course_id', formData.course_id);

        console.log('Submit Data:', {
            student_id: localStorage.getItem('id'),
            job_id: id,
            resume: formData.resume,
            YOG: formData.YOG,
            CGPA: formData.CGPA,
            experience: formData.experience,
            course_id: formData.course_id
        });

        axios.post('http://localhost:5000/api/application/insert', data)
            .then((res) => {
                if (res.data.success) {
                    alert('Application submitted successfully');
                    window.location.href = 'http://localhost:3000/#/jobs';
                } 
                else {
                    alert(res.data.message);
                }
            })
            .catch((err) => {
                console.error('Error submitting application:', err);
                alert('Failed to submit application. Please try again later.');
            });
    };




    return (
        <CCard className="p-4">
            <CCardHeader>
                <h5>Apply for Job</h5>
            </CCardHeader>
            <CCardBody>
                <CForm onSubmit={handleSubmit} encType='multipart/form-data'>
                    <div className="mb-3">
                        <CFormLabel htmlFor="company_name">Company Name</CFormLabel>
                        <CFormInput
                            value={formData.company_name}
                            type="text"
                            name="company_name"
                            id="company_name"
                            placeholder="Company Name"
                            readOnly
                        />
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="job_title">Job Title</CFormLabel>
                        <CFormInput
                            value={formData.job_title}
                            type="text"
                            name="job_title"
                            id="job_title"
                            placeholder="Job Title"
                            readOnly
                        />
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="s_name">Your Name</CFormLabel>
                        <CFormInput
                            value={formData.s_name}
                            type="text"
                            name="s_name"
                            id="s_name"
                            placeholder="Student Name"
                            readOnly
                        />
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="s_email">Your Email</CFormLabel>
                        <CFormInput
                            value={formData.s_email}
                            type="text"
                            name="s_email"
                            id="s_email"
                            placeholder="Student Email"
                            
                        />
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="s_phone">Your Contact</CFormLabel>
                        <CFormInput
                            value={formData.s_phone}
                            type="text"
                            name="s_phone"
                            id="s_phone"
                            placeholder="Student Phone"
                            readOnly
                        />
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="register_no">Your Register Number</CFormLabel>
                        <CFormInput
                            value={formData.register_no}
                            type="text"
                            name="register_no"
                            id="register_no"
                            placeholder="Register Number"
                            readOnly
                        />
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="s_address">Your Address</CFormLabel>
                        <CFormInput
                            value={formData.s_address}
                            type="text"
                            name="s_address"
                            id="s_address"
                            placeholder="Address"
                            readOnly
                        />
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="resume">Upload Your Resume</CFormLabel>
                        <CFormInput
                            type="file"
                            name='resume'
                            id="resume"
                            placeholder="Upload Resume"
                            onChange={handleFileChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="YOG">Year of Graduation</CFormLabel>
                        <CFormInput
                           // value={formData.YOG}
                            type="text"
                            name="YOG"
                            id="YOG"
                            placeholder="Year of Graduation"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="CGPA">CGPA</CFormLabel>
                        <CFormInput
                           // value={formData.CGPA}
                            type="text"
                            name="CGPA"
                            id="CGPA"
                            placeholder="CGPA"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="experience">Year of Experience</CFormLabel>
                        <CFormInput
                            //value={formData.experience}
                            type="number"
                            name="experience"
                            id="experience"
                            placeholder="Experience"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="course_id">Branch</CFormLabel>
                        <CFormSelect name='course_id' id="course_id" onChange={handleChange}>
                            <option value="">Select branch</option>
                            {branch.map((item) => (
                                <option key={item._id} value={item._id}>{item.branch_name}</option>
                            ))}
                        </CFormSelect>
                    </div>
                    {/* Read-only student details */}
                   
                    <CButton type="submit" color="primary">Apply</CButton>
                </CForm>
            </CCardBody>
        </CCard>
    );
}

export default ApplyJob;
