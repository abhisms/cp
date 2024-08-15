const express = require('express');
const multer = require('multer');
const {
    insertApplication,
    getApplications,
    getApplicationsById,
    checkApplicationStatus,
    getAppliedJobs,
    GetJobByObj,
    GetStudentByObj,
    GetBranchByObj,
    UpdateStatus,
} = require('../controller/applicationController');
const routes = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

routes.post('/insert', upload.single('resume'), insertApplication);
routes.get('/all', getApplications);
routes.get('/get/:id', getApplicationsById);
routes.get('/check/:student_id/:job_id', checkApplicationStatus);
routes.get('/applied/:student_id', getAppliedJobs);

routes.get('/job/get/:id', GetJobByObj);
routes.get('/student/get/:id', GetStudentByObj);
routes.get('/branch/get/:id', GetBranchByObj);
routes.put('/update/:id', UpdateStatus);

module.exports = routes;
