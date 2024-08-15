import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormSelect,
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';

const Tables = () => {
  const [hod, setHod] = useState([]);
  const [change, setChange] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/hod/get")
      .then((res) => {
        console.log(res);
        setHod(res.data.hod);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [change]);

  const Edit = ({ item }) => {
    const [visible, setVisible] = useState(false);
    const [newHod, setNewHod] = useState(item);

    const handleChange = (e) => {
      setNewHod({ ...newHod, [e.target.name]: e.target.value });
    };

    const handleChangeImage = (e) => {
      setNewHod({ ...newHod, [e.target.name]: e.target.files[0] })
    }
    console.log(newHod)


    const handleEdit = () => {
      setChange(true)
      const formData = new FormData()
      formData.append("h_name", newHod.h_name)
      formData.append("h_phone", newHod.h_phone)
      formData.append("h_email", newHod.h_email)
      formData.append("h_address", newHod.h_address)
      formData.append("branch_id", newHod.branch_id)
      formData.append("h_photo", newHod.h_photo)

      axios.put(`http://localhost:5000/api/hod/update/${newHod._id}`, formData)
        .then((res) => {
          if (res.data.success) {
            alert("HOD updated successfully");
            setVisible(false);
            setHod((prevHod) => prevHod.map((hod) =>
              hod._id === newHod._id ? newHod : hod
            ));
            setChange(false)
          } else {
            alert(res.data.message);
            setChange(false)
          }
        })
        .catch((err) => {
          alert(err.message);
          setChange(false)
        });
    };



    const [branch, setBranch] = useState([])
    useEffect(() => {
      axios.get("http://localhost:5000/api/branch/get")
        .then((res) => {
          setBranch(res.data.branch);
        })
        .catch((err) => {
          console.error(err);
        });
    }, [change]);

    return (
      <>
        <CButton color="primary" onClick={() => setVisible(!visible)}>
          Edit
        </CButton>
        <CModal scrollable visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader>
            <CModalTitle>Edit HOD</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="h_name">HOD Name</CFormLabel>
                <CFormInput
                  value={newHod.h_name}
                  type="text"
                  name="h_name"
                  id="h_name"
                  placeholder="Edit name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="h_email">Email</CFormLabel>
                <CFormInput
                  value={newHod.h_email}
                  type="email"
                  name="h_email"
                  id="h_email"
                  placeholder="Edit email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="h_phone">Phone</CFormLabel>
                <CFormInput
                  value={newHod.h_phone}
                  type="text"
                  name="h_phone"
                  id="h_phone"
                  placeholder="Edit phone"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="h_address">Address</CFormLabel>
                <CFormInput
                  value={newHod.h_address}
                  type="text"
                  name="h_address"
                  id="h_address"
                  placeholder="Edit address"
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
                <CFormLabel htmlFor="h_photo">Profile Photo</CFormLabel>
                <CFormInput

                  type="file"
                  name='h_photo'
                  id="h_photo"
                  placeholder="Edit photo"
                  onChange={handleChangeImage}
                  required
                />
              </div>
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton color="primary" onClick={handleEdit}>Save changes</CButton>
          </CModalFooter>
        </CModal>
      </>
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      axios.delete(`http://localhost:5000/api/hod/delete/${id}`)
        .then((res) => {
          if (res.data.success) {
            alert("Deleted successfully");
            setHod((prevHod) => prevHod.filter((hod) => hod._id !== id));
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>HOD</strong>
            <CButton color="info" onClick={() => navigate('/hod/insert')}>Add new HOD</CButton>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">SI.NO</CTableHeaderCell>
                  <CTableHeaderCell scope="col">HOD Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Branch Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {hod.map((item, index) => (
                  <CTableRow key={item._id}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{item.h_name}</CTableDataCell>
                    <CTableDataCell>{item.h_email}</CTableDataCell>
                    <CTableDataCell>{item.h_phone}</CTableDataCell>
                    <CTableDataCell>{item.h_address}</CTableDataCell>
                    <CTableDataCell>{item.branch_id.branch_name}</CTableDataCell>
                    <CTableDataCell>
                      <img
                        style={{ height: "100px", width: "100px" }}
                        alt=""
                        src={`http://localhost:5000/api/upload/${item.h_photo}`}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <Edit item={item} />
                      <CButton color="danger" onClick={() => handleDelete(item._id)}>
                        Delete
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Tables;
