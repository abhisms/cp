import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

const ForgotPassword = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/')
        }
    }, [navigate])

    const [email_confirm, setEmail_confirm] = useState({
        email: '',
    })

    const handleChange = (e) => {
        setEmail_confirm({ ...email_confirm, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:5000/api/forgotpassword/forgotpass", email_confirm)
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    let otp = res.data.otp
                    localStorage.setItem("otp", JSON.stringify(otp))
                    navigate('/otp', { state: { email: email_confirm.email } })
                }
                else {
                    alert(res.data.message)
                }
            })
            .catch((err) => {
                console.log(err)
            })
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
                                        <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Forgot Password?</h1>
                                        <p>Please enter your email address to receive a new OTP</p>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput type='email' name="email" placeholder="Enter your Email" onChange={handleChange} autoComplete="username" />
                                        </CInputGroup>

                                        <CRow>
                                            <CCol xs={6}>
                                                <CButton color="primary" className="px-4" onClick={handleSubmit}>
                                                    Submit
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

export default ForgotPassword
