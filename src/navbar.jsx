import { useState } from 'react';
import { Group, Code } from '@mantine/core';
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
          <Code fw={700}>v3.1.2</Code>
        </Group>
        {links}
      </div>
    </nav>
  );
}

export default NavBar;