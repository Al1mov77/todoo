import React from 'react'
import { Link } from 'react-router-dom'

function Layout() {
  return (
    <div>
      <p>
        <Link to="zustand">
        <p>Zustand</p>
        </Link>
         <Link to="redux">
        <p>Redux</p>
        </Link>
         <Link to="jotai">
        <p>Jotai</p>
        </Link>
      </p>
    </div>
  )
}
export default Layout