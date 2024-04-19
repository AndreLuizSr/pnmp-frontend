import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

const UnitsEdit = () => {

  const { _id } = useParams();
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [originalCode, setOriginalCode] = useState('');
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
        console.error('Erro ao buscar os unidade:', error);
      });
    axios.get(`http://localhost:3000/units/${_id}`)
      .then(response => {
        const { code, name, parent_unit } = response.data;
        setCode(code);
        setOriginalCode(code);
        setName(name);
        setParentUnit(parent_unit);
      })
      .catch(error => {
        console.error('Erro ao buscar dados do Unidades:', error);
      });
  }, [_id]);

  const codeVerify = (existingCode, currentCode, originalCode) => {
    return existingCode.includes(currentCode) && currentCode !== originalCode;
  };
  const parentVerify = () => {
    return parent_unit !== originalCode || parent_unit === "";
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const newErrors = {};
    if (!code || code.trim() === '' || codeVerify(existingCode, code, originalCode)) {
      newErrors.code = 'Código inválido';
    }
    if (parent_unit && parentVerify() || codeVerify(existingCode, code, originalCode)) {
      newErrors.parent_unit = 'Unidade inválido';
    }
    if (!name.trim()) {
      newErrors.name = 'Nome inválido';
    }
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.put(`http://localhost:3000/units/${_id}`, {
          code,
          name,
          parent_unit
        });
  
        console.log('Unit updated successfully:', response.data);
        navigate('/units');
      } catch (error) {
        console.error('Error updating unit:', error);
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
            Editar Unidade Administrativa
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="code">Codigo*</Label>
                <Input
                  id="code"
                  name="code"
                  type="string"
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
                  type="string"
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
                  type="string"
                  value={parent_unit}
                  onChange={(e) => setParentUnit(e.target.value)}
                  invalid={!!errors.parent_unit}
                />
                {errors.parent_unit && <FormFeedback>{errors.parent_unit}</FormFeedback>}
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