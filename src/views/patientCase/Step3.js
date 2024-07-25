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
  Row,
} from 'reactstrap';

const Step3 = ({ getStore, updateStore, jumpToStep }) => {
  const initialFormData = getStore();
  if (!initialFormData.exams || initialFormData.exams.length === 0) {
    initialFormData.exams = [{ type: '', data: '' }];
  }

  const [formData, setFormData] = useState(initialFormData);
  const [exams, setExams] = useState(formData.exams);
  const [errors, setErrors] = useState(exams.map(() => ({})));

  useEffect(() => {
    updateStore(formData);
  }, [formData]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newExams = [...exams];
    newExams[index] = { ...newExams[index], [name]: value };
    setExams(newExams);
    updateStore({ ...formData, exams: newExams });

    const newErrors = [...errors];
    newErrors[index] = { ...newErrors[index], [name]: '' };
    setErrors(newErrors);
  };

  const addExam = () => {
    setExams([...exams, { type: '', data: '' }]);
    setErrors([...errors, {}]);
  };

  const removeExam = (index) => {
    if (exams.length > 1) {
      const newExams = exams.filter((_, i) => i !== index);
      const newErrors = errors.filter((_, i) => i !== index);
      setExams(newExams);
      setErrors(newErrors);
      updateStore({ ...formData, exams: newExams });
    }
  };

  const validate = () => {
    let newErrors = {};
    const examErrors = exams.map((exam) => {
      const errors = {};
      if (!exam.type) errors.type = 'Tipo é obrigatório';
      if (!exam.data) errors.data = 'Data é obrigatória';
      return errors;
    });

    if (!formData.type) newErrors.type = 'Tipo é obrigatório';
    if (formData.work_related === undefined)
      newErrors.work_related = 'Relacionado ao Trabalho é obrigatório';
    if (!formData.first_symptoms_at)
      newErrors.first_symptoms_at = 'Primeiros Sintomas em é obrigatório';
    if (!formData.infection_source) newErrors.infection_source = 'Fonte de Infecção é obrigatório';
    if (!formData.clinical_form) newErrors.clinical_form = 'Forma Clínica é obrigatória';

    setErrors({ ...newErrors, exams: examErrors });
    return (
      Object.keys(newErrors).length === 0 &&
      examErrors.every((error) => Object.keys(error).length === 0)
    );
  };

  const handleBooleanChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value === 'true' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      jumpToStep(3);
    }
  };

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h3">Dados Clínicos</CardTitle>
        <Form onSubmit={handleSubmit}>
          <FormGroup row>
            <Label for="type" sm={2}>
              Tipo*:
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="type"
                id="type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                invalid={!!errors.type}
              />
              <FormFeedback>{errors.type}</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="work_related" sm={2}>
              Relacionado ao Trabalho*:
            </Label>
            <Col sm={10}>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="work_related"
                    value="true"
                    checked={formData.work_related === true}
                    onChange={handleBooleanChange}
                    invalid={!!errors.work_related}
                  />{' '}
                  Sim
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="work_related"
                    value="false"
                    checked={formData.work_related === false}
                    onChange={handleBooleanChange}
                    invalid={!!errors.work_related}
                  />{' '}
                  Não
                </Label>
              </FormGroup>
              <FormFeedback>{errors.work_related}</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="first_symptoms_at" sm={2}>
              Primeiros Sintomas em*:
            </Label>
            <Col sm={10}>
              <Input
                type="date"
                name="first_symptoms_at"
                id="first_symptoms_at"
                value={formData.first_symptoms_at}
                onChange={(e) => setFormData({ ...formData, first_symptoms_at: e.target.value })}
                invalid={!!errors.first_symptoms_at}
              />
              <FormFeedback>{errors.first_symptoms_at}</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="infection_source" sm={2}>
              Fonte de Infecção*:
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="infection_source"
                id="infection_source"
                value={formData.infection_source}
                onChange={(e) => setFormData({ ...formData, infection_source: e.target.value })}
                invalid={!!errors.infection_source}
              />
              <FormFeedback>{errors.infection_source}</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="clinical_form" sm={2}>
              Forma Clínica*:
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="clinical_form"
                id="clinical_form"
                value={formData.clinical_form}
                onChange={(e) => setFormData({ ...formData, clinical_form: e.target.value })}
                invalid={!!errors.clinical_form}
              />
              <FormFeedback>{errors.clinical_form}</FormFeedback>
            </Col>
          </FormGroup>
          <Button color="secondary" onClick={addExam} style={{ marginBottom: '10px' }}>
            Adicionar Exame
          </Button>
          {exams.map((exam, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <Row>
                <Col sm={5}>
                  <FormGroup>
                    <Label for={`exam_type-${index}`}>Tipo de Exame*:</Label>
                    <Input
                      type="select"
                      name="type"
                      id={`exam_type-${index}`}
                      value={exam.type}
                      onChange={(e) => handleChange(index, e)}
                      invalid={!!errors[index]?.type}
                    >
                      <option value="">Selecione o Tipo de Exame</option>
                      <option value="TOMOGRAFIA">TOMOGRAFIA</option>
                      <option value="CULTURA">CULTURA</option>
                    </Input>
                    <FormFeedback>{errors[index]?.type}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col sm={5}>
                  <FormGroup>
                    <Label for={`exam_data-${index}`}>Data do Exame*:</Label>
                    <Input
                      type="date"
                      name="data"
                      id={`exam_data-${index}`}
                      value={exam.data}
                      onChange={(e) => handleChange(index, e)}
                      invalid={!!errors[index]?.data}
                    />
                    <FormFeedback>{errors[index]?.data}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col sm={2} className="d-flex align-items-start">
                  <Button
                    color="danger"
                    onClick={() => removeExam(index)}
                    style={{ marginTop: '30px' }}
                    disabled={exams.length === 1}
                  >
                    Remover
                  </Button>
                </Col>
              </Row>
            </div>
          ))}

          <Button
            color="primary"
            type="submit"
            style={{ marginBottom: '10px', marginLeft: '10px' }}
          >
            Próximo
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default Step3;
