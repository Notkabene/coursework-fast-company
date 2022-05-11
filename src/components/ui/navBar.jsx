import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const NavBar = () => {
  const path = useLocation().pathname
  const navMenu = [
    {
      name: 'Main',
      id: 'main',
      link: '/'
    },
    {
      name: 'Login',
      id: 'login',
      link: '/login'
    },
    {
      name: 'Users',
      id: 'users',
      link: '/users'
    }
  ]
  return <nav className=''>
    <ul className='d-flex m-4 list-unstyled'>
      {navMenu.map(item => (
        <li key={item.id} className={path === item.link ? 'btn btn-info me-2' : 'btn btn-warning me-2'}>
          <Link className='link-dark' to={item.link}>{item.name}</Link>
        </li>
      ))}
    </ul>
  </nav>
}

export default NavBar
