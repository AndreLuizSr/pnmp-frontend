import { useState, useEffect } from 'react';
import { Row, Col, Table, Card, CardTitle, CardBody, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import axiosInstance from '../auth/AxiosConfig';
import * as Icon from "react-feather";
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';

const UnitsStates = () => {
    const [units, setUnits] = useState([]);

    useEffect(() => {
        fetchUnits();
    }, []);

    const fetchUnits = () => {
        axiosInstance.get("http://localhost:3000/units")
            .then(response => {
                const stateUnits = response.data.filter(unit => unit.type === "Estado");
                setUnits(stateUnits);
            })
            .catch(error => {
                console.error('Erro ao buscar os dados:', error);
            });
    };

    const handleDeleteUser = (unit) => {
        axiosInstance.delete(`http://localhost:3000/units/${unit._id}`)
            .then(() => {
                console.log(`Unidade ${unit._id} excluída com sucesso`);
                fetchUnits();
            })
            .catch(error => {
                console.error('Erro ao excluir unidade:', error);
            });
    };

    return (
        <Row>
            <Col lg="12">
                <Card>
                    <CardTitle tag="h4" className="border-bottom p-3 mb-0">
                        Estados das Unidades Administrativas
                    </CardTitle>
                    <CardBody className="">
                        <BreadCrumbs />
                        <NavLink to="/units/create" className="btn btn-success btn-sm ml-3 mb-3">
                            Adicionar
                        </NavLink>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>nome</th>
                                    <th>Unidades</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {units.map((unit, index) => (
                                    <tr key={unit._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{unit.name}</td>
                                        <td>{unit.related_units.join(' ')}</td>
                                        <td>
                                            <NavLink to={`/units/edit/${unit._id}`} className="btn btn-primary btn-sm mr-">
                                                <Icon.Edit />
                                            </NavLink>
                                            <Button color="danger" size="sm" onClick={() => handleDeleteUser(unit)}>
                                                <Icon.Trash />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};
export default UnitsStates;

