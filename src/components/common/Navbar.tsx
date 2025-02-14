import React, { useState } from 'react'
import { UserData } from '../../models/UserData'

interface Props{
  darkTheme: boolean,
  setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>,
  handleTheme: () => void
}

const Navbar = ({darkTheme, setDarkTheme, handleTheme}:Props) => {

  const [firstName, setFirstName] = useState((): string => {
    const userDataString = localStorage.getItem('user')
    let userData: UserData | null = userDataString ? JSON.parse(userDataString) : null
    console.log(userData);
    let firstName: string = userData ? userData.name : 'Profile'
    return firstName;
  })

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container px-5">
        <a className="navbar-brand" href="/">
          TUDUS
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="/profile">
                {firstName}
              </a>
            </li>
          </ul>
          <div className="form-check form-switch ms-3">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="themeToggle"
              checked={darkTheme}
              onChange={()=>handleTheme()}
            />
            <label className="form-check-label" htmlFor="themeToggle">
              {darkTheme ? 'Dark Mode' : 'Light Mode'}
            </label>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
