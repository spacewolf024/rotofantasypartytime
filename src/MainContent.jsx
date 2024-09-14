
import { useEffect, useState } from 'react';
import { Avatar, Container, Loader, Alert, Flex } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import useAppContext from './useAppContext';
import Constants from './Constants';
import { getLeagueData } from './sleeperService';
import { Table } from '@mantine/core';
import './TableStyle.css';

const MainContent = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);
    const {
      state: { leagueIndex, isMobile }
    } = useAppContext();

  useEffect(() => {
    const fetchLeagueData = async () => {
      try {
        const league = Constants.tierIds[leagueIndex];
        const res = await getLeagueData(league);
        setData(res);
      } catch (error) {
        console.log(error)
        setError(true);
      }
    };

    fetchLeagueData();
  }, [leagueIndex, error]);

  const icon = <IconInfoCircle />;

  const desktopRows = data && data.map((element, index) => (
    <Table.Tr key={element.user_id}> {/* Use a unique key, like element.id */}
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
  ));

  const mobileRows = data && data.map((element, index) => (
    <Table.Tr key={element.user_id}> {/* Use a unique key, like element.id */}
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td><strong>{element.metadata.team_name || `Team ${element.display_name || 'Unknown'}`}</strong><br />{element.display_name}<br />{element.record.wins}-{element.record.ties}-{element.record.losses}</Table.Td>
      <Table.Td>{element.record.fpts}.{element.record.fpts_decimal}</Table.Td>
      <Table.Td>{element.record.fpts_against}.{element.record.fpts_against_decimal}</Table.Td>
      <Table.Td>{element.streak.streak}</Table.Td>
      <Table.Td>{100 - element.record.waiver_budget_used || 0}</Table.Td>
    </Table.Tr>
  ));

  const mobileTable = (
     <Table className="table-left-align" striped={true}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Rank</Table.Th>
          <Table.Th>Team</Table.Th>
          <Table.Th>PF</Table.Th>
          <Table.Th>PA</Table.Th>
          <Table.Th>Streak</Table.Th>
          <Table.Th>Budget Remaining</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{mobileRows}</Table.Tbody>
    </Table>
  );

  const desktopTable = (
    <Table className="table-left-align" striped={true}>
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
  );

  return (
    <Container
      size="xl"
    >
      {
        !data &&
        <Flex
          gap="md"
          justify="center"
          align="center"
        >
          <Loader color="grape" type={'dots'} />
        </Flex>

      }

      {
        error && 
        <Alert variant="light" color="violet" title="Error" icon={icon}>
          Problem retrieving data. Your team sucks anyways.
        </Alert>
      }

      {(isMobile && data) && mobileTable}
      {(!isMobile && data) && desktopTable}

    </Container>
  )
};

export default MainContent;