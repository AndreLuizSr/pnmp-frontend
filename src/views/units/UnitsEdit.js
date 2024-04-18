import {
    Card,
    Row,
    Col,
    CardTitle,
    CardBody,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
  } from 'reactstrap';
  
const UnitsEdit = () => {
    return(
        <Row>
          <Col>
            <Card>
              <CardTitle tag="h4" className="border-bottom p-3 mb-0">
              Editar Unidade Administrativa
              </CardTitle>
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="code">Codigo*</Label>
                    <Input
                      id="code"
                      name="code"
                      type="string"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="name">Nome*</Label>
                    <Input
                      id="name"
                      name="name"
                      type="string"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="parentUnit">Unidade parental</Label>
                    <Input
                      id="parentUnit"
                      name="parentUnit"
                      type="string"
                    />
                  </FormGroup>
                 
                  <Button>Submit</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      );
}
export default UnitsEdit;