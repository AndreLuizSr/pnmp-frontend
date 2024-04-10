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
} from 'reactstrap';

const AddUser = () => {
  const [permission, setPermission] = useState([]);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [institution, setInstitution] = useState('');
  const [email, setEmail] = useState('');
  const [selectedPermission, setSelectedPermission] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3000/permission`)
      .then(response => {
        setPermission(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar as funções:', error);
      });
  }, []);

  const handlePermissionSelection = (permissionName) => {
    setSelectedPermission(prevPermission => {
      if (prevPermission === permissionName) {
        return '';
      } else {
        return permissionName;
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      axios.post(`http://localhost:3000/users/`, {
        name,
        password,
        phone,
        institution,
        email,
        permission: selectedPermission ? [selectedPermission] : []
      })
        .then(response => {
          console.log('Usuário criado com sucesso:', response.data);
          navigate('/user');
        })
        .catch(error => {
          console.error('Erro ao criar usuário:', error);
        });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  };

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Add a User
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="Name">Name</Label>
                <Input
                  id="Name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="Password">Password</Label>
                <Input
                  id="Password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="Email">Email</Label>
                <Input
                  id="Email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="Phone">Phone</Label>
                <Input
                  id="Phone"
                  name="Phone"
                  type="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="Institution">Institution</Label>
                <Input
                  id="Institution"
                  name="institution"
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="Permission">Permissions</Label>
                {permission.map((permit, index) => (
                  <FormGroup check key={index}>
                    <Input
                      type="checkbox"
                      id={`permit-${permit.name}`}
                      checked={selectedPermission === permit.name}
                      onChange={() => handlePermissionSelection(permit.name)}
                    />
                    <Label check className="form-check-label" htmlFor={`permit-${permit.name}`}>
                      {permit.name}
                    </Label>
                  </FormGroup>
                ))}
              </FormGroup>
              <Button type="submit">Submit</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default AddUser;
