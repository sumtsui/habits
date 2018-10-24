import React from 'react'

export default function Footer() {
  const footerStyle = {
    height: '4em',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white'
  }
  
  return (
    <footer style={footerStyle}>
      <span>sumtsui💚2018</span>
    </footer>
  )
}
