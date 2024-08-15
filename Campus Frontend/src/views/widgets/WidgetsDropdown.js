import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { CRow, CCol, CWidgetStatsA } from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import { CFooter } from '@coreui/react'
import { useNavigate } from 'react-router-dom';


const WidgetsDropdown = ({ counts }) => {
  const widgetChartRef1 = useRef(null)
  const widgetChartRef2 = useRef(null)

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (widgetChartRef1.current) {
        setTimeout(() => {
          widgetChartRef1.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-primary')
          widgetChartRef1.current.update()
        })
      }

      if (widgetChartRef2.current) {
        setTimeout(() => {
          widgetChartRef2.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-info')
          widgetChartRef2.current.update()
        })
      }
    })
  }, [widgetChartRef1, widgetChartRef2])

  const navigate = useNavigate();
 
  return (
    <CRow className="g-4" >
      <CCol xs={12} sm={6} md={4} lg={2}>
        <CWidgetStatsA
          color='info'
          value={`${counts.admins}`}
          title="Admins"
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              onClick={() => navigate('/student')} 
            />
          }
        />
      </CCol>
      <CCol xs={12} sm={6} md={4} lg={2}>
        <CWidgetStatsA
          color="primary"
          value={`${counts.students}`}
          title="Students"
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              onClick={() => navigate('/student')} 
            />
          }
        />
      </CCol>
      <CCol xs={12} sm={6} md={4} lg={2}>
        <CWidgetStatsA
          color="success"
          value={`${counts.hods}`}
          title="HODs"
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              onClick={() => navigate('/Hod')} 
            />
          }
        />
      </CCol>
      <CCol xs={12} sm={6} md={4} lg={2}>
        <CWidgetStatsA
          color="info"
          value={`${counts.placementOfficers}`}
          title="Placement Officers"
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              onClick={() => navigate('/Placement')} 
            />
          }
        />
      </CCol>
      <CCol xs={12} sm={6} md={4} lg={2}>
        <CWidgetStatsA
          color="warning"
          value={`${counts.branches}`}
          title="Branches"
          chart={
            <CChartLine
              className="mt-3"
              style={{ height: '70px' }}
              onClick={() => navigate('/Branch')} 
            />
          }
        />
      </CCol>
      <CCol xs={12} sm={6} md={4} lg={2}>
        <CWidgetStatsA
          color="danger"
          value={`${counts.jobCategories}`}
          title="Job Categories"
          chart={
            <CChartBar
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              onClick={() => navigate('/Category')} 
            />
          }
        />
      </CCol>
    </CRow>
  )
}

WidgetsDropdown.propTypes = {
  counts: PropTypes.object.isRequired,
}

export default WidgetsDropdown
