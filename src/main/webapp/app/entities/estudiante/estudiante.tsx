import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IEstudiante } from 'app/shared/model/estudiante.model';
import { getEntities } from './estudiante.reducer';

export const Estudiante = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const estudianteList = useAppSelector(state => state.estudiante.entities);
  const loading = useAppSelector(state => state.estudiante.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="estudiante-heading" data-cy="EstudianteHeading">
        <Translate contentKey="arqui3RealApp.estudiante.home.title">Estudiantes</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="arqui3RealApp.estudiante.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/estudiante/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="arqui3RealApp.estudiante.home.createLabel">Create new Estudiante</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {estudianteList && estudianteList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="arqui3RealApp.estudiante.id">Id</Translate>
                </th>
                <th>
                  <Translate contentKey="arqui3RealApp.estudiante.nombre">Nombre</Translate>
                </th>
                <th>
                  <Translate contentKey="arqui3RealApp.estudiante.apellido">Apellido</Translate>
                </th>
                <th>
                  <Translate contentKey="arqui3RealApp.estudiante.fechaNacimiento">Fecha Nacimiento</Translate>
                </th>
                <th>
                  <Translate contentKey="arqui3RealApp.estudiante.correo">Correo</Translate>
                </th>
                <th>
                  <Translate contentKey="arqui3RealApp.estudiante.direccion">Direccion</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {estudianteList.map((estudiante, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/estudiante/${estudiante.id}`} color="link" size="sm">
                      {estudiante.id}
                    </Button>
                  </td>
                  <td>{estudiante.nombre}</td>
                  <td>{estudiante.apellido}</td>
                  <td>
                    {estudiante.fechaNacimiento ? (
                      <TextFormat type="date" value={estudiante.fechaNacimiento} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{estudiante.correo}</td>
                  <td>{estudiante.direccion}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/estudiante/${estudiante.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/estudiante/${estudiante.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/estudiante/${estudiante.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="arqui3RealApp.estudiante.home.notFound">No Estudiantes found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Estudiante;
