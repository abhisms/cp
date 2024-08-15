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
  const [hod, setHod] = useState({})
  let nav = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("h_name", hod.h_name)

    formData.append("h_phone", hod.h_phone)
    formData.append("h_email", hod.h_email)
    formData.append("h_password", hod.h_password)
    formData.append("h_address", hod.h_address)
    formData.append("branch_id", hod.branch_id)
    formData.append("h_photo", hod.h_photo)

    axios.post("https://cp-backend-ewpv.onrender.com/api/hod/insert", formData)
      .then((res) => {
        console.log(res)
        if (res.data.success) {
          alert("HOD added")
          nav("/hod")
        } else {
          alert(res.data.message)
        }
      })
      .catch((err) => {
        console.log(err, 22222)
      })
  }
  const [branch, setBranch] = useState([])
  useEffect(() => {
    axios.get("https://cp-backend-ewpv.onrender.com/api/branch/get")
      .then((res) => {
        setBranch(res.data.branch);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const handleChange = (e) => {
    setHod({ ...hod, [e.target.name]: e.target.value })
  }
  const handleChangeImage = (e) => {
    setHod({ ...hod, [e.target.name]: e.target.files[0] })
  }
  console.log(hod, 11111)

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
                <CFormLabel htmlFor="h_name">HOD Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="h_name"
                  name='h_name'
                  placeholder="Enter name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="h_phone">HOD Phone</CFormLabel>
                <CFormInput
                  type="text"
                  id="h_phone"
                  name='h_phone'
                  placeholder="Enter phone"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="h_email">HOD Email</CFormLabel>
                <CFormInput
                  type="email"
                  id="h_email"
                  name='h_email'
                  placeholder="Enter email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="h_password">HOD Password</CFormLabel>
                <CFormInput
                  type="password"
                  id="h_password"
                  name='h_password'
                  placeholder="Enter password"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="h_address">HOD Address</CFormLabel>
                <CFormInput
                  type="text"
                  id="h_address"
                  name='h_address'
                  placeholder="Enter address"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="branch_id">Branch</CFormLabel>
                <CFormSelect name='branch_id' id="branch_id" onChange={handleChange} >
                  <option value="">Select branch</option>
                  {branch.map((item) => {
                    return (
                      <option value={item._id}>{item.branch_name}</option>
                    )
                  })}

                </CFormSelect>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="h_photo">HOD Photo</CFormLabel>
                <CFormInput
                  type="file"
                  id="h_photo"
                  name="h_photo"
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
