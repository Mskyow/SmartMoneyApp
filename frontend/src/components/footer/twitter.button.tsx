import React from 'react';
import styled from 'styled-components';

const ButtonX = () => {
  return (
    <StyledWrapper>
      <button className="Btn">
        <span className="svgContainer">
          <svg  viewBox="0 0 512 512" height="1.4em" xmlns="http://www.w3.org/2000/svg" className="svgIcon" fill="white">
            <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
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
    padding: 0px;
    align-items: center;
    justify-content: center;
    border: none;
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
    background: hsla(240, 0.60%, 32.70%, 0.56);
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
    background-color: rgba(156, 156, 156, 0.466);
    backdrop-filter: blur(4px);
  }`;

export default ButtonX;
