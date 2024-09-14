import { useState } from 'react';
import { 
  ActionIcon,
  Button, 
  ThemeIcon,
  Stack,
  Group,
  Code,
  useMantineColorScheme,
  Menu
} from '@mantine/core';
import { IconPhoto } from '@tabler/icons-react';
import {
  IconFileAnalytics,
  IconCrown
} from '@tabler/icons-react';
import classes from './styles/navbar.module.css';
import useAppContext from './useAppContext';

const data = [
  { id: 0, label: 'Premier Cup', icon: IconCrown },
  { id: 1, label: 'Championship', icon: IconFileAnalytics },
  { id: 2, label: 'League 1', icon: IconFileAnalytics },
  { id: 3, label: 'All', icon: IconFileAnalytics },
];

const NavBar = () => {
  const {
    state: { isMobile, leagueIndex }, 
    dispatch
  } = useAppContext();
  const [active, setActive] = useState('Premier Cup');
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const handleOnClick = () => {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  }

  const links = data.map((item) => (

    <Button
      variant='transparent'
      fullWidth={true}
      data-active={item.label === active || undefined}
      key={item.label}
      justify='flex-start'
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        dispatch({type: 'set_league', payload: item.id});
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Button>

  ));

  const desktopMenu = 
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Stack
          gap="24px"
          justify='center'
          align='start'
        >
          {links}
        </Stack>

      </div>

      <Group
        className={classes.header}
        justify="space-between"
      >
        <ActionIcon
          color="white"
          radius="sm"
          justify="center"
          onClick={
            () => handleOnClick()
          }
        >
          <ThemeIcon
            variant="default"
            radius="sm"
            size="md"
          >
            <IconPhoto style={{ width: '100%', height: '100%' }} />
          </ThemeIcon>
        </ActionIcon >
        <Code fw={700}>v0.0.1</Code>
      </Group>

    </nav>;

  const mobileMenu = 
  <Menu shadow="md" width={320}>
    <Menu.Target>
      <Button>Menu</Button>
    </Menu.Target>
    <Menu.Divider />
    <Menu.Dropdown>
      <Menu.Label>League of Leagues</Menu.Label>
        {
          data.map((item) => (
            <Menu.Item
              key={item.label}
              leftSection={<item.icon className={classes.linkIcon} stroke={1.5} />}
            >
              {item.label}
            </Menu.Item>
          ))
        }
        <Menu.Item
          className={classes.header}
          justify="space-between"
        >
          <ActionIcon
            color="white"
            radius="sm"
            justify="center"
            onClick={
              () => handleOnClick()
            }
          >
            <ThemeIcon
              variant="default"
              radius="sm"
              size="md"
            >
              <IconPhoto style={{ width: '100%', height: '100%' }} />
            </ThemeIcon>
          </ActionIcon >
          <Code fw={700}>v0.0.1</Code>
        </Menu.Item>
    </Menu.Dropdown>
  </Menu>
  ;

  return (
    <>
      {isMobile ? mobileMenu : desktopMenu}
    </>
  );
}

export default NavBar;