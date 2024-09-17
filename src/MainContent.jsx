import { useEffect, useState } from "react";
import {
  Avatar,
  Container,
  Loader,
  Alert,
  Flex,
  Table,
  Group,
  Button,
  Popover,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import useAppContext from "./Hooks/useAppContext";
import Constants from "./Utilities/Constants";
import { getLeagueData, getAllLeaguesData } from "./Utilities/sleeperService";
import classes from "./Styles/tableStyle.module.scss";

const MainContent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [opened, setOpened] = useState(false);
  const {
    state: { leagueIndex, isMobile },
  } = useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (leagueIndex === 3) {
          const res = await getAllLeaguesData();
          setData(res);
        } else {
          const league = Constants.tierIds[leagueIndex];
          const res = await getLeagueData(league);
          setData([{ leagueId: league, data: res }]);
        }
        setError(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setData(null);
      }
    };
    fetchData();
  }, [leagueIndex]);

  const relegatedOrPromoted = (league, index) => {
    let className = "";
    if (index + 1 > league.data.length - 3) {
      className = "relegated";
    } else if (index <= 2) {
      className = "promoted";
    }
    return className;
  };

  const leagueNames ={
        '1113479147663273984': 'Premier Cup',
        '1113479200771629056': 'Championship',
        '1113842218692878336': 'League 1'
    };

  const renderRows = (league) => {

    return league.data.map((element, index) => (
      <Table.Tr
        key={element.user_id}
        className={`${classes[relegatedOrPromoted(league, index)]} 
        ${classes["row" + element.owner_id]}`}
      >
        <Table.Td>{index + 1}</Table.Td>
        <Table.Td>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar className={classes.avatar} src={element.pfp} />
            <strong>
              {element.metadata.team_name ||
                `Team ${element.display_name || "Unknown"}`}
            </strong>
          </div>
        </Table.Td>
        <Table.Td>@{element.display_name}</Table.Td>
        <Table.Td>
          {element.record.wins}-{element.record.ties}-{element.record.losses}
        </Table.Td>
        <Table.Td>
          {element.record.fpts}.{element.record.fpts_decimal}
        </Table.Td>
        <Table.Td>
          {element.record.fpts_against}.{element.record.fpts_against_decimal}
        </Table.Td>
        <Table.Td>{element.streak.streak}</Table.Td>
        <Table.Td>{100 - element.record.waiver_budget_used || 0}</Table.Td>
      </Table.Tr>
    ));
  };

  const renderMobileRows = (league) => {
    return league.data.map((element, index) => (
      <Table.Tr
        key={element.user_id}
        className={`${classes[relegatedOrPromoted(league, index)]} 
        ${classes["row" + element.owner_id]}`}
      >
        <Table.Td>
          <Popover position="bottom" withArrow shadow="md">
            <Popover.Target>
              <div className={classes.teamContainer}>
                <Avatar className={classes.avatar} src={element.pfp} />
                {element.metadata.team_name || `${element.display_name}`}
              </div>
            </Popover.Target>
            <Popover.Dropdown>
              {element.metadata.team_name ||
                `Team ${element.display_name || "Unknown"}`}
              <br />@{element.display_name}
            </Popover.Dropdown>
          </Popover>
        </Table.Td>
        <Table.Td>
          {element.record.wins}-{element.record.ties}-{element.record.losses}
        </Table.Td>
        <Table.Td>
          {element.record.fpts}.{element.record.fpts_decimal}
        </Table.Td>
        <Table.Td>
          {element.record.fpts_against}.{element.record.fpts_against_decimal}
        </Table.Td>
        <Table.Td>{element.streak.streak}</Table.Td>
        <Table.Td>{100 - element.record.waiver_budget_used || 0}</Table.Td>
      </Table.Tr>
    ));
  };

  const renderTable = (isMobile, league, index) => {
    return (
      <div
        className={`${classes.tableContainer} ${
          classes["tableContainer" + leagueIndex]
        }`}
      >
        {!isMobile && (
          <div className={`${classes.tableId} ${classes["tableId" + index]}`}>
            {leagueNames[league.leagueId]}
          </div>
        )}
        <Table
          stickyHeader
          stickyHeaderOffset={0}
          withTableBorder
          striped
          key={league.leagueId}
        >
          <Table.Thead>
            <Table.Tr>
              {isMobile ? (
                <>
                  <Table.Th>Team</Table.Th>
                  <Table.Th>Record</Table.Th>
                  <Table.Th>PF</Table.Th>
                  <Table.Th>PA</Table.Th>
                  <Table.Th>Streak</Table.Th>
                  <Table.Th>Budget</Table.Th>
                </>
              ) : (
                <>
                  <Table.Th>Rank</Table.Th>
                  <Table.Th>Team</Table.Th>
                  <Table.Th>Manager</Table.Th>
                  <Table.Th>Record</Table.Th>
                  <Table.Th>PF</Table.Th>
                  <Table.Th>PA</Table.Th>
                  <Table.Th>Streak</Table.Th>
                  <Table.Th>Budget Remaining</Table.Th>
                </>
              )}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {isMobile ? renderMobileRows(league) : renderRows(league)}
          </Table.Tbody>
        </Table>
      </div>
    );
  };

  return (
    <Container>
      {error && (
        <Alert
          variant="light"
          color="violet"
          title="Error"
          icon={IconInfoCircle}
        >
          Problem retrieving data. Your team sucks anyways.
        </Alert>
      )}

      {!data && !error && (
        <Flex gap="md" justify="center" align="center">
          <Loader color="grape" type="dots" />
        </Flex>
      )}

      {data && !error && (
        <>{data.map((league, index) => renderTable(isMobile, league, index))}</>
      )}
    </Container>
  );
};

export default MainContent;
