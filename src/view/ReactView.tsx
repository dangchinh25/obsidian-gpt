import React from 'react';

export default function ReactView(): JSX.Element {
  const styles = {
    submitButton: {
      backgroundColor: 'white',
    },
  };

  return (
    <div>
      <input />
      <button style={styles.submitButton}>Submit</button>
    </div>
  );
}
