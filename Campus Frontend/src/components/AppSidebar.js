import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react';
import { AppSidebarNav } from './AppSidebarNav';
//import img from 'src/assets/brand/l1.png'; // Assuming this is the correct path to your image file
import navigation from '../_nav';
import navigation_hod from '../hod_nav';
import navigation_std from '../student_nav';
import navigation_placement from '../placement_nav';

const AppSidebar = ({ role }) => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible });
      }}
    >
<CSidebarHeader className="border-bottom">
  <CSidebarBrand className="d-md-down-none" style={{ textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', fontFamily: 'Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '1px', paddingLeft: '5px' }}>
    Campus Placer
  </CSidebarBrand>
  <CCloseButton
    className="d-lg-none"
    dark
    onClick={() => dispatch({ type: 'set', sidebarShow: false })}
  />
</CSidebarHeader>




      {/* Conditional rendering of sidebar navigation based on role */}
      {role === 'admin' ? (
        <AppSidebarNav items={navigation} />
      ) : role === 'hod' ? (
        <AppSidebarNav items={navigation_hod} />
      ) : role === 'placement_officer' ? (
        <AppSidebarNav items={navigation_placement} />
      ) : (
        <AppSidebarNav items={navigation_std} />
      )}

      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter>
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
