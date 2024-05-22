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
import axiosInstance from '../auth/AxiosConfig';

const PermissionEdit = () => {
    const { _id } = useParams();
    const [name, setName] = useState('');
    const [originalName, setOriginalName] = useState('');
    const [roles, setRoles] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [nameError, setNameError] = useState('');
    const [rolesError, setRolesError] = useState('');
    const [existingNames, setExistingNames] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.get(`http://localhost:3000/permission`)
            .then(response => {
                setExistingNames(response.data.name);
            })
            .catch(error => {
                console.error('Erro ao buscar as permissões:', error);
            });

        axiosInstance.get(`http://localhost:3000/permission/${_id}`)
            .then(response => {
                const { name, roles } = response.data;
                setName(name);
                setOriginalName(name);
                setSelectedRoles(roles);
            })
            .catch(error => {
                console.error('Erro ao buscar a permissão:', error);
            });

        axiosInstance.get(`http://localhost:3000/roles`)
            .then(response => {
                setRoles(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar as funções:', error);
            });
    }, [_id]);

    const nameVerify = (existingNames, currentName, originalName) => {
        if (existingNames) {
            return existingNames.includes(currentName) && currentName !== originalName;
        } else {
            return false;
        }
    };
    

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!name || name.trim() === '' || nameVerify(existingNames, name, originalName)) {
            setNameError('O campo de nome é obrigatório ou já existe');
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

        axiosInstance.put(`http://localhost:3000/permission/${_id}`, {
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
                                    onChange={(e) => setName(e.target.value)}
                                />
                                {nameError && <span className="text-danger">{nameError}</span>}
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

export default PermissionEdit;
