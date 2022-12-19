import React, { FC, ReactElement } from 'react'
export type MessageType = 'info' | 'success' | 'danger' | 'warning'

export interface MessageProps {
  text: string;
  type: MessageType
}

const Message: FC<MessageProps> = (props: MessageProps) => {
  const { text, type } = props

  const renderIcon = (messageType: MessageType): ReactElement => {
    let messageIcon

    switch (messageType) {
      case 'success':
        messageIcon = 'icon-success-fill c1'
        break
      case 'danger':
        messageIcon = 'icon-info c3'
        break
      case 'warning':
        messageIcon = 'icon-error c2'
        break
      case 'info':
      default:
        messageIcon = 'icon-info c4' 
        break
    }

    return <span className={messageIcon + ' iconfont' }></span>
  }

  return (
    <div className="message" data-testid="test-message">
      <div className="message-content">
        <div className="icon">
          {renderIcon(type)}
        </div>
        <div className="text">
          {text}
        </div>
      </div>
    </div>
  )
}

export default Message