import { useSelector } from 'react-redux';
import { Container } from 'reactstrap';
import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import Sidebar from './sidebars/vertical/Sidebar';
import HorizontalHeader from './header/HorizontalHeader';
import HorizontalSidebar from './sidebars/horizontal/HorizontalSidebar';
import { useEffect, useState } from 'react';
import axiosInstance from '../views/auth/AxiosConfig';


const FullLayout = () => {
  const [userRoles, setUserRoles] = useState([]);
  const toggleMiniSidebar = useSelector((state) => state.customizer.isMiniSidebar);
  const showMobileSidebar = useSelector((state) => state.customizer.isMobileSidebar);
  const topbarFixed = useSelector((state) => state.customizer.isTopbarFixed);
  const LayoutHorizontal = useSelector((state) => state.customizer.isLayoutHorizontal);
  const isFixedSidebar = useSelector((state) => state.customizer.isSidebarFixed);

  useEffect(() => {
    axiosInstance.get("http://localhost:3000/permission")
      .then(response => {
        const { user } = response.data;
        if (user && user.roles) {
          setUserRoles(user.roles);
        } else {
          console.error('User roles are not defined');
        }
      })
      .catch(error => {
        console.error('Erro ao buscar os dados:', error);
      });
  }, []);

  return (
    <main>
      <div className={`pageWrapper d-md-block d-lg-flex ${toggleMiniSidebar ? 'isMiniSidebar' : ''}`}>
        {/******** Sidebar **********/}
        {LayoutHorizontal ? (
          ''
        ) : (
          <aside className={`sidebarArea ${showMobileSidebar ? 'showSidebar' : ''}`}>
            <Sidebar userRoles={userRoles} />
          </aside>
        )}
        {/********Content Area**********/}

        <div className={`contentArea ${topbarFixed ? 'fixedTopbar' : ''}`}>
          {/********header**********/}
          {LayoutHorizontal ? <HorizontalHeader /> : <Header />}
          {LayoutHorizontal ? <HorizontalSidebar /> : ''}
          {/********Middle Content**********/}
          <Container fluid className="p-4 boxContainer">
            <div className={isFixedSidebar && LayoutHorizontal ? 'HsidebarFixed' : ''}>
              <Outlet />
            </div>
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
