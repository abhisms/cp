import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TextField,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  IconButton,
  Collapse,
  Box,
  Button,
  MenuItem,
  Select,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { CButton, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CFormSelect } from '@coreui/react';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const handleChange = (appId, status) => {
    axios.put(`http://localhost:5000/api/application/update/${appId}`, { status })
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  return (
    <React.Fragment>
      <TableRow sx={{ height: "200px", '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.job.company_name}</TableCell>
        <TableCell>{row.job_id.job_title}</TableCell>
        <TableCell>{row.student_id.s_name}</TableCell>
        <TableCell>{row.student_id.register_no}</TableCell>
        <TableCell>{row.student_id.s_email}</TableCell>
        <TableCell>
          <a
            href={`http://localhost:5000/api/upload/${row.resume}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'blue' }}
          >
            View Resume
          </a>
        </TableCell>
        <TableCell>{new Date(row.ap_date).toLocaleDateString()}</TableCell>
        <TableCell style={{ color: 'green' }}>{row.ap_status}</TableCell>
        <TableCell style={{ color: 'green' }}>
          <CFormSelect onChange={(e) => handleChange(row?._id, e?.target?.value)} aria-label="Default select example">
            <option value="">Status</option>
            <option value="approved">Approve</option>
            <option value="rejected">Reject</option>

          </CFormSelect>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                More Details
              </Typography>
              <Table size="small" aria-label="details">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: 'bold' }}>Detail</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Contact Number</TableCell>
                    <TableCell>{row.student_id.s_phone}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Location</TableCell>
                    <TableCell>{row.student_id.s_address}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>YOG</TableCell>
                    <TableCell>{row.YOG}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>CGPA</TableCell>
                    <TableCell>{row.CGPA}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Experience</TableCell>
                    <TableCell>{row.experience}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Branch</TableCell>
                    <TableCell>{row.course_id.branch_name}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [filters, setFilters] = useState({
    companyName: '',
    applicationDate: '',
    registerNumber: '',
  });
  const [companyNames, setCompanyNames] = useState([]);
  const [registerNumbers, setRegisterNumbers] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/application/all');
        const applicationsData = res.data.applications;

        const detailedApplications = await Promise.all(
          applicationsData.map(async (application) => {
            const jobId = application.job_id._id;
            const studentId = application.student_id._id;
            const courseId = application.course_id._id;

            const jobRes = await axios.get(`http://localhost:5000/api/application/job/get/${jobId}`);
            const studentRes = await axios.get(`http://localhost:5000/api/application/student/get/${studentId}`);
            const branchRes = await axios.get(`http://localhost:5000/api/application/branch/get/${courseId}`);

            return {
              ...application,
              job: jobRes.data.job,
              student: studentRes.data.student,
              branch: branchRes.data.branch,
            };
          })
        );

        setApplications(detailedApplications);
        setFilteredApplications(detailedApplications); // Initialize filtered applications with all applications
        setLoading(false);

        // Extract unique company names and register numbers
        const uniqueCompanyNames = [...new Set(detailedApplications.map(app => app.job.company_name))];
        const uniqueRegisterNumbers = [...new Set(detailedApplications.map(app => app.student_id.register_no))];
        setCompanyNames(uniqueCompanyNames);
        setRegisterNumbers(uniqueRegisterNumbers);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const applyFilters = () => {
    let filtered = [...applications];

    // Apply filters
    if (filters.companyName) {
      filtered = filtered.filter(app => app.job.company_name.toLowerCase() === filters.companyName.toLowerCase());
    }
    if (filters.applicationDate) {
      filtered = filtered.filter(app => new Date(app.ap_date).toLocaleDateString() === filters.applicationDate);
    }
    if (filters.registerNumber) {
      filtered = filtered.filter(app => app.student_id.register_no.toLowerCase() === filters.registerNumber.toLowerCase());
    }

    setFilteredApplications(filtered);
  };

  const clearFilters = () => {
    setFilters({
      companyName: '',
      applicationDate: '',
      registerNumber: '',
    });
    setFilteredApplications(applications);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <Paper >
      <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
        <Box display="flex" alignItems="center" sx={{ minWidth: '250px' }}>
          <Typography variant="subtitle2" sx={{ color: 'gray', mr: 1 }}>
            Filter by Company Name:
          </Typography>
          <Select
            label="Company Name"
            value={filters.companyName}
            onChange={handleFilterChange}
            name="companyName"
            variant="outlined"
            sx={{ minWidth: '150px', mr: 1 }}
          >
            {companyNames.map(name => (
              <MenuItem key={name} value={name}>{name}</MenuItem>
            ))}
          </Select>
        </Box>

        <Box display="flex" alignItems="center" sx={{ minWidth: '250px' }}>
          <Typography variant="subtitle2" sx={{ color: 'gray', mr: 1 }}>
            Filter by Register Number:
          </Typography>
          <Select
            label="Register Number"
            value={filters.registerNumber}
            onChange={handleFilterChange}
            name="registerNumber"
            variant="outlined"
            sx={{ minWidth: '150px', mr: 1 }}
          >
            <MenuItem value="">All Register Numbers</MenuItem>
            {registerNumbers.map(number => (
              <MenuItem key={number} value={number}>{number}</MenuItem>
            ))}
          </Select>
        </Box>

        <Box>
          <Button variant="contained" onClick={applyFilters} sx={{ mr: 1 }}>
            Apply Filters
          </Button>
          <Button variant="outlined" onClick={clearFilters}>
            Clear Filters
          </Button>
        </Box>
      </Box>


      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>
                <Typography variant="subtitle1" sx={{ color: 'var(--cui-primary)' }}>
                  Company Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" sx={{ color: 'var(--cui-primary)' }}>
                  Job Title
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" sx={{ color: 'var(--cui-primary)' }}>
                  Student Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" sx={{ color: 'var(--cui-primary)' }}>
                  Register Number
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" sx={{ color: 'var(--cui-primary)' }}>
                  Student Email
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" sx={{ color: 'var(--cui-primary)' }}>
                  Resume
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" sx={{ color: 'var(--cui-primary)' }}>
                  Application Date
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" sx={{ color: 'var(--cui-primary)' }}>
                  Status
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredApplications.map((application) => (
              <Row key={application._id} row={application} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Applications;
