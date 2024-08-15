import React, { useEffect,useState } from 'react'
import axios from 'axios'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const [counts, setCounts] = useState({
    students: 0,
    hods: 0,
    placementOfficers: 0,
    branches: 0,
    jobCategories: 0,
    admins:0
  })

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/counts')
        setCounts(response.data)
      } catch (error) {
        console.error('There was an error fetching the counts!', error)
      }
    }
    fetchCounts()
  }, [])

  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  return (
    <>
      <WidgetsDropdown counts={counts} />
     
    </>
  )
}

export default Dashboard
