import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const navigate = useNavigate()
  const [register_details, setRegister_details] = useState({})

  const handleChange = (e) => {
    setRegister_details({ ...register_details, [e.target.name]: e.target.value })

  }

  console.log(register_details)

  const handleImage = (e) => {
    console.log(e.target.files[0])
    setRegister_details({ ...register_details, [e.target.name]: e.target.files[0] })

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append("name", register_details.name)
    formData.append("email", register_details.email)
    formData.append("phone", register_details.phone)
    formData.append("password", register_details.password)
    formData.append("profile", register_details.profile)

    axios.post("http://localhost:5000/api/admin/insert", formData)
      .then((res) => {
        console.log(res.data.success, 2222)
        if (res.data.success) {
          alert("Admin added")
          navigate('/login')

        } else {
          alert(res.data.message)
        }
      })
      .catch((err) => {
        console.log(err)
      })

  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm encType='multipart/form-data'>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput type='text' name='name' placeholder="Name" onChange={handleChange} autoComplete="username" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput type='email' name='email' placeholder="Email" onChange={handleChange} autoComplete="email" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput type='text' name='phone' placeholder="Phone" onChange={handleChange} autoComplete="phone" />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput type="password" name='password' placeholder="Password" onChange={handleChange} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput type='file' name='profile' onChange={handleImage} />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" onClick={handleSubmit}>Create Account</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
