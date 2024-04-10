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
import axios from 'axios';

const EditPermission = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const [roles, setRoles] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/permission/${name}`)
            .then(response => {
                const{roles} = response.data;
                setSelectedRoles(roles);
            })
            .catch(error => {
                console.error('Erro ao buscar a permissão:', error);
            });

        axios.get(`http://localhost:3000/roles`)
            .then(response => {
                setRoles(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar as funções:', error);
            });
    }, [name]);
    
    const handleSubmit = (event) => {
        event.preventDefault();

        try {
            axios.put(`http://localhost:3000/permission/${name}`, {
                name,
                roles: selectedRoles
            })
                .then(response => {
                    console.log('Permissão atualizada com sucesso:', response.data);
                    navigate('/permission');
                })
                .catch(error => {
                    console.error('Erro ao atualizar permissão:', error);
                });
        } catch (error) {
            console.error('Erro ao atualizar permissão:', error);
        }
    };

    const handleRoleChange = (roleId) => {
        const updatedSelectedRoles = selectedRoles.includes(roleId)
            ? selectedRoles.filter(id => id !== roleId)
            : [...selectedRoles, roleId];
        setSelectedRoles(updatedSelectedRoles);
    };

    return (
        <Row>
            <Col>
                <Card>
                    <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                        <i className="bi bi-bell me-2"> </i>
                        Edit Permission
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
                                    disabled
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="Roles">Roles</Label>
                                {roles.map(role => (
                                    <FormGroup check key={role.key}>
                                        <Input
                                            type="checkbox"
                                            id={role.key}
                                            checked={selectedRoles.includes(role.key)}
                                            onChange={() => handleRoleChange(role.key)}
                                        />
                                        <Label check className="form-check-label" for={role.key}>
                                            {role.value}
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

export default EditPermission;
