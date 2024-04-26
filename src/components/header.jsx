import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  const navigate = useNavigate();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ position: "fixed", width: "100%", zIndex: 3, top: 0, left: 0, margin: 0 }}>
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <button
                  className={`nav-link`}
                  onClick={() => navigate('/home')}
                >
                  Home
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
          }}>
            <form class="form-inline">
              <button
                className='btn btn-danger my-2 my-sm-0'
                style={{ marginRight: '10px' }}
                onClick={() => {
                  if (window.confirm('Are you sure you want to log out?')) {
                    localStorage.removeItem('uuid');
                    localStorage.removeItem('mobileNumber');
                    navigate('/');
                  }
                }}
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </nav>
      <br />
      <br />
      <br />
    </div>
  )
}

export default Header
