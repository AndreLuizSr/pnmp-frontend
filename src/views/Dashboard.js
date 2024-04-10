import { Row, Col, Card, CardTitle, CardBody } from 'reactstrap';

const Dashboard = () => {
  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h4" className="border-bottom p-3 mb-0">
            Dashboard
          </CardTitle>    
          <CardBody>
            ...
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Dashboard;
