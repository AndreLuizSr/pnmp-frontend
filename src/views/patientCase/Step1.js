import React, { useState } from 'react';
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

const Step1 = ({ getStore, updateStore, jumpToStep }) => {
  const [formData, setFormData] = useState(getStore());
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    updateStore({ ...formData, [name]: value });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name) newErrors.name = 'Nome é obrigatório';
    if (!formData.birthdate) newErrors.birthdate = 'Data de Nascimento é obrigatória';
    if (!formData.sex) newErrors.sex = 'Sexo é obrigatório';
    if (!formData.color) newErrors.color = 'Cor é obrigatória';
    if (!formData.weight) newErrors.weight = 'Peso é obrigatório';
    if (!formData.education) newErrors.education = 'Escolaridade é obrigatória';
    if (!formData.mother_name) newErrors.mother_name = 'Nome da Mãe é obrigatório';
    if (!formData.job) newErrors.job = 'Trabalho é obrigatório';
    if (!formData.country) newErrors.country = 'País é obrigatório';

    if (!formData.health_number && !formData.fiscal_number) {
      newErrors.health_number = 'Número de Saúde ou Número Fiscal é obrigatório';
      newErrors.fiscal_number = 'Número de Saúde ou Número Fiscal é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      jumpToStep(1); 
    }
  };

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h3">Identificação do Individuo</CardTitle>
        <Form onSubmit={handleSubmit}>
          <FormGroup row>
            <Label for="name" sm={2}>
              Nome*:
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="name"
                id="name"
                value={formData.name || ''}
                onChange={handleChange}
                invalid={!!errors.name}
              />
              <FormFeedback>{errors.name}</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="social_name" sm={2}>
              Nome Social:
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="social_name"
                id="social_name"
                value={formData.social_name || ''}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="health_number" sm={2}>
              Número de Saúde*:
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="health_number"
                id="health_number"
                value={formData.health_number || ''}
                onChange={handleChange}
                invalid={!!errors.health_number}
              />
              <FormFeedback>{errors.health_number}</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="fiscal_number" sm={2}>
              Número Fiscal*:
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="fiscal_number"
                id="fiscal_number"
                value={formData.fiscal_number || ''}
                onChange={handleChange}
                invalid={!!errors.fiscal_number}
              />
              <FormFeedback>{errors.fiscal_number}</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="birthdate" sm={2}>
              Data de Nascimento*:
            </Label>
            <Col sm={10}>
              <Input
                type="date"
                name="birthdate"
                id="birthdate"
                value={formData.birthdate || ''}
                onChange={handleChange}
                invalid={!!errors.birthdate}
              />
              <FormFeedback>{errors.birthdate}</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="sex" sm={2}>
              Sexo*:
            </Label>
            <Col sm={10}>
              <Input
                type="select"
                name="sex"
                id="sex"
                value={formData.sex || ''}
                onChange={handleChange}
                invalid={!!errors.sex}
              >
                <option value="">Selecione</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
              </Input>
              <FormFeedback>{errors.sex}</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="color" sm={2}>
              Cor*:
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="color"
                id="color"
                value={formData.color || ''}
                onChange={handleChange}
                invalid={!!errors.color}
              />
              <FormFeedback>{errors.color}</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="weight" sm={2}>
              Peso*:
            </Label>
            <Col sm={10}>
              <Input
                type="number"
                name="weight"
                id="weight"
                value={formData.weight || ''}
                onChange={handleChange}
                invalid={!!errors.weight}
              />
              <FormFeedback>{errors.weight}</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="education" sm={2}>
              Escolaridade*:
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="education"
                id="education"
                value={formData.education || ''}
                onChange={handleChange}
                invalid={!!errors.education}
              />
              <FormFeedback>{errors.education}</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="mother_name" sm={2}>
              Nome da Mãe*:
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="mother_name"
                id="mother_name"
                value={formData.mother_name || ''}
                onChange={handleChange}
                invalid={!!errors.mother_name}
              />
              <FormFeedback>{errors.mother_name}</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="job" sm={2}>
              Trabalho*:
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="job"
                id="job"
                value={formData.job || ''}
                onChange={handleChange}
                invalid={!!errors.job}
              />
              <FormFeedback>{errors.job}</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="country" sm={2}>
              País*:
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="country"
                id="country"
                value={formData.country || ''}
                onChange={handleChange}
                invalid={!!errors.country}
              />
              <FormFeedback>{errors.country}</FormFeedback>
            </Col>
          </FormGroup>
          <Button color="primary" type="submit" style={{ marginLeft: '10px' }}>Próximo</Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default Step1;
