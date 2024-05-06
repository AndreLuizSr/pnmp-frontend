import { useState, useEffect } from 'react';
import { Row, Col, Table, Card, CardTitle, CardBody } from 'reactstrap';
import axiosInstance from '../auth/AxiosConfig';
import { NavLink } from 'react-router-dom';

const Institutions = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axiosInstance.get("http://localhost:3000/events")
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar os dados:', error);
      });
  };

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h4" className="border-bottom p-3 mb-0">
            Table Events
          </CardTitle>
          <CardBody className="">
            <NavLink to="/institution/create" className="btn btn-success btn-sm ml-3 mb-3">
              Adicionar
            </NavLink>
            <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Type</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Institution</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{event.type}</td>
                    <td>{event.user.name}</td>
                    <td>{event.user.email}</td>
                    <td>{event.user.institution}</td>
                    <td>{event.datetime}</td>
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
