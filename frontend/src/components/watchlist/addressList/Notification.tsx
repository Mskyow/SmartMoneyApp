import React from 'react';
import styled from 'styled-components';

type NotificationType = 'success' | 'info' | 'warning' | 'error' | 'default';

interface NotificationProps {
  type: NotificationType;
  message: string;
  onClose?: () => void;
}

export const Notification: React.FC<NotificationProps> = ({ 
  type, 
  message, 
  onClose 
}) => {
  return (
    <StyledNotification className={type}>
      <div className="notification-content">
        <div className="notification-icon">
          {getIconByType(type)}
        </div>
        <div className="notification-text">{message}</div>
      </div>
      <div className="notification-close" onClick={onClose}>
        <CloseIcon />
      </div>
      <div className="notification-progress-bar" />
    </StyledNotification>
  );
};

// Функция для получения иконки по типу уведомления
const getIconByType = (type: NotificationType) => {
  switch (type) {
    case 'success':
      return (
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      );
    case 'info':
      return (
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      );
    case 'warning':
      return (
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      );
    case 'error':
      return (
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      );
    default:
      return (
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13v-2a1 1 0 0 0-1-1h-.757l-.707-1.707.535-.536a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0l-.536.535L14 4.757V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v.757l-1.707.707-.536-.535a1 1 0 0 0-1.414 0L4.929 6.343a1 1 0 0 0 0 1.414l.536.536L4.757 10H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h.757l.707 1.707-.535.536a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414 0l.536-.535 1.707.707V20a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.757l1.707-.708.536.536a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-.535-.536.707-1.707H20a1 1 0 0 0 1-1Z" />
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
        </svg>
      );
  }
};

const CloseIcon = () => (
  <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 17.94 6M18 18 6.06 6" />
  </svg>
);

const StyledNotification = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  padding: 12px 16px;
  margin-bottom: 8px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  animation: fadeIn 0.3s ease-out;
  z-index: 10000;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .notification-content {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
  }

  .notification-icon svg {
    width: 20px;
    height: 20px;
  }

  .notification-close {
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: background-color 0.2s;

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }

    svg {
      width: 16px;
      height: 16px;
      stroke: white;
    }
  }

  .notification-progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    background-color: rgba(255, 255, 255, 0.5);
    width: 100%;
    transform: scaleX(1);
    transform-origin: left;
    animation: progressBar 3s linear forwards;
  }

  @keyframes progressBar {
    from { transform: scaleX(1); }
    to { transform: scaleX(0); }
  }

  /* Типы уведомлений */
  &.success {
    background: linear-gradient(135deg, #10B981, #059669);
  }

  &.info {
    background: linear-gradient(135deg, #3B82F6, #2563EB);
  }

  &.warning {
    background: linear-gradient(135deg, #F59E0B, #D97706);
  }

  &.error {
    background: linear-gradient(135deg, #EF4444, #DC2626);
  }

  &.default {
    background: linear-gradient(135deg, #6B7280, #4B5563);
  }
`;