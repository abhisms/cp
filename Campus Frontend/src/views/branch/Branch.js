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
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';

const Tables = () => {
  const [branch, setBranch] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/branch/get")
      .then((res) => {
        setBranch(res.data.branch);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const Edit = ({ item }) => {
    const [visible, setVisible] = useState(false);
    const [newBranch, setNewBranch] = useState(item);

    const handleChange = (e) => {
      setNewBranch({ ...newBranch, [e.target.name]: e.target.value });
    };

    const handleEdit = () => {
      axios.put(`http://localhost:5000/api/branch/update/${newBranch._id}`, newBranch)
        .then((res) => {
          if (res.data.success) {
            alert("Branch updated successfully");
            setVisible(false);
            setBranch((prevBranch) => prevBranch.map((branch) =>
              branch._id === newBranch._id ? newBranch : branch
            ));
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    };

    return (
      <>
        <CButton color="primary" onClick={() => setVisible(!visible)}>
          Edit
        </CButton>
        <CModal scrollable visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader>
            <CModalTitle>Edit Branch</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="branch_name">Branch Name</CFormLabel>
                <CFormInput
                  value={newBranch.branch_name}
                  type="text"
                  name='branch_name'
                  id="branch_name"
                  placeholder="Edit branch name"
                  onChange={handleChange}
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
    if (window.confirm("Are you sure you want to delete this branch?")) {
      axios.delete(`http://localhost:5000/api/branch/delete/${id}`)
        .then((res) => {
          if (res.data.success) {
            alert("Branch deleted successfully");
            setBranch((prevBranch) => prevBranch.filter((branch) => branch._id !== id));
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
            <strong>Branch</strong>
            <CButton color="info" onClick={() => navigate('/branch/insert')}>Add new branch</CButton>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">SI.NO</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Branch Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {branch.map((item, index) => (
                  <CTableRow key={item._id}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{item.branch_name}</CTableDataCell>
                    <CTableDataCell>{item.b_date}</CTableDataCell>
                    <CTableDataCell>{item.b_status}</CTableDataCell>
                    <CTableDataCell>
                      <Edit item={item} />
                      <CButton color="danger" onClick={() => handleDelete(item._id)}>Delete</CButton>
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
