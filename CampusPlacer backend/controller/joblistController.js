const joblistSchema = require('../models/joblist');
const env = require('dotenv')
env.config()


const JobInsert = async (req, res) => {
    try {

        const { company_name,company_email, job_title, job_role, category_id, job_discription, salary, shifts, experience, last_date, cover_photo } = req.body
        //console.log(req.file.filename)
        const check = await joblistSchema.find({ company_name: company_name })
        if (check.length > 0) {
            return res.json({ success: false, message: "Company already exists" })
        }
        else {
            const jobList = await joblistSchema({ company_name,company_email, job_title, job_role, category_id, job_discription, salary, shifts, experience, cover_photo, last_date, cover_photo: req.file.filename })

            await jobList.save()
            return res.json({ success: true, savedjobs: jobList })
        }
    }
    catch (err) {
        console.log("Error:" + err.message)
        res.send("Internal server error")
    }
}


const Get = async (req, res) => {
    try {
        if (req.params.id) {
            const jobList = await joblistSchema.findById(req.params.id).populate("category_id", 'j_category');
            if (!jobList) {
                return res.status(404).json({ success: false, message: 'Job not found' });
            }
            return res.json({ success: true, jobList });
        } else {
            const jobList = await joblistSchema.find().populate("category_id", 'j_category');
            res.json({ success: true, jobList });
        }
    } catch (err) {
        console.log("Error: " + err.message);
        res.status(500).send("Internal server error");
    }
};



const Delete = async (req, res) => {
    try {
        const id = req.params.id
        const check = await joblistSchema.findById(id);
        if (!check) {
            res.json({ success: false, message: "not found" })
        } else {
            const deleteData = await joblistSchema.findByIdAndDelete(id);
            return res.json({ success: true, deleteData })
        }


    } catch (err) {
        console.log("Error:" + err.message)
        res.send("Internal server error")
    }

}

const Update = async (req, res) => {
    try {
        const id = req.params.id
        const check = await joblistSchema.findById(id);
        if (!check) {
            res.json({ success: false, message: "not found" })
        } else {
            const { company_name,company_email, job_title, job_role, category_id, job_discription, salary, shifts, experience, last_date } = req.body
            const newData = {}
            //const salt = await bcryptjs.genSalt(10)
            //const secpass = await bcryptjs.hash(password, salt)
            if (company_name) { newData.company_name = company_name }
            if (company_email) { newData.company_email = company_email}
            if (job_title) { newData.job_title = job_title }
            if (job_role) { newData.job_role = job_role }
            if (category_id) { newData.category_id = category_id }
            if (job_discription) { newData.job_discription = job_discription }
            if (salary) { newData.salary = salary }
            if (shifts) { newData.shifts = shifts }
            if (experience) { newData.experience = experience }
            if (last_date) { newData.last_date = last_date }
            if (req?.file?.filename) {
                newData.cover_photo = req?.file?.filename
            }


            const UpdatedData = await joblistSchema.findByIdAndUpdate(id, { $set: newData }, { new: true });
            return res.json({ success: true, UpdatedData })
        }


    } catch (err) {
        console.log("Error:" + err.message)
        res.send("Internal server error")
    }
}

module.exports = { JobInsert, Get, Update, Delete }