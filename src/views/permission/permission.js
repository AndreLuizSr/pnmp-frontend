import { useState, useEffect } from 'react';
import { Row, Col, Table, Card, CardTitle, CardBody, Button } from 'reactstrap';
import axios from 'axios'; 
import { NavLink } from 'react-router-dom';
import * as Icon from "react-feather";

const Permission = () => {
  const [permissions, setPermissions] = useState([]);
  
  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = () => {
    axios.get("http://localhost:3000/permission")
      .then(response => {
        setPermissions(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar os dados:', error);
      });
  };

  const handleDeletePermission = (name) => {
    axios.delete(`http://localhost:3000/permission/${name}`)
        .then(() => {
            console.log(`Permissão ${name} excluída com sucesso`);
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
            <NavLink to="/createPermission" className="btn btn-success btn-sm ml-3 mb-3">
              Adicionar
            </NavLink>
            <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {permissions.map((permission, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{permission.name}</td>
                    <td>
                      <NavLink to={`/editPermission/${permission.name}`} className="btn btn-primary btn-sm mr-2">
                      <Icon.Edit/>
                      </NavLink>
                      <Button color="danger" size="sm" onClick={() => handleDeletePermission(permission.name)}>
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

export default Permission;
