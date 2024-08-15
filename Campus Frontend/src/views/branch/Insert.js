import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
} from '@coreui/react'
import axios from 'axios'
//import { DocsExample } from 'src/components'
import { useNavigate } from 'react-router-dom';

const FormControl = () => {
  const [branch, setbranch] = useState("")
  let nav = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:5000/api/branch/insert", { branch_name: branch })
      .then((res) => {
        console.log(res)
        if (res.data.success) {
          alert("branch added")
          nav("/branch")
        } else {
          alert(res.data.message)
        }
      })
      .catch((err) => {
        console.log(err, 22222)
      })
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Insert Form</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <div className="mb-3">
                <CFormLabel htmlFor="ctitle">Branch Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="branch_name"
                  placeholder="Enter Branch name"
                  onChange={(e) => setbranch(e.target.value)}
                  required
                />
                {/* <CFormInput
                    type="text"
                    id="b_status"
                    placeholder="Active/Inactive"
                    onChange={(e)=>setbranch(e.target.value)}
                    required
                  /> */}
              </div>
              <div className="mb-3">
                <CButton type='submit' color='primary'>submit</CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default FormControl
