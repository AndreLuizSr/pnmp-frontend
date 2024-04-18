import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
//import SidebarData from '../sidebars/sidebardata/SidebarData';

const BreadCrumbs = () => {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem to="/units" tag={Link} className="text-decoration-none">
          Regiões
        </BreadcrumbItem>
        <BreadcrumbItem to="/unitsStates" tag={Link} className="text-decoration-none">
          Estados
        </BreadcrumbItem>
        <BreadcrumbItem to="/unitsCity" tag={Link} className="text-decoration-none">
          Cidades
        </BreadcrumbItem>
      </Breadcrumb>
    </>
  );
};

export default BreadCrumbs;
