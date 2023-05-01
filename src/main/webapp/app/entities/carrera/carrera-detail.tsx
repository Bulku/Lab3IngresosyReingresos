import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './carrera.reducer';

export const CarreraDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const carreraEntity = useAppSelector(state => state.carrera.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="carreraDetailsHeading">
          <Translate contentKey="arqui3RealApp.carrera.detail.title">Carrera</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="arqui3RealApp.carrera.id">Id</Translate>
            </span>
          </dt>
          <dd>{carreraEntity.id}</dd>
          <dt>
            <span id="nombre">
              <Translate contentKey="arqui3RealApp.carrera.nombre">Nombre</Translate>
            </span>
          </dt>
          <dd>{carreraEntity.nombre}</dd>
          <dt>
            <span id="modalidad">
              <Translate contentKey="arqui3RealApp.carrera.modalidad">Modalidad</Translate>
            </span>
          </dt>
          <dd>{carreraEntity.modalidad}</dd>
        </dl>
        <Button tag={Link} to="/carrera" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/carrera/${carreraEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CarreraDetail;
