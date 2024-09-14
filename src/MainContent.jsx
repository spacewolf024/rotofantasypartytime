import { useEffect, useState } from 'react';
import { Avatar, Container, Loader, Alert, Flex, Text } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import useAppContext from './useAppContext';
import Constants from './Constants';
import { getLeagueData, getAllLeaguesData } from './sleeperService';
import { Table } from '@mantine/core';
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

  const icon = <IconInfoCircle />;

  const renderRows = (leagueData) => {
    return leagueData.map((element, index) => (
      <Table.Tr key={element.user_id}> {/* Use a unique key */}
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
  };

  const mobileTable = (leagueData) => (
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
      <Table.Tbody>{renderRows(leagueData)}</Table.Tbody>
    </Table>
  );

  const desktopTable = (leagueData) => (
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
      <Table.Tbody>{renderRows(leagueData)}</Table.Tbody>
    </Table>
  );

  const displayLeagueTables = () => {
    if (data && Array.isArray(data)) {
      return data.map((league) => (
        <div key={league.leagueId}>
          {isMobile ? mobileTable(league.data) : desktopTable(league.data)}
        </div>
      ));
    }
    return null;
  };

  return (
    <Container size="xl">
      {error && (
        <Alert variant="light" color="violet" title="Error" icon={icon}>
          Problem retrieving data. Please try again later.
        </Alert>
      )}
      {!data && !error && (
        <Flex gap="md" justify="center" align="center">
          <Loader color="grape" type={'dots'} />
        </Flex>
      )}
      {displayLeagueTables()}
    </Container>
  );
};

export default MainContent;
