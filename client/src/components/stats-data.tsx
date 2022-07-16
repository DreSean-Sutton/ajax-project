import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Loading from './loading';
import FetchDataFail from './fetch-data-fail';
import axios from 'axios';

interface StatsDataProps {
  currentFighter: string
}
export default function StatsData(props: StatsDataProps) {
  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchFailed, setFetchFailed] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      try {
        const res = await axios(`https://the-ultimate-api.herokuapp.com/api/fighters/data/stats?fighter=${props.currentFighter}`)
        if (res.status === 200) {
          setStats(res.data);
        } else {
          throw Error();
        }
      } catch (e) {
        setFetchFailed(true);
        console.error('fetch failed!', e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [props.currentFighter]);

  if (isLoading) {
    return (
      <Loading />
    );
  }
  if (fetchFailed) {
    return (
      <FetchDataFail data={'Stats'} />
    );
  } else {
    const renderStats = (stat: any) => {
      return (
        <React.Fragment key={stat.statId}>
          <Col className='p-3 text-center'>
            <Card className='p-2 bg-light text-dark typical-box-shadow text-capitalize'>
              <Card.Title className='fw-bold'>{stat.name}</Card.Title>
              <p className='mb-0 pt-1 border-top'>{stat.statValue}</p>
            </Card>
          </Col>
        </React.Fragment>
      );
    }
    const allStats = stats.map(renderStats);
    return (
      <>
        { allStats };
      </>
    )
  }
}
