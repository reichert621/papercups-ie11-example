import 'core-js/stable';
import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import {Box, Flex, Heading, Text} from 'rebass';
import {ChatWidget} from '@papercups-io/chat-widget';
import './App.css';

const ping = () => {
  return request.get('/api/ping').then((res) => res.body.message);
};

class App extends React.Component {
  componentDidMount() {
    return ping()
      .then(() => console.log('Server is up and running!'))
      .catch((err) => console.log('Server is down!', err));
  }

  render() {
    return (
      <Flex
        p={6}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box mb={3}>
          <Heading>Hello! 👋</Heading>
        </Box>

        <Box>
          <Text>Get started in App.js</Text>
        </Box>

        <ChatWidget
          title="Need help with anything?"
          subtitle="Ask us in the chat window below 😊"
          greeting="Hi there! Send us a message and we'll get back to you as soon as we can."
          primaryColor="#1890ff"
          accountId="eb504736-0f20-4978-98ff-1a82ae60b266"
          iframeUrlOverride="https://chat-window-git-ie11.papercups.vercel.app"
        />
      </Flex>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
