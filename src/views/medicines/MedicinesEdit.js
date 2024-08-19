import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

const MedicinesEdit = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [medicine, setMedicine] = useState({});
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [dosage, setDosage] = useState('');
  const [dosageType, setDosageType] = useState('');
  const [presentation, setPresentation] = useState('');
  const [source, setSource] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axiosInstance
      .get(`http://localhost:3000/medicines/${_id}`)
      .then((response) => {
        const data = response.data;
        setCode(data.code);
        setName(data.name);
        setType(data.type);
        setDosage(data.dosage);
        setDosageType(data.dosage_type);
        setPresentation(data.presentation);
        setSource(data.source);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [_id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};

    if (!code.trim()) {
      newErrors.code = 'Code is required';
    }
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!type.trim()) {
      newErrors.type = 'Type is required';
    }
    if (!dosage.trim()) {
      newErrors.dosage = 'Dosage is required';
    }
    if (!dosageType.trim()) {
      newErrors.dosageType = 'Dosage Type is required';
    }
    if (!presentation.trim()) {
      newErrors.presentation = 'Presentation is required';
    }
    if (!source.trim()) {
      newErrors.source = 'Source is required';
    }

    if (Object.keys(newErrors).length === 0) {
      try {
        axiosInstance
          .put(`http://localhost:3000/medicines/${_id}`, {
            code,
            name,
            type,
            dosage,
            dosage_type: dosageType,
            presentation,
            source,
          })
          .then((response) => {
            console.log('Medicine updated successfully:', response.data);
            navigate('/medicines');
          })
          .catch((error) => {
            console.error('Error updating medicine:', error);
          });
      } catch (error) {
        console.error('Error updating medicine:', error);
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
            Edit Medicine
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="Code">Code*</Label>
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
                <Label for="Name">Name*</Label>
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
                <Label for="Type">Type*</Label>
                <Input
                  id="Type"
                  name="type"
                  type="select"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  invalid={!!errors.type}
                >
                  <option value="">Select Type</option>
                  <option value="ORAL">Oral</option>
                  <option value="INJECTABLE">Injectable</option>
                </Input>
                {errors.type && <FormFeedback>{errors.type}</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <Label for="Dosage">Dosage*</Label>
                <Input
                  id="Dosage"
                  name="dosage"
                  type="text"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  invalid={!!errors.dosage}
                />
                {errors.dosage && <FormFeedback>{errors.dosage}</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <Label for="DosageType">Dosage Type*</Label>
                <Input
                  id="DosageType"
                  name="dosageType"
                  type="select"
                  value={dosageType}
                  onChange={(e) => setDosageType(e.target.value)}
                  invalid={!!errors.dosageType}
                >
                  <option value="">Select Dosage Type</option>
                  <option value="MG">MG</option>
                  <option value="ML">ML</option>
                </Input>
                {errors.dosageType && <FormFeedback>{errors.dosageType}</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <Label for="Presentation">Presentation*</Label>
                <Input
                  id="Presentation"
                  name="presentation"
                  type="select"
                  value={presentation}
                  onChange={(e) => setPresentation(e.target.value)}
                  invalid={!!errors.presentation}
                >
                  <option value="">Select Presentation</option>
                  <option value="BOTTLE">Bottle</option>
                  <option value="TABLET">Tablet</option>
                  <option value="AMPOULE">Ampoule</option>
                  <option value="CAPSULE">Capsule</option>
                </Input>
                {errors.presentation && <FormFeedback>{errors.presentation}</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <Label for="Source">Source*</Label>
                <Input
                  id="Source"
                  name="source"
                  type="select"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  invalid={!!errors.source}
                >
                  <option value="">Select Source</option>
                  <option value="MS">MS (Ministério da Saúde)</option>
                  <option value="OTR">Other</option>
                </Input>
                {errors.source && <FormFeedback>{errors.source}</FormFeedback>}
              </FormGroup>
              <Button type="submit">Submit</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default MedicinesEdit;
