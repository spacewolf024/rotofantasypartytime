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
import {
  IconFileAnalytics,
  IconCrown,
  IconTrash,
  IconBrightnessFilled,
  IconCrownOff
} from '@tabler/icons-react';
import classes from './styles/navbar.module.css';
import useAppContext from './useAppContext';

const data = [
  { id: 0, label: 'Premier Cup', icon: IconCrown },
  { id: 1, label: 'Championship', icon: IconCrownOff },
  { id: 2, label: 'League 1', icon: IconTrash },
  { id: 3, label: 'All', icon: IconFileAnalytics },
];

const NavBar = () => {
  const {
    state: { isMobile }, 
    dispatch
  } = useAppContext();
  const [active, setActive] = useState('Premier Cup');
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const handleOnClick = () => {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  }

  const links = data.map((item) => (

    <Button
      className={classes.navButton}
      styles={{
        root: {
          border: 0,
          color: '#fff',
          '--button-hover': '#fff',
          '--button-hover-color': 'var(--mantine-color-violet-filled)',
          '--button-bg': 'transparent'
        }
      }}
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
    <nav className={classes.desktopNav}>
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
            <IconBrightnessFilled style={{ width: '100%', height: '100%' }} />
          </ThemeIcon>
        </ActionIcon >
        <Code fw={700}>v0.0.1</Code>
      </Group>

    </nav>;

  const mobileMenu = 
  <Menu
    transitionProps={{ transition: 'pop', duration: 350 }} 
    shadow="md"
    width={275}

  >
    <Menu.Target>
      <Button
        styles={{
        root: { backgroundColor: 'var(--mantine-color-violet-filled)' },
        label: { color: '#fff' },
      }} 
      >Menu</Button>
    </Menu.Target>
    <Menu.Divider />
    <Menu.Dropdown>
      <Menu.Label>League of Leagues</Menu.Label>
        {
          data.map((item) => (
            <Menu.Item
              key={item.label}
              data-active={item.label === active || undefined}
              leftSection={<item.icon className={classes.linkIcon} stroke={1.5} />}
              onClick={(event) => {
                event.preventDefault();
                setActive(item.label);
                dispatch({ type: 'set_league', payload: item.id });
              }}
            >
              {item.label}
            </Menu.Item>
          ))
        }

        <Menu.Divider />

        <Menu.Item
          className={classes.header}
          justify="space-between"
        >
          <Group>
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
                <IconBrightnessFilled style={{ width: '100%', height: '100%' }} />
              </ThemeIcon>
            </ActionIcon >
            <Code fw={700}>v0.0.1</Code>
          </Group>
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