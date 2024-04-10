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
} from 'reactstrap';

const UpdateUser = () => {
  const { email } = useParams();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [institution, setInstitution] = useState('');
  const [permissionOptions, setPermissionOptions] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    
    axios.get(`http://localhost:3000/users/${email}`)
      .then(response => {
        const { name, password, phone, institution, permission } = response.data;
        setName(name);
        setPassword(password);
        setPhone(phone);
        setInstitution(institution);
        setSelectedPermissions(permission);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });

    
    axios.get(`http://localhost:3000/permission`)
      .then(response => {
        setPermissionOptions(response.data.map(permit => permit.name));
      })
      .catch(error => {
        console.error('Error fetching permission options:', error);
      });
  }, [email]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(`http://localhost:3000/users/${email}`, {
        name,
        password,
        phone,
        institution,
        permission: selectedPermissions,
      });

      console.log('Resposta do servidor:', response.data);

      console.log('Usuário atualizado com sucesso:', response.data);
      navigate('/user');
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    }
  };

  const handlePermissionChange = (permissionName) => {
    setSelectedPermissions(prevPermissions => {
     const isSelected = prevPermissions.includes(permissionName);

      if (isSelected) {
        return prevPermissions.filter(permission => permission !== permissionName);
      } else {
        return [permissionName];
      }
    });
  };


  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-person me-2"> </i>
            Update User
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="Name">Name</Label>
                <Input
                  id="Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="Email">Email</Label>
                <Input
                  id="Email"
                  type="email"
                  value={email}
                  readOnly
                  disabled
                />
              </FormGroup>
              <FormGroup>
                <Label for="Password">Password</Label>
                <Input
                  id="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="Phone">Phone</Label>
                <Input
                  id="Phone"
                  type="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="Institution">Institution</Label>
                <Input
                  id="Institution"
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="Permission">Permission</Label>
                {permissionOptions.map((permit, index) => (
                  <FormGroup check key={index}>
                    <Input
                      type="checkbox"
                      id={`permit-${permit}`}
                      checked={selectedPermissions.includes(permit)}
                      onChange={() => handlePermissionChange(permit)}
                    />
                    <Label check className="form-check-label" htmlFor={`permit-${permit}`}>
                      {permit}
                    </Label>
                  </FormGroup>
                ))}
              </FormGroup>
              <Button type="submit">Update</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default UpdateUser;
