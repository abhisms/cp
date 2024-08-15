import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
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
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react';
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
  cilPencil,
} from '@coreui/icons';
import { CImage } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AppHeaderDropdownHOD = () => {
  const [hod, setHod] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [photoModalVisible, setPhotoModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    h_name: '',
    h_email: '',
    h_phone: '',
    h_password: '',
    h_address: '',
    h_photo: '',
    branch_id: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [change, setChange] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUserId = localStorage.getItem('id');

    if (!loggedInUserId) {
      console.error('No user ID found in localStorage');
      return;
    }

    const fetchHodDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/hod/GetById/${loggedInUserId.replace(/"/g, '')}`);
        
        if (response.data && response.data.hod) {
          const foundHod = response.data.hod;
          setHod(foundHod);
          setFormData({
            h_name: foundHod.h_name,
            h_email: foundHod.h_email,
            h_phone: foundHod.h_phone,
            h_password: foundHod.h_password,
            h_address: foundHod.h_address,
            h_photo: foundHod.h_photo,
            branch_id: foundHod.branch_id,
          });
        } else {
          console.error('HOD details not found');
        }
      } catch (error) {
        console.error('Error fetching HOD details:', error);
      }
    };

    fetchHodDetails();
  }, [change]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleSaveChanges = () => {
    const updateHod = async () => {
      try {
        const newFormData = new FormData();
        newFormData.append('h_name', formData.h_name);
        newFormData.append('h_email', formData.h_email);
        newFormData.append('h_phone', formData.h_phone);
        newFormData.append('h_address', formData.h_address);
        newFormData.append('branch_id', formData.branch_id);

        if (newImage) {
          newFormData.append('h_photo', newImage);
        }

        const response = await axios.put(`http://localhost:5000/api/hod/update/${hod._id}`, newFormData);
        console.log(response);
        setHod(response.data.hod);
        setModalVisible(false);
        setIsEditing(false);
        setChange(false); // Trigger reload of data
       // alert('Profile updated successfully!');
      } catch (error) {
        console.error(error);
        setChange(false)
      }
    };

    updateHod();
  };
  const handlePhotoClick = () => {
    setPhotoModalVisible(true);
  };

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar
          src={`http://localhost:5000/api/upload/${formData.h_photo}`}
          alt="profile"
          style={{ borderRadius: '100%', objectFit: 'cover' }}
        />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem onClick={() => setModalVisible(true)}>
          Profile
        </CDropdownItem>
        <CModal scrollable visible={modalVisible} onClose={() => { setModalVisible(false); setIsEditing(false); }}>
          <CModalHeader>
            <CModalTitle>Your Profile Information</CModalTitle>
            <CButton color="primary" className="ms-2" onClick={handleEditClick}>
              <CIcon icon={cilPencil} />
            </CButton>
          </CModalHeader>
          <CModalBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="h_photo" style={{ marginRight: '16px' }}>Profile Photo</CFormLabel>
                {!isEditing ? (
                  <img
                    style={{ height: "50px", width: "50px", cursor: 'pointer' }}
                    alt="Profile"
                    src={`http://localhost:5000/api/upload/${formData.h_photo}`}
                    onClick={handlePhotoClick}
                  />
                ) : (
                  <CFormInput
                    type="file"
                    id="h_photo"
                    name="h_photo"
                    onChange={handleImageChange}
                    disabled={!isEditing}
                  />
                )}
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="h_name">Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="h_name"
                  name="h_name"
                  value={formData.h_name}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="h_email">Email</CFormLabel>
                <CFormInput
                  type="email"
                  id="h_email"
                  name="h_email"
                  value={formData.h_email}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="h_phone">Phone</CFormLabel>
                <CFormInput
                  type="text"
                  id="h_phone"
                  name="h_phone"
                  value={formData.h_phone}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="h_address">Address</CFormLabel>
                <CFormInput
                  type="text"
                  id="h_address"
                  name="h_address"
                  value={formData.h_address}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="branch_id">Branch</CFormLabel>
                <CFormInput
                  type="text"
                  id="branch_id"
                  name="branch_id"
                  value={formData.branch_id.branch_name}
                  readOnly
                />
              </div>
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setModalVisible(false)}>
              Close
            </CButton>
            {isEditing && (
              <CButton color="primary" onClick={handleSaveChanges}>
                Save changes
              </CButton>
            )}
          </CModalFooter>
        </CModal>
        <CModal visible={photoModalVisible} onClose={() => setPhotoModalVisible(false)} size="lg">
          <CModalHeader>
            <CModalTitle>Profile Photo</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CImage fluid src={`http://localhost:5000/api/upload/${formData.h_photo}`} alt="Profile" />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setPhotoModalVisible(false)}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
        <CDropdownDivider />
        <CDropdownItem href="#" onClick={handleLogout}>
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdownHOD;
