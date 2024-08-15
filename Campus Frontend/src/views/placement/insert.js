import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CRow,
} from '@coreui/react'
import axios from 'axios'
//import { DocsExample } from 'src/components'
import { useNavigate } from 'react-router-dom';

const FC = () => {
  const [placement_officer, setPlacement_officer] = useState({})
  let nav = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("p_name", placement_officer.p_name)
    formData.append("p_phone", placement_officer.p_phone)
    formData.append("p_email", placement_officer.p_email)
    formData.append("p_password", placement_officer.p_password)
    formData.append("p_address", placement_officer.p_address)
    formData.append("p_photo", placement_officer.p_photo)

    axios.post("http://localhost:5000/api/placement/insert", formData)
      .then((res) => {
        console.log(res)
        if (res.data.success) {
          alert("Placement Officer added")
          nav("/placement")
        } else {
          alert(res.data.message)
        }
      })
      .catch((err) => {
        console.log(err, 22222)
      })
  }


  const handleChange = (e) => {
    setPlacement_officer({ ...placement_officer, [e.target.name]: e.target.value })
  }
  const handleChangeImage = (e) => {
    setPlacement_officer({ ...placement_officer, [e.target.name]: e.target.files[0] })
  }
  console.log(placement_officer, 11111)

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Insert Form</strong>
          </CCardHeader>
          <CCardBody>
            <CForm encType='multipart/form-data' onSubmit={handleSubmit}>
              <div className="mb-3">
                <CFormLabel htmlFor="p_name">Placement Officer Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="p_name"
                  name='p_name'
                  placeholder="Enter name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="p_phone">Placement officer Phone</CFormLabel>
                <CFormInput
                  type="text"
                  id="p_phone"
                  name='p_phone'
                  placeholder="Enter phone"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="p_email">Email</CFormLabel>
                <CFormInput
                  type="email"
                  id="p_email"
                  name='p_email'
                  placeholder="Enter email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="p_password">Password</CFormLabel>
                <CFormInput
                  type="password"
                  id="p_password"
                  name='p_password'
                  placeholder="Enter password"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="p_address">Address</CFormLabel>
                <CFormInput
                  type="text"
                  id="p_address"
                  name='p_address'
                  placeholder="Enter address"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="p_photo">Placement Officer Photo</CFormLabel>
                <CFormInput
                  type="file"
                  id="p_photo"
                  name="p_photo"
                  onChange={handleChangeImage}
                />
              </div>
              <div className="mb-3">
                <CButton type="submit" color="primary">Submit</CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default FC
