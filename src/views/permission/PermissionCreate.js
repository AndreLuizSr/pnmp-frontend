
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
import axios from 'axios';

const PermissionCreate = () => {
    const [roles, setRoles] = useState([]);
    const [name, setName] = useState('');
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [nameError, setNameError] = useState('');
    const [rolesError, setRolesError] = useState('');
    const [validaterNames , setValidaterNames] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/permission`)
            .then(response => {
                setValidaterNames(response.data.map(permission => permission.name));
            })
            .catch(error => {
                console.error('Erro ao buscar as funções:', error);
            });
        axios.get(`http://localhost:3000/roles`)
            .then(response => {
                setRoles(response.data);
                setValidaterNames(response.data.map(permission => permission.name));
            })
            .catch(error => {
                console.error('Erro ao buscar as funções:', error);
            });
    }, []);

    const handleRoleSelection = (roleId) => {
        if (selectedRoles.includes(roleId)) {
            setSelectedRoles(selectedRoles.filter(id => id !== roleId));
        } else {
            setSelectedRoles([...selectedRoles, roleId]);
        }
    };
    
    const nameVerifcate = (existingNames) => {
        return existingNames.includes(name);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!name || name.trim() === '' || nameVerifcate(validaterNames)) {
            setNameError('Nome é obrigatório ou já existe');
            return;
        } else {
            setNameError('');
        }
        if (selectedRoles.length === 0) {
            setRolesError('Pelo menos uma role deve ser especificada');
            return;
        } else {
            setRolesError('');
        }
        axios.post(`http://localhost:3000/permission/`, {
            name,
            roles: selectedRoles
        })
        .then(response => {
            console.log('Permissão criada com sucesso:', response.data);
            navigate('/permission');
        })
        .catch(error => {
            console.log()
            console.error('Erro ao criar permissão:', error);
        });
    };

    return (
        <Row>
            <Col>
                <Card>
                    <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                        <i className="bi bi-bell me-2"> </i>
                        Permissions
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
                                {nameError && <span className="text-danger">{nameError}</span>}
                            </FormGroup>
                            <FormGroup>
                                <Label for="Roles">Roles</Label>
                                {roles.map((role) => (
                                    <FormGroup check key={role.key}>
                                        <Input
                                            type="checkbox"
                                            id={`role-${role.key}`}
                                            checked={selectedRoles.includes(role.key)}
                                            onChange={() => handleRoleSelection(role.key)}
                                        />
                                        <Label check className="form-check-label" for={`role-${role.key}`}>
                                            {role.value}
                                        </Label>
                                    </FormGroup>
                                ))}
                                {rolesError && <span className="text-danger">{rolesError}</span>}
                            </FormGroup>
                            <Button type="submit">Submit</Button>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default PermissionCreate;
