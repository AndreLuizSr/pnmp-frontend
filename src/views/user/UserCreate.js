import axiosInstance from '../auth/AxiosConfig';
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

const UserCreate = () => {
  const [permissions, setPermissions] = useState([]);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [institution, setInstitution] = useState('');
  const [email, setEmail] = useState('');
  const [existingEmails, setExistingEmails] = useState([]);
  const [selectedPermission, setSelectedPermission] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axiosInstance.get('http://localhost:3000/users')
      .then(response => {
        setExistingEmails(response.data.map(user => user.email));
      })
      .catch(error => {
        console.error('Erro ao buscar os usuários:', error);
      });

    axiosInstance.get('http://localhost:3000/permission')
      .then(response => {
        console.log('Permissões recebidas:', response.data);
        setPermissions(response.data.permissions || []);
      })
      .catch(error => {
        console.error('Erro ao buscar as permissões:', error);
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

  const emailVerify = (existingEmails, currentEmail) => {
    return existingEmails.includes(currentEmail);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Phone is required';
    }
    if (!institution.trim()) {
      newErrors.institution = 'Institution is required';
    }
    if (!email || email.trim() === '' || emailVerify(existingEmails, email)) {
      newErrors.email = 'E-mail é obrigatório ou já existe';
    }
    if (!selectedPermission) {
      newErrors.permission = 'Permission is required';
    }

    if (Object.keys(newErrors).length === 0) {
      try {
        await axiosInstance.post('http://localhost:3000/users/', {
          name,
          password,
          phone,
          institution,
          email,
          permission: selectedPermission ? [selectedPermission] : []
        });
        navigate('/user');
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
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Add a User
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit}>
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
                <Label for="Password">Password**</Label>
                <Input
                  id="Password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  invalid={!!errors.password}
                />
                {errors.password && <FormFeedback>{errors.password}</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <Label for="Email">Email*</Label>
                <Input
                  id="Email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  invalid={!!errors.email}
                />
                {errors.email && <FormFeedback>{errors.email}</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <Label for="Phone">Phone*</Label>
                <Input
                  id="Phone"
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  invalid={!!errors.phone}
                />
                {errors.phone && <FormFeedback>{errors.phone}</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <Label for="Institution">Institution*</Label>
                <Input
                  id="Institution"
                  name="institution"
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  invalid={!!errors.institution}
                />
                {errors.institution && <FormFeedback>{errors.institution}</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <Label for="Permission">Permissions*</Label>
                {Array.isArray(permissions) && permissions.map((permission) => (
                  <FormGroup check key={permission._id}>
                    <Input
                      type="checkbox"
                      id={`permission-${permission.name}`}
                      checked={selectedPermission === permission.name}
                      onChange={() => handlePermissionSelection(permission.name)}
                      invalid={!!errors.permission}
                    />
                    <Label check className="form-check-label" htmlFor={`permission-${permission.name}`}>
                      {permission.name}
                    </Label>
                  </FormGroup>
                ))}
                {errors.permission && <FormFeedback>{errors.permission}</FormFeedback>}
              </FormGroup>
              <Button type="submit">Submit</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default UserCreate;
