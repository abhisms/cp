import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
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
import { cilLockLocked } from '@coreui/icons'
import axios from 'axios'


const NewPassword = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const email = location.state?.email || ''

    const [passwordData, setPasswordData] = useState({
        email: email,
        password: '',
        confirmPassword: '',
    })

    const handleChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (passwordData.password !== passwordData.confirmPassword) {
            alert("Passwords do not match")
            return
        }

        axios.post("http://localhost:5000/api/newpassword/newpass", passwordData)
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    alert("Password changed successfully")
                    console.log("Navigating to login")
                    navigate('/login')

                } else {
                    alert(res.data.message)
                }
            })
            .catch((err) => {
                console.log(err)
                alert("An error occurred while changing the password")
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
                                        <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>New Password</h1>
                                        <p>Please enter your new password</p>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilLockLocked} />
                                            </CInputGroupText>
                                            <CFormInput type='password' name="password" placeholder="Enter new password" onChange={handleChange} autoComplete="new-password" />
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilLockLocked} />
                                            </CInputGroupText>
                                            <CFormInput type='password' name="confirmPassword" placeholder="Confirm new password" onChange={handleChange} autoComplete="new-password" />
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

export default NewPassword
