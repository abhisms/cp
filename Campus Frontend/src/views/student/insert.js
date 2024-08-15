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
  const [student, setStudent] = useState({})
  let nav = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("s_name", student.s_name)
    formData.append("s_email", student.s_email)
    formData.append("s_phone", student.s_phone)
    formData.append("s_password", student.s_password)
    formData.append("s_address", student.s_address)
    formData.append("register_no", student.register_no)
    formData.append("branch_id", student.branch_id)
    formData.append("hod_id", student.hod_id)
    formData.append("s_photo", student.s_photo)
    formData.append("s_resume", student.s_resume)

    axios.post("http://localhost:5000/api/student/insert", formData)
      .then((res) => {
        console.log(res)
        if (res.data.success) {
          alert("student added")
          nav("/student")
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
    axios.get("http://localhost:5000/api/branch/get")
      .then((res) => {
        setBranch(res.data.branch);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const [hod, setHod] = useState([])
  useEffect(() => {
    axios.get("http://localhost:5000/api/hod/get")
      .then((res) => {
        setHod(res.data.hod);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value })
  }
  const handleChangeImage = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.files[0] })
  }

 



  console.log(student, 11111)

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
                <CFormLabel htmlFor="s_name">Student Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="s_name"
                  name='s_name'
                  placeholder="Enter name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="h_email">student Email</CFormLabel>
                <CFormInput
                  type="email"
                  id="s_email"
                  name='s_email'
                  placeholder="Enter email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="h_phone">Student Phone</CFormLabel>
                <CFormInput
                  type="text"
                  id="s_phone"
                  name='s_phone'
                  placeholder="Enter phone"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="h_password">Student Password</CFormLabel>
                <CFormInput
                  type="password"
                  id="s_password"
                  name='s_password'
                  placeholder="Enter password"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="h_address">Student Address</CFormLabel>
                <CFormInput
                  type="text"
                  id="s_address"
                  name='s_address'
                  placeholder="Enter address"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="register_no">Student RegNo</CFormLabel>
                <CFormInput
                  type="text"
                  id="register_no"
                  name='register_no'
                  placeholder="Enter RegNo"
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
                <CFormLabel htmlFor="hod_id">HOD</CFormLabel>
                <CFormSelect name='hod_id' id="hod_id" onChange={handleChange} >
                  <option value="">Select HOD</option>
                  {hod.map((item) => {
                    return (
                      <option value={item._id}>{item.h_name}</option>
                    )
                  })}
                </CFormSelect>
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="s_photo">Student Photo</CFormLabel>
                <CFormInput
                  type="file"
                  id="s_photo"
                  name="s_photo"
                  onChange={handleChangeImage}
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="s_resume">Student Resume</CFormLabel>
                <CFormInput
                  type="file"
                  id="s_resume"
                  name="s_resume"
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