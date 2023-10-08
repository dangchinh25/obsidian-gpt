import React, { useState } from 'react';
import { useApp } from './context';

export default function ReactView(): JSX.Element {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      margin: '5px',
    },
    submitButton: {
      width: '75px',
      alignSelf: 'end',
    },
    input: {
      width: '100%',
      height: '50px',
      padding: '5px',
      paddingLeft: '10px',
      marginBottom: '10px',
      borderRadius: '5px',
      border: '1px solid black',
    },
  };

  const [userInput, setUserInput] = useState<string>('');
  const app = useApp();
  const vault = app?.vault;

  const onClickSubmit = (e) => {
    console.log(userInput);
    setUserInput('');
  };

  return (
    <div style={styles.container}>
      <input
        style={styles.input}
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button style={styles.submitButton} onClick={onClickSubmit}>
        Submit
      </button>
      {vault && (
        <div>
          <h1>{vault.getName()}</h1>
          {vault.getMarkdownFiles().map((file) => (
            <div>{file.name}</div>
          ))}
        </div>
      )}
    </div>
  );
}
