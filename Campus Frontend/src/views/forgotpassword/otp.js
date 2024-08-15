import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser } from '@coreui/icons'
import axios from 'axios'

const Otp = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const email = location.state?.email || ''

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/')
        }
    }, [navigate])

    const [otp, setOtp] = useState({
        otp: '',
    })

    const handleChange = (e) => {
        setOtp({ ...otp, [e.target.name]: e.target.value })
    }

    const localotp = localStorage.getItem('otp')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (otp.otp === localotp) {
            navigate('/new-password', { state: { email: email } })
        }
        else {
            alert("Invalid OTP")
        }
    }

    return (
        <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
            <CContainer style={{ width: '50rem' }}>
                <CRow className="justify-content-center">
                    <CCol md={8}>
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm>
                                        <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Verification</h1>
                                        <p>We have sent an OTP to your email, please type the code in here</p>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput type='text' name="otp" placeholder="Enter 6 digit OTP" onChange={handleChange} autoComplete="username" />
                                        </CInputGroup>

                                        <CRow>
                                            <CCol xs={6}>
                                                <CButton color="primary" className="px-4" onClick={handleSubmit}>
                                                    Verify
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Otp
