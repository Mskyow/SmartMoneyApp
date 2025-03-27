import React from 'react';
import styled from 'styled-components';

const DeleteButton = () => {
  return (
    <StyledWrapper>
      <button className="Btn">
        <div className="sign">
          <svg viewBox="0 0 16 16" className="bi bi-trash3-fill" fill="currentColor" height={18} width={18} xmlns="http://www.w3.org/2000/svg">
            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
          </svg>
        </div>
    
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .Btn {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 25px;
    height: 25px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition-duration: 0.3s;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
    background: rgb(189, 65, 255);
        background: linear-gradient(to right,rgba(255, 0, 0, 0.77),rgba(255, 0, 76, 0.76));

    );
  }

  /* plus sign */
  .sign {
    width: 100%;
    transition-duration: 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sign svg {
    width: 17px;
  }

  .sign svg path {
    fill: white;
  }

  /* hover effect on button width */
  .Btn:hover {
    background: linear-gradient(to right,rgba(255, 0, 0, 0.77),rgba(255, 0, 76, 0.76));
    border-radius: 40px;
    transition-duration: 0.3s;
  }



  /* button click effect*/
  .Btn:active {
    transform: translate(2px, 2px);
  }`;

export default DeleteButton;
