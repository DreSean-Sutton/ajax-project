import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import MovesData from '../components/moves-data';
import ThrowsData from '../components/throws-data';
import MovementData from '../components/movement-data';
import StatsData from '../components/stats-data';

export default function FighterDetails(props) {

  return (
    <Container className='bg-transparent fighter-details'>
      <Row className='justify-content-center'>
        <Col xs={6} className='fighter-details-img bg-light w-50 typical-box-shadow rounded' style={{ zIndex: '0' }}>
          <Image rounded={true} src='./images/smash-ultimate-sprites/inkling.png'></Image>
        </Col>
      </Row>
      <Col xs={6} md={4} className='m-auto typical-box-shadow'>
        <h2 className='text-center fs-2 mt-3 mb-3 p-2 bg-warning text-dark rounded'>Moves</h2>
      </Col>
      <Row xs={1} md={2} xl={3} className='frame-data-backdrop rounded justify-content-center typical-box-shadow p-1'>
        <MovesData id={props.id} />
      </Row>
      <Col xs={6} md={4} className='m-auto typical-box-shadow'>
        <h2 className='text-center fs-2 mt-3 mb-3 p-2 bg-warning text-dark rounded'>Throws</h2>
      </Col>
      <Row xs={1} md={2} xl={3} className='frame-data-backdrop rounded justify-content-center p-1'>
        <ThrowsData id={props.id} />
      </Row>
      <Col xs={6} md={4} className='m-auto typical-box-shadow'>
        <h2 className='text-center fs-2 mt-3 mb-3 p-2 bg-warning text-dark rounded'>Movements</h2>
      </Col>
      <Row xs={1} md={2} xl={3} className='frame-data-backdrop rounded justify-content-center p-1'>
        <MovementData id={props.id} />
      </Row>
      <Col xs={6} md={4} className='m-auto typical-box-shadow'>
        <h2 className='text-center fs-2 mt-3 mb-3 p-2 bg-warning text-dark rounded'>Stats</h2>
      </Col>
      <Row xs={2} xl={3} className='frame-data-backdrop rounded justify-content-center p-1'>
        <StatsData id={props.id} />
      </Row>
    </Container>
  );
}
