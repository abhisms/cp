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

const AppHeaderDropdownStudent = () => {
  const [student, setStudent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [photoModalVisible, setPhotoModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    s_name: '',
    s_email: '',
    s_phone: '',
    s_password: '',
    s_photo: '',
    s_resume: '',
    s_address: '',
    register_no: '',
    branch_id: '',
    hod_id: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [newResume, setNewResume] = useState(null); // New state for the new resume file
  const [change, setChange] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUserId = localStorage.getItem('id');
    console.log('Logged in user ID:', loggedInUserId);

    if (!loggedInUserId) {
      console.error('No user ID found in localStorage');
      return;
    }

    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/student/GetById/${loggedInUserId.replace(/"/g, '')}`);
        console.log('Student details response:', response);

        if (response.data && response.data.student) {
          const foundStudent = response.data.student;
          console.log('Found student:', foundStudent);
          setStudent(foundStudent);
          setFormData({
            s_name: foundStudent.s_name,
            s_email: foundStudent.s_email,
            s_phone: foundStudent.s_phone,
            s_password: foundStudent.s_password,
            s_photo: foundStudent.s_photo,
            s_resume: foundStudent.s_resume,
            s_address: foundStudent.s_address,
            register_no: foundStudent.register_no,
            branch_id: foundStudent.branch_id,
            hod_id: foundStudent.hod_id,
          });
        } else {
          console.error('Student details not found');
        }
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };

    fetchStudentDetails();
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

  const handleResumeChange = (e) => {
    setNewResume(e.target.files[0]);
  };

  const handleSaveChanges = () => {
    const updateStudent = async () => {
      try {
        const newFormData = new FormData();
        newFormData.append('s_name', formData.s_name);
        newFormData.append('s_email', formData.s_email);
        newFormData.append('s_phone', formData.s_phone);
        newFormData.append('s_address', formData.s_address);
        

        if (newImage) {
          newFormData.append('s_photo', newImage);
        }
        if (newResume) {
          newFormData.append('s_resume', newResume);
        }

        const response = await axios.put(`http://localhost:5000/api/student/update/${student._id}`, newFormData);
        console.log(response);
        setStudent(response.data.student);
        setModalVisible(false);
        setChange(false);
        setIsEditing(false);
        alert('Profile updated successfully!');

      } catch (error) {
        console.error(error);
        setChange(false);
      }
    };

    updateStudent();
  };

  const handlePhotoClick = () => {
    setPhotoModalVisible(true);
  };

  if (!student) return null;

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar
          src={`http://localhost:5000/api/upload/photo/${formData.s_photo}`}
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
                <CFormLabel htmlFor="s_photo" style={{ marginRight: '16px' }}>Profile Photo</CFormLabel>
                {!isEditing ? (
                  <img
                    style={{ height: "50px", width: "50px", cursor: 'pointer' }}
                    alt="Profile"
                    src={`http://localhost:5000/api/upload/photo/${student.s_photo}`}
                    onClick={handlePhotoClick}
                  />
                ) : (
                  <CFormInput
                    type="file"
                    id="s_photo"
                    name="s_photo"
                    onChange={handleImageChange}
                    disabled={!isEditing}
                  />
                )}
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="s_name">Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="s_name"
                  name="s_name"
                  value={formData.s_name}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="s_email">Email</CFormLabel>
                <CFormInput
                  type="email"
                  id="s_email"
                  name="s_email"
                  value={formData.s_email}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="s_phone">Phone</CFormLabel>
                <CFormInput
                  type="text"
                  id="s_phone"
                  name="s_phone"
                  value={formData.s_phone}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="s_address">Address</CFormLabel>
                <CFormInput
                  type="text"
                  id="s_address"
                  name="s_address"
                  value={formData.s_address}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="register_no">Your Register No</CFormLabel>
                <CFormInput
                  type="text"
                  id="register_no"
                  name="register_no"
                  value={formData.register_no}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="branch_id">Your Branch</CFormLabel>
                <CFormInput
                  type="text"
                  id="branch_id"
                  name="branch_id"
                  value={formData.branch_id.branch_name}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="hod_id">Your HOD</CFormLabel>
                <CFormInput
                  type="text"
                  id="hod_id"
                  name="hod_id"
                  value={formData.hod_id.h_name}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="s_resume" style={{ marginRight: '16px' }}>Your Resume</CFormLabel>
                {!isEditing ? (
                  <a href={`http://localhost:5000/api/upload/resume/${student.s_resume}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'yellow' }}>
                    {student.s_resume}
                  </a>
                ) : (
                  <CFormInput
                    type="file"
                    id="s_resume"
                    name="s_resume"
                    onChange={handleResumeChange}
                    disabled={!isEditing}
                  />
                )}
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
            <CImage fluid src={`http://localhost:5000/api/upload/photo/${student.s_photo}`} alt="Profile" />
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

export default AppHeaderDropdownStudent;
