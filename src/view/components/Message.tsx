import React, { CSSProperties } from 'react';
import { type Message } from '../../types';

export function Message(props: { message: Message; style?: CSSProperties }) {
  const styles = {
    userMessageContainer: {
      backgroundColor: '#3b3b3b',
      padding: '5px',
      paddingLeft: '10px',
      marginBottom: '10px',
      borderRadius: '5px',
      border: '1px solid black',
    },
    userMessage: {
      whiteSpace: 'pre-wrap' as any,
    },
  };

  return (
    <div style={{ ...styles.userMessageContainer, ...props.style }}>
      <p style={styles.userMessage}>{props.message.content}</p>
    </div>
  );
}
