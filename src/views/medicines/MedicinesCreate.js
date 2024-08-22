import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  FormFeedback,
} from 'reactstrap';
import axiosInstance from '../auth/AxiosConfig';

const MedicinesCreate = () => {
  const [code, setCode] = useState('');
  const [existingCode, setExistingCode] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [dosage, setDosage] = useState('');
  const [dosageType, setDosageType] = useState('');
  const [presentation, setPresentation] = useState('');
  const [source, setSource] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get(`/medicines`)
      .then((response) => {
        setExistingCode(response.data.map((medicines) => medicines.code));
      })
      .catch((error) => {
        console.error('Erro ao buscar medicamento:', error);
      });
  });

  const codeVerify = (existingCode, currentCode) => {
    return existingCode.includes(currentCode);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};

    if (!code.trim() || codeVerify(existingCode, code)) {
      newErrors.code = 'Code invalid';
    }
    if (!name.trim()) {
      newErrors.name = 'Name invalid';
    }

    if (Object.keys(newErrors).length === 0) {
      try {
        axiosInstance
          .post(`/medicines`, {
            code,
            name,
            type,
            dosage,
            dosage_type: dosageType,
            presentation,
            source,
          })
          .then((response) => {
            console.log('Medicine created successfully:', response.data);
            navigate('/medicines');
          })
          .catch((error) => {
            console.error('Error creating medicine:', error);
          });
      } catch (error) {
        console.error('Error creating medicine:', error);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Create Medicine
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="Code">Codigo*</Label>
                <Input
                  id="Code"
                  name="code"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  invalid={!!errors.code}
                />
                {errors.code && <FormFeedback>{errors.code}</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <Label for="Name">Nome*</Label>
                <Input
                  id="Name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  invalid={!!errors.name}
                />
                {errors.name && <FormFeedback>{errors.name}</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <Label for="Type">Tipo</Label>
                <Input
                  id="Type"
                  name="type"
                  type="select"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="">Selecione o Tipo</option>
                  <option value="ORAL">Oral</option>
                  <option value="INJECTABLE">Injetável</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="Dosage">Dosagem</Label>
                <Input
                  id="Dosage"
                  name="dosage"
                  type="text"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="DosageType">Tipo de Dosagem</Label>
                <Input
                  id="DosageType"
                  name="dosageType"
                  type="select"
                  value={dosageType}
                  onChange={(e) => setDosageType(e.target.value)}
                >
                  <option value="">Selecione Tipo de Dosagem</option>
                  <option value="MG">MG</option>
                  <option value="ML">ML</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="Presentation">Apresentação</Label>
                <Input
                  id="Presentation"
                  name="presentation"
                  type="select"
                  value={presentation}
                  onChange={(e) => setPresentation(e.target.value)}
                >
                  <option value="">Selecione Apresentação</option>
                  <option value="BOTTLE">Frasco</option>
                  <option value="TABLET">Comprimido</option>
                  <option value="AMPOULE">Ampola</option>
                  <option value="CAPSULE">Cápsula</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="Source">Fonte</Label>
                <Input
                  id="Source"
                  name="source"
                  type="select"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                >
                  <option value="">Selecione Fonte</option>
                  <option value="MS">Ministério da Saúde</option>
                  <option value="OTR">Outros</option>
                </Input>
              </FormGroup>
              <Button type="submit">Submit</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default MedicinesCreate;
