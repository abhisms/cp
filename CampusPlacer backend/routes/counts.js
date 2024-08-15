// routes/counts.js
const express = require('express')
const router = express.Router()
const Student = require('../models/student')
const HOD = require('../models/hod')
const PlacementOfficer = require('../models/placement')
const Branch = require('../models/branch')
const JobCategory = require('../models/j_category')
const admin = require('../models/admin')

router.get('/counts', async (req, res) => {
  try {
    const adminCount= await admin.countDocuments()
    const studentCount = await Student.countDocuments()
    const hodCount = await HOD.countDocuments()
    const placementOfficerCount = await PlacementOfficer.countDocuments()
    const branchCount = await Branch.countDocuments()
    const jobCategoryCount = await JobCategory.countDocuments()

    res.json({
      admins:adminCount,
      students: studentCount,
      hods: hodCount,
      placementOfficers: placementOfficerCount,
      branches: branchCount,
      jobCategories: jobCategoryCount
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
