import { useState, useEffect } from 'react';
import { Row, Col, Table, Card, CardTitle, CardBody, Button } from 'reactstrap';
import axiosInstance from '../auth/AxiosConfig';
import { NavLink } from 'react-router-dom';
import * as Icon from "react-feather";

const Institutions = () => {
  const [institutions, setInstitutions] = useState([]);
  const [units, setUnits] = useState({});
  const [canView, setCanView] = useState(false);
  const [canAdd, setCanAdd] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [userInstitution, setUserInstitution] = useState(null);
  const [userHasViewOneRole, setUserHasViewOneRole] = useState(false);

  useEffect(() => {
    fetchPermissions();
    fetchUnits();
  }, []);

  useEffect(() => {
    if (canView || userHasViewOneRole) {
      fetchInstitutions();
    }
  }, [canView, userHasViewOneRole]);

  const fetchInstitutions = () => {
    axiosInstance.get("http://localhost:3000/institutions")
      .then(response => {
        let institutionsData = response.data;
        if (userHasViewOneRole && userInstitution) {
          institutionsData = institutionsData.filter(institution => institution.name === userInstitution);
        }
        setInstitutions(institutionsData);
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
          setUserInstitution(user.institution);
          checkPermissions(user.roles);
        } else {
          console.error('Roles do usuário não estão definidas');
        }
      })
      .catch(error => {
        console.error('Erro ao buscar os dados:', error);
      });
  };

  const fetchUnits = () => {
    axiosInstance.get("http://localhost:3000/units")
      .then(response => {
        const unitsData = response.data.reduce((acc, unit) => {
          acc[unit.code] = unit.name;
          return acc;
        }, {});
        setUnits(unitsData);
      })
      .catch(error => {
        console.error('Erro ao buscar os dados das unidades:', error);
      });
  };

  const checkPermissions = (roles) => {
    const hasCanView = roles.includes('R100012');
    const hasCanViewOne = roles.includes('R100013');
    const hasCanAdd = roles.includes('R100014');
    const hasCanEdit = roles.includes('R100015');
    const hasCanDelete = roles.includes('R100016');

    setCanView(hasCanView);
    setUserHasViewOneRole(hasCanViewOne);
    setCanAdd(hasCanAdd);
    setCanEdit(hasCanEdit);
    setCanDelete(hasCanDelete);
  };

  const handleDeletePermission = (_id) => {
    axiosInstance.delete(`http://localhost:3000/institutions/${_id}`)
      .then(() => {
        console.log(`Permissão ${_id} excluída com sucesso`);
        fetchInstitutions();
      })
      .catch(error => {
        console.error('Erro ao excluir permissão:', error);
      });
  };

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h4" className="border-bottom p-3 mb-0">
            Tabela de Instituições
          </CardTitle>
          <CardBody className="">
            {canAdd && (
              <NavLink to="/institution/create" className="btn btn-success btn-sm ml-3 mb-3">
                Adicionar
              </NavLink>
            )}
            {(canView || userHasViewOneRole) ? (
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Telefone</th>
                    <th>Endereço - 1</th>
                    <th>Endereço - 2</th>
                    <th>CEP</th>
                    <th>Cidade</th>
                    <th>Tipo</th>
                    {(canEdit || canDelete) && <th>Ações</th>}
                  </tr>
                </thead>
                <tbody>
                  {institutions.map((institution, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{institution.code}</td>
                      <td>{institution.name}</td>
                      <td>{institution.phone}</td>
                      <td>{institution.address.address_line_1}</td>
                      <td>{institution.address.address_line_2}</td>
                      <td>{institution.address.postal_code}</td>
                      <td>{units[institution.unit]}</td>
                      <td>{institution.type.join(' ')}</td>
                      {(canEdit || canDelete) && (
                        <td>
                          {canEdit && (
                            <NavLink to={`/institution/edit/${institution._id}`} className="btn btn-primary btn-sm mr-2">
                              <Icon.Edit />
                            </NavLink>
                          )}
                          {canDelete && (
                            <Button color="danger" size="sm" onClick={() => handleDeletePermission(institution._id)}>
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

export default Institutions;
