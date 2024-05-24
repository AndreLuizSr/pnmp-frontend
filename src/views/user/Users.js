import { useState, useEffect } from 'react';
import { Row, Col, Table, Card, CardTitle, CardBody, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import * as Icon from "react-feather";
import axiosInstance from '../auth/AxiosConfig';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [canView, setCanView] = useState(false);
  const [canAdd, setCanAdd] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchPermissions();
  }, []);

  const fetchPermissions = () => {
    axiosInstance.get("http://localhost:3000/permission")
      .then(response => {
        const { user } = response.data;
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

  const fetchUsers = () => {
    axiosInstance.get("/users")
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar os dados:', error);
      });
  };

  const checkPermissions = (roles) => {
    const hasCanView = roles.includes('R100000');
    const hasCanAdd = roles.includes('R100001');
    const hasCanEdit = roles.includes('R100002');
    const hasCanDelete = roles.includes('R100003');

    setCanView(hasCanView);
    setCanAdd(hasCanAdd);
    setCanEdit(hasCanEdit);
    setCanDelete(hasCanDelete);
  };

  const handleDeleteUser = (user) => {
    axiosInstance.delete(`/users/${user._id}`)
      .then(() => {
        console.log(`Usuário ${user.email} excluído(a) com sucesso`);
        fetchUsers();
      })
      .catch(error => {
        console.error('Erro ao excluir usuário:', error);
      });
  };

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h4" className="border-bottom p-3 mb-0">
            Table Users
          </CardTitle>
          <CardBody>
            {canAdd && (
              <NavLink to="/user/create" className="btn btn-success btn-sm ml-3 mb-3">
                Adicionar
              </NavLink>
            )}
            {canView ? (
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Institution</th>
                    <th>Permissão</th>
                    {canEdit && canDelete && (
                    <th>Actions</th>
                  )}
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.institution}</td>
                      <td>{user.permission}</td>
                      <td>
                        {canEdit && (
                          <NavLink to={`/user/edit/${user._id}`} className="btn btn-primary btn-sm mr-">
                            <Icon.Edit />
                          </NavLink>
                        )}
                        {canDelete && (
                          <Button color="danger" size="sm" onClick={() => handleDeleteUser(user)}>
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

export default Users;
