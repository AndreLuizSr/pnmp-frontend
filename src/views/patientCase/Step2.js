import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Col, Card, CardBody, CardTitle, FormFeedback, Button } from 'reactstrap';

const Step2 = ({ getStore, updateStore, jumpToStep}) => {
  const [formData, setFormData] = useState(getStore());
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    updateStore({ ...formData, [name]: value });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.phone) newErrors.phone = "Telefone é obrigatório";
    if (!formData.addressLine1) newErrors.addressLine1 = "Endereço - Linha 1 é obrigatório";
    if (!formData.addressLine2) newErrors.addressLine2 = "Endereço - Linha 2 é obrigatório";
    if (!formData.postalCode) newErrors.postalCode = "Código Postal é obrigatório";
    if (!formData.city) newErrors.city = "Cidade é obrigatória";
    if (!formData.unit) newErrors.unit = "Unidade é obrigatória";
    if (!formData.zone) newErrors.zone = "Zona é obrigatória";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      jumpToStep(2);
    }
  };


  return (
    <Card>
      <CardBody>
        <CardTitle tag="h3">Dados Residenciais</CardTitle>
        <Form onSubmit={handleSubmit}>
          <FormGroup row>
            <Label for="phone" sm={2}>Telefone*:</Label>
            <Col sm={10}>
              <Input
                type="text"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                invalid={!!errors.phone}
              />
              <FormFeedback>{errors.phone}</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="addressLine1" sm={2}>Endereço - Linha 1*:</Label>
            <Col sm={10}>
              <Input
                type="text"
                name="addressLine1"
                id="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
                invalid={!!errors.addressLine1}
              />
              <FormFeedback>{errors.addressLine1}</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="addressLine2" sm={2}>Endereço - Linha 2*:</Label>
            <Col sm={10}>
              <Input
                type="text"
                name="addressLine2"
                id="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
                invalid={!!errors.addressLine2}
              />
              <FormFeedback>{errors.addressLine2}</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="postalCode" sm={2}>Código Postal*:</Label>
            <Col sm={10}>
              <Input
                type="text"
                name="postalCode"
                id="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                invalid={!!errors.postalCode}
              />
              <FormFeedback>{errors.postalCode}</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="city" sm={2}>Cidade*:</Label>
            <Col sm={10}>
              <Input
                type="text"
                name="city"
                id="city"
                value={formData.city}
                onChange={handleChange}
                invalid={!!errors.city}
              />
              <FormFeedback>{errors.city}</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="unit" sm={2}>Unidade*:</Label>
            <Col sm={10}>
              <Input
                type="text"
                name="unit"
                id="unit"
                value={formData.unit}
                onChange={handleChange}
                invalid={!!errors.unit}
              />
              <FormFeedback>{errors.unit}</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="zone" sm={2}>Zona*:</Label>
            <Col sm={10}>
              <Input
                type="text"
                name="zone"
                id="zone"
                value={formData.zone}
                onChange={handleChange}
                invalid={!!errors.zone}
              />
              <FormFeedback>{errors.zone}</FormFeedback>
            </Col>
          </FormGroup>         
          <Button color="primary" type="submit">Próximo</Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default Step2;
