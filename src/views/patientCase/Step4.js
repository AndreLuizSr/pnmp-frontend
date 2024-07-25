import React, { useState, useEffect } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Card,
  CardBody,
  CardTitle,
  FormFeedback,
  Button,
} from 'reactstrap';

const Step4 = ({ getStore, updateStore, jumpToStep }) => {
  const [formData, setFormData] = useState(getStore());
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const associatedInformation = [];
    if (formData.hiv_aids === 'yes') associatedInformation.push('HIV/AIDS');
    if (formData.alcohol_abuse === 'yes') associatedInformation.push('Abuso de Álcool');
    if (formData.smoking === 'yes') associatedInformation.push('Tabagismo');
    if (formData.drug_use === 'yes') associatedInformation.push('Uso de Drogas');
    if (formData.chronic_disease === 'yes') associatedInformation.push('Doença Crônica');
    setFormData((prevState) => ({
      ...prevState,
      associated_information: associatedInformation,
    }));
    updateStore({
      ...formData,
      associated_information: associatedInformation,
    });
  }, [
    formData.hiv_aids,
    formData.alcohol_abuse,
    formData.smoking,
    formData.drug_use,
    formData.chronic_disease,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    updateStore({ ...formData, [name]: value });
  };

  const validate = () => {
    let newErrors = {};

    // Validate required fields
    if (!formData.hiv_aids) newErrors.hiv_aids = 'HIV/AIDS é obrigatório';
    if (!formData.alcohol_abuse) newErrors.alcohol_abuse = 'Abuso de Álcool é obrigatório';
    if (!formData.smoking) newErrors.smoking = 'Tabagismo é obrigatório';
    if (!formData.drug_use) newErrors.drug_use = 'Uso de Drogas é obrigatório';
    if (!formData.chronic_disease) newErrors.chronic_disease = 'Doença Crônica é obrigatório';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      jumpToStep(4); 
    }
  };

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h3">Informações Adicionais</CardTitle>
        <Form onSubmit={handleSubmit}>
          <FormGroup row>
            <Label for="hiv_aids" sm={2}>
              HIV/AIDS*:
            </Label>
            <Col sm={10}>
              <Input
                type="select"
                name="hiv_aids"
                id="hiv_aids"
                value={formData.hiv_aids}
                onChange={handleChange}
                invalid={!!errors.hiv_aids}
              >
                <option value="">Selecione</option>
                <option value="yes">Sim</option>
                <option value="no">Não</option>
              </Input>
              <FormFeedback>{errors.hiv_aids}</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="alcohol_abuse" sm={2}>
              Abuso de Álcool*:
            </Label>
            <Col sm={10}>
              <Input
                type="select"
                name="alcohol_abuse"
                id="alcohol_abuse"
                value={formData.alcohol_abuse}
                onChange={handleChange}
                invalid={!!errors.alcohol_abuse}
              >
                <option value="">Selecione</option>
                <option value="yes">Sim</option>
                <option value="no">Não</option>
              </Input>
              <FormFeedback>{errors.alcohol_abuse}</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="smoking" sm={2}>
              Tabagismo*:
            </Label>
            <Col sm={10}>
              <Input
                type="select"
                name="smoking"
                id="smoking"
                value={formData.smoking}
                onChange={handleChange}
                invalid={!!errors.smoking}
              >
                <option value="">Selecione</option>
                <option value="yes">Sim</option>
                <option value="no">Não</option>
              </Input>
              <FormFeedback>{errors.smoking}</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="drug_use" sm={2}>
              Uso de Drogas*:
            </Label>
            <Col sm={10}>
              <Input
                type="select"
                name="drug_use"
                id="drug_use"
                value={formData.drug_use}
                onChange={handleChange}
                invalid={!!errors.drug_use}
              >
                <option value="">Selecione</option>
                <option value="yes">Sim</option>
                <option value="no">Não</option>
              </Input>
              <FormFeedback>{errors.drug_use}</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="chronic_disease" sm={2}>
              Doença Crônica*:
            </Label>
            <Col sm={10}>
              <Input
                type="select"
                name="chronic_disease"
                id="chronic_disease"
                value={formData.chronic_disease}
                onChange={handleChange}
                invalid={!!errors.chronic_disease}
              >
                <option value="">Selecione</option>
                <option value="yes">Sim</option>
                <option value="no">Não</option>
              </Input>
              <FormFeedback>{errors.chronic_disease}</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="associated_information_other" sm={2}>Outros*:</Label>
            <Col sm={10}>
              <Input
                type="text"
                name="associated_information_other"
                id="associated_information_other"
                value={formData.associated_information_other}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
          <Button color="primary" type="submit" style={{ marginLeft: '10px' }}>
            Próximo
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default Step4;
