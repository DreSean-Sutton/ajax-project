import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Loading from './loading';
import FetchDataFail from './fetch-data-fail';
import { fetchDetailsData } from '../lib/fetch-details-data';

interface ThrowsDataProps {
  currentFighter: string | undefined
}

export default function ThrowsData(props: ThrowsDataProps) {
  const [throws, setThrows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchFailed, setFetchFailed] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchDetailsData(props.currentFighter, 'throws').then(res => {
      if (res.status === 200) {
        setThrows(res.data);
      } else {
        setFetchFailed(true);
      }
      setIsLoading(false);
    });
  }, [props.currentFighter]);

  function checkNull(data:any) {
    return data === null
      ? '--'
      : data;
  }

  if (isLoading) {
    return (
      <Loading />
    );
  }
  if (fetchFailed) {
    return (
      <FetchDataFail data={'Grabs/Throws'} />
    );
  } else {
    const renderThrows = (grapple: any) => {
      return (
        <React.Fragment key={grapple.throwId}>
          <Col className='p-3'>
            <Card className='p-2 bg-light text-dark typical-box-shadow text-capitalize'>
              <Card.Title className='text-center fw-bold'>{grapple.name}</Card.Title>
              <p className='mb-0 pt-1 border-top'>Damage: {checkNull(grapple.damage)}</p>
              <p className='mb-0 pt-1 border-top'>Active Frames: {grapple.activeFrames}</p>
              <p className='mb-0 pt-1 border-top'>Total Frames: {grapple.totalFrames}</p>
            </Card>
          </Col>
        </React.Fragment>
      );
    }
    const allThrows = throws.map(renderThrows);
    return(
      <>
        { allThrows }
      </>
    )
  }
}
