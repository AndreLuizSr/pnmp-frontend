
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
    FormFeedback,
} from 'reactstrap';
import axiosInstance from '../auth/AxiosConfig';

const InstitutionCreate = () => {
    const [institution, setInstitution] = useState([]);
    const [units, setUnits] = useState('');
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [unit, setUnit] = useState('');
    const [type, setType] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.get(`http://localhost:3000/units`)
            .then(response => {
                setUnits(response.data.map(unit => unit.code));
            })
            .catch(error => {
                console.error('Error:', error);
            });
        axiosInstance.get(`http://localhost:3000/institutions`)
            .then(response => {
                setInstitution(response.data.map(inst => inst.code));
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    const handleTypeChange = (option) => {
        if (type.includes(option)) {
            setType(type.filter(item => item !== option));
        } else {
            setType([...type, option]);
        }
    };

    const institutionVerify = (existingCode, currentCode) => {
        return existingCode.includes(currentCode);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newErrors = {};
        if (!code.trim()) {
            newErrors.code = 'Code is required';
        }
        if (!name.trim()) {
            newErrors.name = 'Name is required';
        }
        if (!unit.trim()) {
            newErrors.unit = 'Unit is required';
        }
        if (type.length === 0) {
            newErrors.type = 'Type is required';
        }
        if (institutionVerify(institution, code)) {
            newErrors.code = 'Code already exists';
        }
        if (!units.includes(unit)) {
            newErrors.unit = 'Unit does not exist';
        }
        if (Object.keys(newErrors).length === 0) {
            try {
                axiosInstance.post(`http://localhost:3000/institutions`, {
                    code,
                    name,
                    phone,
                    address: {
                        address_line_1: addressLine1,
                        address_line_2: addressLine2,
                        postal_code: postalCode
                    },
                    unit,
                    type,
                })
                    .then(response => {
                        console.log('Institution created successfully:', response.data);
                        navigate('/institution');
                    })
                    .catch(error => {
                        console.error('Error creating institution:', error);
                    });
            } catch (error) {
                console.error('Error creating institution:', error);
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
                        Institution
                    </CardTitle>
                    <CardBody>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="Code">Code*</Label>
                                <Input
                                    id="Code"
                                    name="code"
                                    type="text"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    invalid={!!errors.code}
                                />
                                {errors.code && <FormFeedback>{errors.code}</FormFeedback>}
                            </FormGroup>
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
                                <Label for="Phone">Phone</Label>
                                <Input
                                    id="Phone"
                                    name="phone"
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    invalid={!!errors.phone}
                                />
                                {errors.phone && <FormFeedback>{errors.phone}</FormFeedback>}
                            </FormGroup>
                            <FormGroup>
                                <Label for="AddressLine1">Address 1</Label>
                                <Input
                                    id="AddressLine1"
                                    name="addressLine1"
                                    type="text"
                                    value={addressLine1}
                                    onChange={(e) => setAddressLine1(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="AddressLine2">Address 2</Label>
                                <Input
                                    id="AddressLine2"
                                    name="addressLine2"
                                    type="text"
                                    value={addressLine2}
                                    onChange={(e) => setAddressLine2(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="PostalCode">Postal Code</Label>
                                <Input
                                    id="PostalCode"
                                    name="postalCode"
                                    type="text"
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="Unit">Unit*</Label>
                                <Input
                                    id="Unit"
                                    name="unit"
                                    type="text"
                                    value={unit}
                                    onChange={(e) => setUnit(e.target.value)}
                                    invalid={!!errors.unit}
                                />
                                {errors.unit && <FormFeedback>{errors.unit}</FormFeedback>}
                            </FormGroup>
                            <FormGroup tag="fieldset">
                                <legend>Types*</legend>
                                {['Notification', 'Treatment', 'Medicine Store'].map((option, index) => (
                                    <FormGroup check key={index}>
                                        <Input
                                            id={option}
                                            name={option}
                                            type="checkbox"
                                            checked={type.includes(option)}
                                            onChange={() => handleTypeChange(option)}
                                        />
                                        <Label for={option} check>{option}</Label>
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

export default InstitutionCreate;
