import { useState, useEffect } from 'react';
import { Row, Col, Table, Card, CardTitle, CardBody, Button } from 'reactstrap';
import axiosInstance from '../auth/AxiosConfig';
import { NavLink } from 'react-router-dom';
import * as Icon from "react-feather";

const Medicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [canView, setCanView] = useState(false);
  const [canAdd, setCanAdd] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);

  useEffect(() => {
    fetchPermissions();
  }, []);

  useEffect(() => {
    if (canView) {
      fetchMedicines();
    }
  }, [canView]);

  const fetchMedicines = () => {
    axiosInstance.get("http://localhost:3000/medicines")
      .then(response => {
        setMedicines(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar os dados:', error);
      });
  };

  const fetchPermissions = () => {
    axiosInstance.get("http://localhost:3000/permission")
      .then(response => {
        const { user } = response.data;
        if (user && user.roles) {
          checkPermissions(user.roles);
        } else {
          console.error('Roles do usuário não estão definidas');
        }
      })
      .catch(error => {
        console.error('Erro ao buscar os dados:', error);
      });
  };

  const checkPermissions = (roles) => {
    const hasCanView = roles.includes('R100017');
    const hasCanAdd = roles.includes('R100018');
    const hasCanEdit = roles.includes('R100019');
    const hasCanDelete = roles.includes('R100020');

    setCanView(hasCanView);
    setCanAdd(hasCanAdd);
    setCanEdit(hasCanEdit);
    setCanDelete(hasCanDelete);
  };

  const handleDeleteMedicine = (_id) => {
    axiosInstance.delete(`http://localhost:3000/medicines/${_id}`)
      .then(() => {
        console.log(`Medicamento excluído com sucesso`);
        fetchMedicines();
      })
      .catch(error => {
        console.error('Erro ao excluir medicamento:', error);
      });
  };

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h4" className="border-bottom p-3 mb-0">
            Tabela de Medicamentos
          </CardTitle>
          <CardBody className="">
            {canAdd && (
              <NavLink to="/medicines/create" className="btn btn-success btn-sm ml-3 mb-3">
                Adicionar
              </NavLink>
            )}
            {canView ? (
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Tipo</th>
                    <th>Dosagem</th>
                    <th>Tipo de Dosagem</th>
                    <th>Apresentação</th>
                    <th>Fonte</th>
                    {(canEdit || canDelete) && <th>Ações</th>}
                  </tr>
                </thead>
                <tbody>
                  {medicines.map((medicine, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{medicine.code}</td>
                      <td>{medicine.name}</td>
                      <td>{medicine.type}</td>
                      <td>{medicine.dosage}</td>
                      <td>{medicine.dosage_type}</td>
                      <td>{medicine.presentation}</td>
                      <td>{medicine.source}</td>
                      {(canEdit || canDelete) && (
                        <td>
                          {canEdit && (
                            <NavLink to={`/medicines/edit/${medicine._id}`} className="btn btn-primary btn-sm mr-2">
                              <Icon.Edit />
                            </NavLink>
                          )}
                          {canDelete && (
                            <Button color="danger" size="sm" onClick={() => handleDeleteMedicine(medicine._id)}>
                              <Icon.Trash />
                            </Button>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>Você não tem permissão para visualizar esta tabela.</p>
            )}
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Medicines;
