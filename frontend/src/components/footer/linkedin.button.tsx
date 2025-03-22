import React from 'react';
import styled from 'styled-components';

const ButtonLinkedIn = () => {
  return (
    <StyledWrapper>
      <button className="Btn">
        <span className="svgContainer">
          <svg viewBox="0 0 448 512" height="1.4em" xmlns="http://www.w3.org/2000/svg" className="svgIcon" fill="white">
            <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
          </svg>
        </span>
        <span className="BG" />
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .Btn {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    padding: 0px;
    background-color: transparent;
    position: relative;
    /* overflow: hidden; */
    border-radius: 7px;
    cursor: pointer;
    transition: all 0.3s;
  }

  .svgContainer {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    backdrop-filter: blur(0px);
    letter-spacing: 0.8px;
    border-radius: 10px;
    transition: all 0.3s;
    border: 1px solid rgba(156, 156, 156, 0.466);
  }

  .BG {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    background:#0077b5;
    z-index: -1;
    border-radius: 10px;
    pointer-events: none;
    transition: all 0.3s;
  }

  .Btn:hover .BG {
    transform: rotate(35deg);
    transform-origin: bottom;
  }

  .Btn:hover .svgContainer {
    border: 1px solid rgba(216, 216, 216, 0.466);
    background-color: rgba(190, 190, 190, 0.466);
    backdrop-filter: blur(4px);
  }`;

export default ButtonLinkedIn;
