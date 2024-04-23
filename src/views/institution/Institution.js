import { useState, useEffect } from 'react';
import { Row, Col, Table, Card, CardTitle, CardBody, Button } from 'reactstrap';
import axios from 'axios'; 
import { NavLink } from 'react-router-dom';
import * as Icon from "react-feather";

const Institutions = () => {
  const [institutions, setInstitutions] = useState([]);
  
  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = () => {
    axios.get("http://localhost:3000/institutions")
      .then(response => {
        setInstitutions(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar os dados:', error);
      });
  };

  const handleDeletePermission = (_id) => {
    axios.delete(`http://localhost:3000/institutions/${_id}`)
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
            Table Institutions
          </CardTitle>    
          <CardBody className="">
            <NavLink to="/institution/create" className="btn btn-success btn-sm ml-3 mb-3">
              Adicionar
            </NavLink>
            <Table responsive>
              <thead>
              <tr>
                  <th>#</th>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Address - 1</th>
                  <th>Address - 2</th>
                  <th>Postal Code</th>
                  <th>type</th>
                </tr>
              </thead>
              <tbody>
                {institutions.map((institution, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{institution.code}</td>
                    <td>{institution.name}</td>
                    <td>{institution.phone}</td>
                    <td>{institution.address.address_line_1}</td>
                    <td>{institution.address.address_line_2}</td>
                    <td>{institution.address.postal_code}</td>
                    <td>{institution.type}</td>
                    <td>
                      <NavLink to={`/institution/edit/${institution._id}`} className="btn btn-primary btn-sm mr-2">
                      <Icon.Edit/>
                      </NavLink>
                      <Button color="danger" size="sm" onClick={() => handleDeletePermission(institution._id)}>
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

export default Institutions;
