import { useState, useEffect } from 'react';
import { Row, Col, Table, Card, CardTitle, CardBody, Button } from 'reactstrap';
import axiosInstance from '../auth/AxiosConfig';
import { NavLink } from 'react-router-dom';
import * as Icon from "react-feather";

const Permission = () => {
  const [permissions, setPermissions] = useState([]);
  const [canView, setCanView] = useState(false);
  const [canAdd, setCanAdd] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = () => {
    axiosInstance.get("http://localhost:3000/permission")
      .then(response => {
        const { permissions, user } = response.data;
        setPermissions(permissions);
        if (user && user.roles) {
          checkPermissions(user.roles);
        } else {
          console.error('User roles are not defined');
        }
      })
      .catch(error => {
        console.error('Erro ao buscar os dados:', error);
      });
  };

  const checkPermissions = (roles) => {
    const hasCanView = roles.includes('R100004');
    const hasCanAdd = roles.includes('R100005');
    const hasCanEdit = roles.includes('R100006');
    const hasCanDelete = roles.includes('R100007');

    setCanView(hasCanView);
    setCanAdd(hasCanAdd);
    setCanEdit(hasCanEdit);
    setCanDelete(hasCanDelete);
  };

  const handleDeletePermission = (_id) => {
    axiosInstance.delete(`http://localhost:3000/permission/${_id}`)
      .then(() => {
        console.log(`Permissão ${_id} excluída com sucesso`);
        fetchPermissions();
      })
      .catch(error => {
        console.error('Erro ao excluir permissão:', error);
      });
  };

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h4" className="border-bottom p-3 mb-0">
            Table Permission
          </CardTitle>
          <CardBody className="">
            {canAdd && (
              <NavLink to="/permission/create" className="btn btn-success btn-sm ml-3 mb-3">
                Adicionar
              </NavLink>
            )}
            {canView ? (
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    {canEdit && canDelete && (
                    <th>Actions</th>
                  )}
                  </tr>
                </thead>
                <tbody>
                  {permissions.map((permission, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{permission.name}</td>
                      <td>
                        {canEdit && (
                          <NavLink to={`/permission/edit/${permission._id}`} className="btn btn-primary btn-sm mr-2">
                            <Icon.Edit />
                          </NavLink>
                        )}
                        {canDelete && (
                          <Button color="danger" size="sm" onClick={() => handleDeletePermission(permission._id)}>
                            <Icon.Trash />
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>Você não tem permissão para visualizar esta tabela.</p>
            )}
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Permission;
