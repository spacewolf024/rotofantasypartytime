import { useState } from 'react';
import {
  Group, 
  Code, 
  useMantineColorScheme
 } from '@mantine/core';
import { ActionIcon } from '@mantine/core';
import { ThemeIcon } from '@mantine/core';
import { IconPhoto } from '@tabler/icons-react';
import {
  IconFileAnalytics,
} from '@tabler/icons-react';
import classes from './styles/navbar.module.css';

const data = [
  { link: '', label: 'Tier 1', icon: IconFileAnalytics },
  { link: '', label: 'Tier 2', icon: IconFileAnalytics },
  { link: '', label: 'Tier 3', icon: IconFileAnalytics },
];

const NavBar = () => {
  const [active, setActive] = useState('Billing');
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const handleOnClick = () => {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  }

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Code fw={700}>v0.0.1</Code>
        </Group>
        {links}
      </div>

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
    </nav>
  );
}

export default NavBar;