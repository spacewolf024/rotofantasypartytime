import React, { useEffect, useState } from 'react';
import { 
  Avatar, 
  Container, 
  Loader, 
  Alert, 
  Flex,
  Table
} from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import useAppContext from './useAppContext';
import Constants from './Constants';
import { getLeagueData, getAllLeaguesData } from './sleeperService';
import './TableStyle.css';

const MainContent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const { state: { leagueIndex, isMobile } } = useAppContext();

  useEffect(() => {
    if (leagueIndex === 3) {
      const fetchAllLeaguesData = async () => {
        try {
          const res = await getAllLeaguesData();
          setData(res);
          setError(false);
        } catch (error) {
          console.log(error);
          setError(true);
          setData(null);
        }
      };

      fetchAllLeaguesData();

    } else {

      const fetchLeagueData = async () => {
        try {
          const league = Constants.tierIds[leagueIndex];
          const res = await getLeagueData(league);
          setData([{ leagueId: league, data: res }]);
          setError(false);
        } catch (error) {
          console.log(error);
          setError(true);
          setData(null);
        }
      };

      fetchLeagueData();
    }
  }, [leagueIndex]);


  const desktopRows = data && Array.isArray(data) ?
      
      data.map((league) => 
      {
        return (
          <React.Fragment key={league.leagueId}>
            {
              league.data.map((element, index) => {
                return (
                  <Table.Tr key={element.user_id}> 
                    <Table.Td>{index + 1}</Table.Td>
                    <Table.Td>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar src={element.pfp} />
                        <strong>{element.metadata.team_name || `Team ${element.display_name || 'Unknown'}`}</strong>
                      </div>
                    </Table.Td>
                    <Table.Td>{element.display_name}</Table.Td>
                    <Table.Td>{element.record.wins}-{element.record.ties}-{element.record.losses}</Table.Td>
                    <Table.Td>{element.record.fpts}.{element.record.fpts_decimal}</Table.Td>
                    <Table.Td>{element.record.fpts_against}.{element.record.fpts_against_decimal}</Table.Td>
                    <Table.Td>{element.streak.streak}</Table.Td>
                    <Table.Td>{100 - element.record.waiver_budget_used || 0}</Table.Td>
                  </Table.Tr>
                )
              })
            }

          </React.Fragment>
        )
      })
  : 
  null;
      
    
  

const mobileRows = data && data.map((league) => 
  {
    return (
      <React.Fragment key={league.leagueId}>
        {
          league.data.map((element, index) => {
            return (
              <Table.Tr key={element.user_id}> 
                <Table.Td>{index + 1}</Table.Td>
                <Table.Td><strong>{element.metadata.team_name || `Team ${element.display_name || 'Unknown'}`}</strong><br />{element.display_name}<br />{element.record.wins}-{element.record.ties}-{element.record.losses}</Table.Td>
                <Table.Td>{element.record.fpts}.{element.record.fpts_decimal}</Table.Td>
                <Table.Td>{element.record.fpts_against}.{element.record.fpts_against_decimal}</Table.Td>
                <Table.Td>{element.streak.streak}</Table.Td>
                <Table.Td>{100 - element.record.waiver_budget_used || 0}</Table.Td>
              </Table.Tr>
                            )
          })
        }

      </React.Fragment>
    )
})

  return (
    <Container>
      {error && (
        <Alert variant="light" color="violet" title="Error" icon={IconInfoCircle}>
          Problem retrieving data. Please try again later.
        </Alert>
      )}
      {!data && !error && (
        <Flex gap="md" justify="center" align="center">
          <Loader color="grape" type={'dots'} />
        </Flex>
      )}
      
      {(isMobile && data && !error) ? (
        <Table className="table-left-align">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Rank</Table.Th>
              <Table.Th>Team</Table.Th>
              <Table.Th>PF</Table.Th>
              <Table.Th>PA</Table.Th>
              <Table.Th>Streak</Table.Th>
              <Table.Th>Budget</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{mobileRows}</Table.Tbody>
        </Table>
      ) : (
        <Table className="table-left-align">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Rank</Table.Th>
              <Table.Th>Team</Table.Th>
              <Table.Th>Manager</Table.Th>
              <Table.Th>Record</Table.Th>
              <Table.Th>PF</Table.Th>
              <Table.Th>PA</Table.Th>
              <Table.Th>Streak</Table.Th>
              <Table.Th>Budget Remaining</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{desktopRows}</Table.Tbody>
        </Table>
      )}

    </Container>
  )
};

export default MainContent;