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
  const [codeError, setCodeError] = useState('');
  const [existingCode, setExistingCode] = useState([]);
  const [name, setName] = useState('');
  const [parent_unit, setParentUnit] = useState('');
  const [parentUnitError, setParentUnitError] = useState('');
  const [existingParentUnit, setExistingParentUnit] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3000/units`)
      .then(response => {
        setExistingCode(response.data.map(units => units.code));
        setExistingParentUnit(response.data.map(units => units.parent_unit));
      })
      .catch(error => {
        console.error('Erro ao buscar os unidade:', error);
      });
  }, []);

  const codeVerify = (existingCode, currentCode) => {
    return existingCode.includes(currentCode);
  };
  const parentUnitVerify = (existingParentUnit, currentParentUnit) =>{
    return existingParentUnit.includes(currentParentUnit);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {};
    if (!code || code.trim() === '' || codeVerify(existingCode, code)) {
      setCodeError('Codigo é obrigatório ou já existe')
      return;
    } else {
      setCodeError('');
    }
    if (parent_unit || !parent_unit.trim() === '' || !parentUnitVerify(existingParentUnit, parent_unit)) {
      setParentUnitError('Unidade Parental não existe!')
      return;
    } else {
      setParentUnitError('');
    }
    if (!name.trim()) {
      newErrors.name = 'Nome é obrigatorio!';
    }
    if (Object.keys(newErrors).length === 0) {
      try {
        axios.post(`http://localhost:3000/units/`, {
          name,
          code,
          parent_unit,
        })
          .then(response => {
            console.log('Unidade criada com sucesso:', response.data);
            navigate('/units');
          })
          .catch(error => {
            console.error('Erro ao criar usuário:', error);
          });
      } catch (error) {
        console.error('Erro ao criar usuário:', error);
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
                <Label for="code">Codigo*</Label>
                <Input
                  id="code"
                  name="code"
                  type="string"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  invalid={!!codeError}
                />
                {codeError && <FormFeedback>{codeError}</FormFeedback>}
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
                  onChange={(e)=> setParentUnit(e.target.value)}
                  invalid={!!parentUnitError}
                />
                 {parentUnitError && <FormFeedback>{parentUnitError}</FormFeedback>}
              </FormGroup>

              <Button>Submit</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}
export default UnitsCreate;