import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentDashboard = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userId = localStorage.getItem('id');
        const response = await axios.get(`http://localhost:5000/api/student/GetById/${userId.replace(/['"]+/g, '')}`);

        if (response.data.success) {
          setUserName(response.data.student.s_name);
        } else {
          console.error('Failed to fetch user data:', response.data.message);
          // Handle error appropriately
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        // Handle error appropriately
      }
    };

    fetchUserName();
  }, []);

  return (
    <div style={{ 
      margin: 'auto', 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif', 
      fontSize: '16px', 
      lineHeight: '1.6', 
      textAlign: 'justify'  
    }}>
      <h2 style={{ fontSize: '24px', textAlign: 'center', marginBottom: '20px', color: 'white' }}>Welcome, {userName}!</h2>
      <p>
        Campus Placer is a modern web application designed to streamline the campus placement process.
        It provides students with easy access to job listings, application management, and career resources.
      </p>
      <p>
        Explore the available job opportunities, manage your applications, and stay updated with notifications
        regarding new job postings.
      </p>
      <p>
        If you have any questions or need assistance, please refer to the FAQs or contact our support team at
        <a href="mailto:campusplacers@gmail.com" style={{ color: 'white', textDecoration: 'underline', marginLeft: '5px', marginRight: '5px' }}>campusplacers@gmail.com</a>
        or call us at
        <a href="tel:+919902933325" style={{ color: 'white', textDecoration: 'underline', marginLeft: '5px', marginRight: '5px' }}>9902933325</a>.
        We are located in Mangalore.
      </p>
      <h3 style={{ fontSize: '20px', marginTop: '20px', marginBottom: '10px', color: 'white' }}>About Campus Placer</h3>
      <p>
        Campus Placer revolutionizes the traditional campus placement process with a user-friendly platform
        built on the MERN stack (MongoDB, Express, React, Node.js). Our platform facilitates seamless job
        application experiences for students, provides insightful data management tools for administrators,
        offers departmental insights for HODs, and enables efficient job postings for placement officers.
      </p>
      <p>
        We prioritize data security, scalability, and user experience to deliver a sustainable solution that
        meets the evolving needs of educational institutions and supports student career development.
      </p>

      {/* Process Description Section */}
      <h3 style={{ fontSize: '20px', marginTop: '20px', marginBottom: '10px', color: 'white' }}>Module Features</h3>
      <h4 style={{ color: 'white' }}>Student Module:</h4>
      <ul style={{ paddingLeft: '20px', color: 'white' }}>
        <li>Login: Allows students to authenticate themselves into the system.</li>
        <li>Manage Profile: Enables students to update their personal information, academic details, and resume.</li>
        <li>View Jobs: Provides a list of available job opportunities from various companies.</li>
        <li>Apply Jobs: Allows students to submit their applications for the desired job positions.</li>
        <li>View Job Status: Allows students to track the status of their job applications.</li>
      </ul>

      <h4 style={{ color: 'white' }}>Admin Module:</h4>
      <ul style={{ paddingLeft: '20px', color: 'white' }}>
        <li>Login: Authentication for administrators to access the system.</li>
        <li>Manage Student: Enables administrators to view students.</li>
        <li>Manage HOD (Head of Department): Allows administrators to manage faculty members responsible for different academic departments.</li>
        <li>Manage Placement: Provides functionality to add, edit, or remove details of facilitating job placements.</li>
        <li>Manage Branches: Allows administrators to manage different branches or campuses of the educational institution.</li>
        <li>Manage Job Category: Enables administrators to categorize job listings based on industry or field.</li>
      </ul>

      <h4 style={{ color: 'white' }}>HOD (Head of Department) Module:</h4>
      <ul style={{ paddingLeft: '20px', color: 'white' }}>
        <li>Login: Authentication for HODs to access the system.</li>
        <li>View Student: Allows HODs to view student profiles within their respective departments.</li>
        <li>View Job Application: Provides access to job applications submitted by students under their department.</li>
      </ul>

      <h4 style={{ color: 'white' }}>Placement Module:</h4>
      <ul style={{ paddingLeft: '20px', color: 'white' }}>
        <li>Register: Allows companies to register for placement services.</li>
        <li>Login: Authentication for registered companies to access the system.</li>
        <li>Manage Profile: Enables placement officers to update their information and job postings.</li>
        <li>Manage Job List: Provides functionality to add, edit, or remove job listings.</li>
        <li>View Application: Allows to view applications submitted by students for their job postings.</li>
        <li>Manage Job Status: Enables to update the status of job applications (e.g., shortlisted, rejected, selected).</li>
        <li>Notify Students on Job Posts: Allows companies to send notifications to students regarding new job postings.</li>
      </ul>

      <h3 style={{ fontSize: '20px', marginTop: '20px', marginBottom: '10px', color: 'white' }}>Contact Us</h3>
      <p>
        For any inquiries or assistance, please contact our support team at
        <a href="mailto:campusplacers@gmail.com" style={{ color: 'white', textDecoration: 'underline', marginLeft: '5px', marginRight: '5px' }}>campusplacers@gmail.com</a>
        or call us at
        <a href="tel:+919902933325" style={{ color: 'white', textDecoration: 'underline', marginLeft: '5px', marginRight: '5px' }}>8802943325</a>.
        Our office is located in Mangalore.
      </p>
    </div>
  );
};

export default StudentDashboard;
