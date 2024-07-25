import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Col, Card, CardBody, CardTitle, FormFeedback, Button, Row } from 'reactstrap';

const Step5 = ({ getStore, updateStore, handleSubmit }) => {
  const initialFormData = getStore();
  if (!initialFormData.diagnostic_conclusion) {
    initialFormData.diagnostic_conclusion = [{ conclusion: '', agent: '', other: '' }];
  }
  const [formData, setFormData] = useState(initialFormData);
  const [conclusions, setConclusions] = useState(formData.diagnostic_conclusion);
  const [errors, setErrors] = useState(conclusions.map(() => ({})));

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newConclusions = [...conclusions];
    newConclusions[index] = { ...newConclusions[index], [name]: value };
    setConclusions(newConclusions);
    updateStore({ ...formData, diagnostic_conclusion: newConclusions });

    const newErrors = [...errors];
    newErrors[index] = { ...newErrors[index], [name]: '' };
    setErrors(newErrors);
  };

  const validate = () => {
    const newErrors = conclusions.map(conclusion => {
      const errors = {};
      if (!conclusion.conclusion) errors.conclusion = "Conclusão é obrigatório";
      if (!conclusion.agent) errors.agent = "Agente é obrigatório";
      if (!conclusion.other) errors.other = "Outro é obrigatório";
      return errors;
    });
    setErrors(newErrors);
    return newErrors.every(error => Object.keys(error).length === 0);
  };

  const addConclusion = () => {
    setConclusions([...conclusions, { conclusion: '', agent: '', other: '' }]);
    setErrors([...errors, {}]);
  };

  const removeConclusion = (index) => {
    if (conclusions.length > 1) {
      const newConclusions = conclusions.filter((_, i) => i !== index);
      const newErrors = errors.filter((_, i) => i !== index);
      setConclusions(newConclusions);
      setErrors(newErrors);
      updateStore({ ...formData, diagnostic_conclusion: newConclusions });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      handleSubmit();
    }
  };

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h3">Conclusão Diagnóstica</CardTitle>
        <Form onSubmit={onSubmit}>
          {conclusions.map((conclusion, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <Row>
                <Col sm={11}>
                  <FormGroup row>
                    <Label for={`conclusion-${index}`} sm={2}>Conclusão*:</Label>
                    <Col sm={10}>
                      <Input
                        type="textarea"
                        name="conclusion"
                        id={`conclusion-${index}`}
                        value={conclusion.conclusion}
                        onChange={(e) => handleChange(index, e)}
                        invalid={!!errors[index]?.conclusion}
                        required
                      />
                      <FormFeedback>{errors[index]?.conclusion}</FormFeedback>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for={`agent-${index}`} sm={2}>Agente*:</Label>
                    <Col sm={10}>
                      <Input
                        type="text"
                        name="agent"
                        id={`agent-${index}`}
                        value={conclusion.agent}
                        onChange={(e) => handleChange(index, e)}
                        invalid={!!errors[index]?.agent}
                        required
                      />
                      <FormFeedback>{errors[index]?.agent}</FormFeedback>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for={`other-${index}`} sm={2}>Outro*:</Label>
                    <Col sm={10}>
                      <Input
                        type="text"
                        name="other"
                        id={`other-${index}`}
                        value={conclusion.other}
                        onChange={(e) => handleChange(index, e)}
                        invalid={!!errors[index]?.other}
                        required
                      />
                      <FormFeedback>{errors[index]?.other}</FormFeedback>
                    </Col>
                  </FormGroup>
                </Col>
                <Col sm={1} className="d-flex align-items-start">
                  <Button color="danger" onClick={() => removeConclusion(index)} style={{ marginTop: '30px' }} disabled={conclusions.length === 1}>Remove</Button>
                </Col>
              </Row>
            </div>
          ))}
          <Button color="primary" onClick={addConclusion}>Add Conclusion</Button>
          <Button color="primary" type="submit" style={{ marginLeft: '10px' }}>Submit</Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default Step5;
