import React, { useEffect, useState } from 'react'
import { Link, Router, useNavigate } from 'react-router-dom'
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
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios'

const Login = ({ setRole }) => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/')
    }
  }, [navigate])

  const [login_details, setLogin_details] = useState({
    email: '',
    password: ''
  })


  const handleChange = (e) => {
    setLogin_details({ ...login_details, [e.target.name]: e.target.value })
  }
  console.log(login_details)

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:5000/api/all/login", login_details)
      .then((res) => {
        console.log(res)
        if (res.data.success) {
          let token = res.data.token
          let rolee = res.data.role
          let id = res.data.id
          localStorage.setItem("token", JSON.stringify(token))
          localStorage.setItem("role", JSON.stringify(rolee))
          localStorage.setItem("id", JSON.stringify(id))
          setRole(rolee)
          navigate('/')
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
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput type='email' name="email" placeholder="Enter your Email" onChange={handleChange} autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput type="password" name='password' placeholder="Enter your Password" onChange={handleChange} autoComplete="current-password" />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={handleSubmit}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0" onClick={() => navigate('/forgot-password')}>
                          Forgot password?
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

export default Login
