import React from 'react'
import { Menubar } from 'primereact/menubar'
export default function Navbar() {
  return (
    <div className="navbar">
      <Menubar
        start={<h2>LinkFree</h2>}
        end={<a href="#">Home</a>}
      />
    </div>
  )
}
