
import { useEffect, useState } from 'react';
import { Container, Loader } from '@mantine/core';
import Constants from './Constants';
import { getLeagueData } from './sleeperService';

const MainContent = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
      const fetchLeagueData = async () => {
        const league1 = Constants.tierIds.tier2;
        const res = await getLeagueData(league1);
        setData(res);
      };
      fetchLeagueData();
    }, []);

    return (
        <Container size="responsive">
            {
              data ? (
                  <pre>{JSON.stringify(data, null, 2)}</pre>
              ) : (
                <Loader color="white" />
              )
            }
        </Container>
    )
};

export default MainContent;