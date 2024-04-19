import axios from 'axios';
import { useState, useEffect } from 'react';
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
  FormFeedback
} from 'reactstrap';

const UnitsCreate = () => {

  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [existingCode, setExistingCode] = useState([]);
  const [name, setName] = useState('');
  const [parent_unit, setParentUnit] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3000/units`)
      .then(response => {
        setExistingCode(response.data.map(units => units.code));
      })
      .catch(error => {
        console.error('Erro ao buscar as unidades:', error);
      });

  }, []);

  const codeVerify = (existingCode, currentCode) => {
    return existingCode.includes(currentCode);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Nome inválido';
    }

    if (!code || code.trim() === '' || codeVerify(existingCode, code)) {
      newErrors.code = 'Código inválido';
    }

    if (parent_unit !== "" && !existingCode.includes(parent_unit)) {
      newErrors.parent_unit = 'Unidade parental inválida';
    }

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post(`http://localhost:3000/units/`, {
          name,
          code,
          parent_unit,
        });
        console.log('Unidade criada com sucesso:', response.data);
        navigate('/units');
      } catch (error) {
        console.error('Erro ao criar unidade:', error);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h4" className="border-bottom p-3 mb-0">
            Adicionar Unidade Administrativa
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="code">Código*</Label>
                <Input
                  id="code"
                  name="code"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  invalid={!!errors.code}
                />
                {errors.code && <FormFeedback>{errors.code}</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <Label for="name">Nome*</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  invalid={!!errors.name}
                />
                {errors.name && <FormFeedback>{errors.name}</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <Label for="parentUnit">Unidade parental</Label>
                <Input
                  id="parentUnit"
                  name="parentUnit"
                  type="text"
                  value={parent_unit}
                  onChange={(e) => setParentUnit(e.target.value)}
                  invalid={!!errors.parent_unit}
                />
                {errors.parent_unit && <FormFeedback>{errors.parent_unit}</FormFeedback>}
              </FormGroup>
              <Button type="submit">Submit</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default UnitsCreate;
