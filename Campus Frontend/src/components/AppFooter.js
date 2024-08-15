import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4 d-flex justify-content-center">
    <div>
      <a  target="_blank" rel="noopener noreferrer">
        Campus Placer
      </a>
      <span className="ms-1">&copy; 2024</span>
    </div>
  </CFooter>
  
  )
}

export default React.memo(AppFooter)
