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
  const [jobs, setJobs] = useState({})
  let nav = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("company_name", jobs.company_name)
    formData.append("company_email", jobs.company_email)
    formData.append("job_title", jobs.job_title)
    formData.append("job_role", jobs.job_role)
    formData.append("category_id", jobs.category_id)
    formData.append("job_discription", jobs.job_discription)
    formData.append("salary", jobs.salary)
    formData.append("shifts", jobs.shifts)
    formData.append("experience", jobs.experience)
    formData.append("last_date", jobs.last_date)
    formData.append("cover_photo", jobs.cover_photo)

    axios.post("http://localhost:5000/api/job/insert", formData)
      .then((res) => {
        console.log(res)
        if (res.data.success) {
          alert("job added")
          nav("/jobs")
        } else {
          alert(res.data.message)
        }
      })
      .catch((err) => {
        console.log(err, 22222)
      })
  }
  const [category, setCategory] = useState([])
  useEffect(() => {
    axios.get("http://localhost:5000/api/category/get")
      .then((res) => {
        console.log(res)
        setCategory(res.data.category);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const handleChange = (e) => {
    setJobs({ ...jobs, [e.target.name]: e.target.value })
  }
  const handleChangeImage = (e) => {
    setJobs({ ...jobs, [e.target.name]: e.target.files[0] })
  }
  console.log(jobs, 11111)

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
                <CFormLabel htmlFor="company_name">Company Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="company_name"
                  name='company_name'
                  placeholder="Enter company name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="company_email">Company Email</CFormLabel>
                <CFormInput
                  type="text"
                  id="company_email"
                  name='company_email'
                  placeholder="Enter company email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="job_title">Job Title</CFormLabel>
                <CFormInput
                  type="text"
                  id="job_title"
                  name='job_title'
                  placeholder="Enter job title"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="job_role">Job Role</CFormLabel>
                <CFormInput
                  type="text"
                  id="job_role"
                  name='job_role'
                  placeholder="Enter job role"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="category_id">Job Category</CFormLabel>
                <CFormSelect name='category_id' id="category_id" onChange={handleChange} >
                  <option value="">Select category</option>
                  {category.map((item) => {
                    return (
                      <option value={item._id}>{item.j_category}</option>
                    )
                  })}

                </CFormSelect>
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="job_discription">Job Discription</CFormLabel>
                <CFormInput
                  type="text"
                  id="job_discription"
                  name='job_discription'
                  placeholder="Enter job discription"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="salary">Salary</CFormLabel>
                <CFormInput
                  type="text"
                  id="salary"
                  name='salary'
                  placeholder="Enter salary"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="shifts">Working Time</CFormLabel>
                <CFormInput
                  type="text"
                  id="shifts"
                  name='shifts'
                  placeholder="Enter working time (Shifts)"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="experience">Experience</CFormLabel>
                <CFormInput
                  type="number"
                  id="experience"
                  name='experience'
                  placeholder="Enter experience"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="last_date">Last Date</CFormLabel>
                <CFormInput
                  type="text"
                  id="last_date"
                  name='last_date'
                  placeholder="Enter last date to apply"
                  onChange={handleChange}
                  required
                />
              </div>


              <div className="mb-3">
                <CFormLabel htmlFor="cover_photo">Cover Photo</CFormLabel>
                <CFormInput
                  type="file"
                  id="cover_photo"
                  name="cover_photo"
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
