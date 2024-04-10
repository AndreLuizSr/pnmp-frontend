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

const CreatePermission = () => {
    const [roles, setRoles] = useState([]);
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const [selectedRoles, setSelectedRoles] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/roles`)
            .then(response => {
                setRoles(response.data);
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

    const handleSubmit = (event) => {
        event.preventDefault();
        
        try {
            axios.post(`http://localhost:3000/permission/`, {
                name,
                roles: selectedRoles
            })
            .then(response => {
                console.log('Permissão criada com sucesso:', response.data);
                navigate('/permission');
            })
            .catch(error => {
                console.error('Erro ao criar permissão:', error);
            });
        } catch (error) {
            console.error('Erro ao criar permissão:', error);
        }
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
                            </FormGroup>
                            <FormGroup>
                                <Label for="Roles">Roles</Label>
                                {roles.map((role, index) => (
                                    <FormGroup check key={index}>
                                        <Input
                                            type="checkbox"
                                            id={`role-${role._id}`}
                                            checked={selectedRoles.includes(role._id)}
                                            onChange={() => handleRoleSelection(role._id)}
                                        />
                                        <Label check className="form-check-label" for={`role-${role._id}`}>
                                            {role.name}
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

export default CreatePermission;