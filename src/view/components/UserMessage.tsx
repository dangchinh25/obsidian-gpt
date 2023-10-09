import React from 'react';
import { type Message } from '../types';

export default function UserMessage(props: { message: Message }) {
  const styles = {
    userMessageContainer: {
      width: '100%',
      backgroundColor: '#3b3b3b',
      padding: '5px',
      paddingLeft: '10px',
      marginBottom: '10px',
      borderRadius: '5px',
      border: '1px solid black',
    },
  };

  return (
    <div style={styles.userMessageContainer}>
      <p>{props.message.content}</p>
    </div>
  );
}
