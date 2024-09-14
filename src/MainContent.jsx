
import { useEffect, useState } from 'react';
import { Avatar, Container, Loader } from '@mantine/core';
import Constants from './Constants';
import { getLeagueData } from './sleeperService';
import { Table } from '@mantine/core';
import './TableStyle.css';

const MainContent = (props) => {
  const { isMobile } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchLeagueData = async () => {
      const league1 = Constants.tierIds.tier2;
      const res = await getLeagueData(league1);
      setData(res);
    };
    fetchLeagueData();
  }, []);

  if (!data) {
    return <Loader color="blue" />;
  }

  console.log(data)
  const rows = data.map((element) => (
    <Table.Tr key={element.user_id}> {/* Use a unique key, like element.id */}
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

  const mobileRows = data.map((element) => (
    <Table.Tr key={element.user_id}> {/* Use a unique key, like element.id */}
      <Table.Td><strong>{element.metadata.team_name || `Team ${element.display_name || 'Unknown'}`}</strong><br />{element.display_name}<br />{element.record.wins}-{element.record.ties}-{element.record.losses}</Table.Td>
      <Table.Td>{element.record.fpts}.{element.record.fpts_decimal}</Table.Td>
      <Table.Td>{element.record.fpts_against}.{element.record.fpts_against_decimal}</Table.Td>
      <Table.Td>{element.streak.streak}</Table.Td>
      <Table.Td>{100 - element.record.waiver_budget_used || 0}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Container>
      {!isMobile ? (
        <Table className="table-left-align">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Team</Table.Th>
              <Table.Th>PF</Table.Th>
              <Table.Th>PA</Table.Th>
              <Table.Th>Streak</Table.Th>
              <Table.Th>Budget Remaining</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{mobileRows}</Table.Tbody>
        </Table>
      ) : (
        <Table className="table-left-align">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Team</Table.Th>
              <Table.Th>Manager</Table.Th>
              <Table.Th>Record</Table.Th>
              <Table.Th>PF</Table.Th>
              <Table.Th>PA</Table.Th>
              <Table.Th>Streak</Table.Th>
              <Table.Th>Budget Remaining</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      )}

    </Container>
  )
};

export default MainContent;