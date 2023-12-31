import React, { useState, useEffect } from 'react';
import { useApp } from './context';
import { type Message } from '../types';
import { Message as MessageComponent } from './components/Message';
import { ThreeDots } from 'react-loader-spinner';
import ObsidianGPTPlugin from '../../main';

export default function ReactView(): JSX.Element {
  const styles = {
    container: {
      display: 'flex',
      ['flex-direction']: 'column',
      margin: '5px',
    },
    submitButton: {
      width: '75px',
      alignSelf: 'end',
      marginBottom: '10px',
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
    messagesContainer: {
      display: 'flex',
      ['flex-direction']: 'column',
    },
    loadingContainer: {
      alignSelf: 'end',
      marginRight: '10px',
    },
  };

  const [userInput, setUserInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const app = useApp();
  const vault = app?.vault;

  const plugin = ObsidianGPTPlugin.instance;

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].role === 'user') {
      console.log(messages);

      (async () => {
        if (plugin?.openAIClient) {
          const getChatCompletionResult =
            await plugin.openAIClient.getChatCompletion(messages);

          console.log(getChatCompletionResult);

          if (getChatCompletionResult.isSuccess()) {
            setIsLoading(false);
            setMessages([
              ...messages,
              {
                content: getChatCompletionResult.value.content as string,
                role: 'assistant',
              },
            ]);
          }
        }
      })();
    }
  }, [messages]);

  const submitMessage = async () => {
    setMessages([
      ...messages,
      {
        content: userInput,
        role: 'user',
      },
    ]);
    setIsLoading(true);
    setUserInput('');
  };

  const onClickSubmit = async (e) => {
    console.log(userInput);
    await submitMessage();
  };

  const onInputKeyDown = async (e) => {
    if (e.key === 'Enter') {
      await submitMessage();
    }
  };

  return (
    <div style={styles.container}>
      <input
        style={styles.input}
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={onInputKeyDown}
      />
      <button style={styles.submitButton} onClick={onClickSubmit}>
        Submit
      </button>
      <div style={styles.messagesContainer}>
        {messages.map((message) => {
          if (message.role === 'user') {
            return (
              <MessageComponent
                message={message}
                style={{ width: '85%', alignSelf: 'start' }}
              />
            );
          } else {
            return (
              <MessageComponent
                message={message}
                style={{ width: '85%', alignSelf: 'end' }}
              />
            );
          }
        })}
        {isLoading && (
          <ThreeDots
            height="50"
            width="60"
            radius="9"
            color="#3b3b3b"
            ariaLabel="three-dots-loading"
            wrapperStyle={styles.loadingContainer}
            visible={true}
          />
        )}
      </div>
      {/* {vault && (
        <div>
          <h1>{vault.getName()}</h1>
          {vault.getMarkdownFiles().map((file) => (
            <div>{file.name}</div>
          ))}
        </div>
      )} */}
    </div>
  );
}
