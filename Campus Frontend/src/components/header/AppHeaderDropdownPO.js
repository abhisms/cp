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

const AppHeaderDropdownPO = () => {
  const [placement_officer, setPlacementOfficer] = useState(null);
  const [photoModalVisible, setPhotoModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    p_name: '',
    p_email: '',
    p_phone: '',
    p_password: '',
    p_photo: '',
    p_address: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [change, setChange] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUserId = localStorage.getItem('id');
    console.log()

    if (!loggedInUserId) {
      console.error('No user ID found in localStorage');
      return;
    }

    const fetchPlacementOfficerDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/placement/GetById/${loggedInUserId.replace(/"/g, '')}`);
        
        if (response.data && response.data.placement_officer) {
          const foundPlacementOfficer = response.data.placement_officer;
          setPlacementOfficer(foundPlacementOfficer);
          setFormData({
            p_name: foundPlacementOfficer.p_name,
            p_email: foundPlacementOfficer.p_email,
            p_phone: foundPlacementOfficer.p_phone,
            p_password: foundPlacementOfficer.p_password,
            p_photo: foundPlacementOfficer.p_photo,
            p_address: foundPlacementOfficer.p_address,
          });
        } else {
          console.error('Placement officer details not found');
        }
      } catch (error) {
        console.error('Error fetching placement officer details:', error);
      }
    };

    fetchPlacementOfficerDetails();
  }, [change]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const handlePhotoClick = () => {
    setPhotoModalVisible(true);
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
    const updatePlacementOfficer = async () => {
      try {
        const newFormData = new FormData();
        newFormData.append('p_name', formData.p_name);
        newFormData.append('p_email', formData.p_email);
        newFormData.append('p_phone', formData.p_phone);
        newFormData.append('p_address', formData.p_address);

        if (newImage) {
          newFormData.append('p_photo', newImage);
        }

        const response = await axios.put(`http://localhost:5000/api/placement/update/${placement_officer._id}`, newFormData);
       console.log(response)
        setPlacementOfficer(response.data.placement_officer);
        setModalVisible(false);
        setIsEditing(false);
        setChange(!change); // Trigger reload of data
        alert('Profile updated successfully!');
      } catch (error) {
        console.error(error);
      }
    };

    updatePlacementOfficer();
  };

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar
          src={`http://localhost:5000/api/upload/${formData.p_photo}`}
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
                <CFormLabel htmlFor="p_photo" style={{ marginRight: '16px' }}>Profile Photo</CFormLabel>
                {!isEditing ? (
                  <img
                    style={{ height: "50px", width: "50px", cursor: 'pointer' }}
                    alt="Profile"
                    src={`http://localhost:5000/api/upload/${formData.p_photo}`}
                    onClick={handlePhotoClick}
                  />
                ) : (
                  <CFormInput
                    type="file"
                    id="p_photo"
                    name="p_photo"
                    onChange={handleImageChange}
                    disabled={!isEditing}
                  />
                )}
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="p_name">Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="p_name"
                  name="p_name"
                  value={formData.p_name}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="p_email">Email</CFormLabel>
                <CFormInput
                  type="email"
                  id="p_email"
                  name="p_email"
                  value={formData.p_email}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="p_phone">Phone</CFormLabel>
                <CFormInput
                  type="text"
                  id="p_phone"
                  name="p_phone"
                  value={formData.p_phone}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="p_address">Address</CFormLabel>
                <CFormInput
                  type="text"
                  id="p_address"
                  name="p_address"
                  value={formData.p_address}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
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
            <CImage fluid src={`http://localhost:5000/api/upload/${formData.p_photo}`} alt="Profile" />
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

export default AppHeaderDropdownPO;
