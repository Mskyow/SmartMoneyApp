import React from 'react';
import styled from 'styled-components';

interface SwitchProps {
  isActive: boolean;
 
}

const Switch: React.FC<SwitchProps> = ({ isActive }) => { 
  console.log(isActive) 
  return (
    <StyledWrapper>
      <label className="switch">
        <input 
          type="checkbox" 
          checked={isActive} 
          
        />
        <span className="slider">
          <svg className="bell-icon" xmlns="http://www.w3.org/2000/svg" viewBox="20 1 2 512">
            <path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z" />
          </svg>
        </span>
      </label>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 25px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
        background: linear-gradient(to right,rgba(255, 0, 0, 0.77),rgba(255, 0, 76, 0.76));

    border-radius: 34px;
    transition: .4s;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 8px rgba(95, 15, 255, 0.3);
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    border-radius: 50%;
    transition: .4s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  input:checked + .slider {
    background: linear-gradient(to right, #8A4FD1, #5A1E99);
  }

  input:checked + .slider:before {
    transform: translateX(22px);
  }

  .bell-icon {
    width: 26px;
    height: 16px;
    fill: white;
    margin-left: 8px;
    z-index: 1;
    transition: opacity 0.3s;
    filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.3));
  }

  input:not(:checked) + .slider .bell-icon {
    opacity: 1;
  }

  input:checked + .slider .bell-icon {
    opacity: 0;
  }
`;

export default Switch;