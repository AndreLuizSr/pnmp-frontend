import axiosInstance from '../auth/AxiosConfig';
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

const UserEdit = () => {
    const { _id } = useParams();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [originalEmail, setOriginalEmail] = useState('');
    const [existingEmails, setExistingEmails] = useState([]);
    const [institution, setInstitution] = useState('');
    const [permissionOptions, setPermissionOptions] = useState([]);
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.get(`http://localhost:3000/users`)
            .then(response => {
                setExistingEmails(response.data.map(user => user.email));
            })
            .catch(error => {
                console.error('Erro ao buscar os usuários:', error);
            });

        axiosInstance.get(`http://localhost:3000/users/${_id}`)
            .then(response => {
                const { name, password, email, phone, institution, permission } = response.data;
                setName(name);
                setPassword(password);
                setPhone(phone);
                setEmail(email);
                setOriginalEmail(email);
                setInstitution(institution);
                setSelectedPermissions(permission);
            })
            .catch(error => {
                console.error('Erro ao buscar dados do usuário:', error);
            });

        axiosInstance.get(`http://localhost:3000/permission`)
            .then(response => {
                setPermissionOptions(response.data.map(permit => permit.name));
            })
            .catch(error => {
                console.error('Erro ao buscar opções de permissão:', error);
            });
    }, [_id]);

    const emailVerify = (existingEmails, currentEmail, originalEmail) => {
        return existingEmails.includes(currentEmail) && currentEmail !== originalEmail;
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
        if (!email || email.trim() === '' || emailVerify(existingEmails, email, originalEmail)) {
            newErrors.email = 'E-mail é obrigatório ou já existe';
        }

        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await axiosInstance.put(`http://localhost:3000/users/${_id}`, {
                    name,
                    password,
                    email,
                    phone,
                    institution,
                    permission: selectedPermissions,
                });

                console.log('User updated successfully:', response.data);
                navigate('/user');
            } catch (error) {
                console.error('Error updating user:', error);
            }
        } else {
            setErrors(newErrors);
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
                                <Label for="Name">Name*</Label>
                                <Input
                                    id="Name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    invalid={!!errors.name}
                                />
                                {errors.name && <span className="text-danger">{errors.name}</span>}
                            </FormGroup>
                            <FormGroup>
                                <Label for="Email">Email*</Label>
                                <Input
                                    id="Email"
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    invalid={!!errors.email}
                                />
                                {errors.email && <span className="text-danger">{errors.email}</span>}
                            </FormGroup>
                            <FormGroup>
                                <Label for="Password">Password**</Label>
                                <Input
                                    id="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    invalid={!!errors.password}
                                />
                                {errors.password && <span className="text-danger">{errors.password}</span>}
                            </FormGroup>
                            <FormGroup>
                                <Label for="Phone">Phone*</Label>
                                <Input
                                    id="Phone"
                                    type="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    invalid={!!errors.phone}
                                />
                                {errors.phone && <span className="text-danger">{errors.phone}</span>}
                            </FormGroup>
                            <FormGroup>
                                <Label for="Institution">Institution*</Label>
                                <Input
                                    id="Institution"
                                    type="text"
                                    value={institution}
                                    onChange={(e) => setInstitution(e.target.value)}
                                    invalid={!!errors.institution}
                                />
                                {errors.institution && <span className="text-danger">{errors.institution}</span>}
                            </FormGroup>
                            <FormGroup>
                                <Label for="Permission">Permission*</Label>
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

export default UserEdit;
