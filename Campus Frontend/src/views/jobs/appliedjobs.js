import React, { useEffect, useState } from 'react';
import { CCard, CCardBody, CCardHeader, CCardText, CCol, CRow, CCardImage } from '@coreui/react';
import axios from 'axios';

const AppliedJobs = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const student_id = localStorage.getItem('id').replace(/['"]+/g, '');

    useEffect(() => {
        axios.get(`http://localhost:5000/api/application/applied/${student_id}`)
            .then((res) => {
                setApplications(res.data.applications);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [student_id]);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (applications.length === 0) {
        return <h1>No applied jobs found</h1>;
    }

  


    return (
        <CRow>
            {applications.map(application => (
                <CCol xs="12" sm="6" md="4" key={application._id}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Applied Job</strong>
                        </CCardHeader>
                        <CCardBody>
                             <CCardImage orientation="top" style={{ height: "200px", width: "100%", objectFit: "cover" }} src={`http://localhost:5000/api/upload/${application.job_id.cover_photo}`} /> 
                            <CCardText><strong>Company Name:</strong> {application.job_id.company_name}</CCardText>
                            <CCardText><strong>Job Title:</strong> {application.job_id.job_title}</CCardText>
                            <CCardText><strong>Job Role:</strong> {application.job_id.job_role}</CCardText>
                            <CCardText>
                                <strong>Application Status:</strong> {' '}
                                <span style={{ color: 'green' }}>{application.ap_status}</span>
                            </CCardText>
                            <CCardText><strong>Application Date:</strong> {new Date(application.ap_date).toLocaleDateString()}</CCardText>
                        </CCardBody>
                    </CCard>
                </CCol>
            ))}
        </CRow>
    );
};

export default AppliedJobs;
