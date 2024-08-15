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
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react';
import { cilUser, cilLockLocked, cilPencil } from '@coreui/icons';
import { CImage } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AppHeaderDropdown = () => {
  const [admin, setAdmin] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [photoModalVisible, setPhotoModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    image: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [change, setChange] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUserId = localStorage.getItem('id');
    console.log('Logged in user ID:', loggedInUserId);

    if (!loggedInUserId) {
      console.error('No user ID found in localStorage');
      return;
    }

    const fetchAdminDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/admin/get/${loggedInUserId.replace(/"/g, '')}`);
        console.log('Admin details response:', response);

        if (response.data && response.data.admin) {
          const foundAdmin = response.data.admin;
          console.log('Found admin:', foundAdmin);
          setAdmin(foundAdmin);
          setFormData({
            name: foundAdmin.name,
            email: foundAdmin.email,
            phone: foundAdmin.phone,
            password: foundAdmin.password,
            image: foundAdmin.image,
          });
        } else {
          console.error('Admin details not found');
        }
      } catch (error) {
        console.error('Error fetching admin details:', error);
      }
    };

    fetchAdminDetails();
  }, [change]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const handleEditClick = () => {
    setChange(true);
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
    const updateAdmin = async () => {
      try {
        const newFormData = new FormData();
        newFormData.append('name', formData.name);
        newFormData.append('email', formData.email);
        newFormData.append('phone', formData.phone);
        newFormData.append('password', formData.password);

        if (newImage) {
          newFormData.append('image', newImage);
        }

        const response = await axios.put(`http://localhost:5000/api/admin/update/${admin._id}`, newFormData);
        console.log(response);
        setAdmin(response.data.admin);
        setModalVisible(false);
        setChange(false);
        setIsEditing(false);
        alert('Profile updated successfully!');
      } catch (error) {
        console.error(error);
        setChange(false);
      }
    };

    updateAdmin();
  };

  const handlePhotoClick = () => {
    setPhotoModalVisible(true);
  };

  if (!admin) return null;

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar
          src={`http://localhost:5000/api/upload/${formData.image}`}
          alt="profile"
          style={{ borderRadius: '100%', objectFit: 'cover' }}
        />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem onClick={() => setModalVisible(true)}>
          <CIcon icon={cilUser} className="me-2" />
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
                <CFormLabel htmlFor="image" style={{ marginRight: '16px' }}>Profile Photo</CFormLabel>
                {!isEditing ? (
                  <img
                    style={{ height: "50px", width: "50px", cursor: 'pointer' }}
                    alt="Profile"
                    src={`http://localhost:5000/api/upload/${formData.image}`}
                    onClick={handlePhotoClick}
                  />
                ) : (
                  <CFormInput
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleImageChange}
                    disabled={!isEditing}
                  />
                )}
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="name">Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="email">Email</CFormLabel>
                <CFormInput
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="phone">Phone</CFormLabel>
                <CFormInput
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              {/* <div className="mb-3">
                <CFormLabel htmlFor="password">Password</CFormLabel>
                <CFormInput
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div> */}
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
            <CImage fluid src={`http://localhost:5000/api/upload/${formData.image}`} alt="Profile" />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setPhotoModalVisible(false)}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
        <CDropdownDivider />
        <CDropdownItem href="#" onClick={handleLogout}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
