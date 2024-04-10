import { useState, useEffect } from 'react';
import { Row, Col, Table, Card, CardTitle, CardBody, Button } from 'reactstrap';
import axios from 'axios'; 
import { NavLink } from 'react-router-dom';
import * as Icon from "react-feather";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = () => {
    axios.get("http://localhost:3000/users")
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar os dados:', error);
      });
  };

  const handleDeleteUser = (user) => {
    axios.delete(`http://localhost:3000/users/${user._id}`)
        .then(() => {
            console.log(`Usuário ${user.email} excluído(a) com sucesso`);
            fetchPermissions();
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
            <NavLink to="/user/create" className="btn btn-success btn-sm ml-3 mb-3">
              Adicionar
            </NavLink>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Institution</th>
                  <th>Permissão</th>
                  <th>Actions</th>
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
                      <NavLink to={`/user/edit/${user._id}`} className="btn btn-primary btn-sm mr-">
                        <Icon.Edit/>
                      </NavLink>
                      <Button color="danger" size="sm" onClick={() => handleDeleteUser(user)}>
                        <Icon.Trash/>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Users;
