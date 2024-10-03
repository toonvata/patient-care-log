import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { navItems } from './nav-items'

function App() {
  return (
    <Router>
      <div>
        <nav>
          {navItems.map((item) => (
            <a key={item.to} href={item.to}>
              {item.icon}
              {item.title}
            </a>
          ))}
        </nav>
        <Routes>
          {navItems.map((item) => (
            <Route key={item.to} path={item.to} element={item.page} />
          ))}
        </Routes>
      </div>
    </Router>
  )
}

export default App