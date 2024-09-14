
import { useEffect, useState } from 'react';
import { Container, Loader } from '@mantine/core';
import useAppContext from './useAppContext';
import Constants from './Constants';
import { getLeagueData } from './sleeperService';

const MainContent = () => {
    const [data, setData] = useState(null);
    const {
      state: { leagueIndex }
    } = useAppContext();

      useEffect(() => {
        const fetchLeagueData = async () => {
          const league = Constants.tierIds[leagueIndex];
          const res = await getLeagueData(league);
          setData(res);
        };
        fetchLeagueData();
      }, [leagueIndex]);

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