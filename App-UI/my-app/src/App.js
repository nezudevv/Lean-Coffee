import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import "./Styles/App.scss";
import "./Styles/Reset.css";
import "./Styles/Header.scss";
import "./Styles/ContentBody.scss";
import Header from "./components/Header.js";
import ContentBodyParent from "./components/ContentBodyParent.js";
import DiscussionSession from "./components/DiscussionSession.js";
import { TopicContext } from "./components/Contexts/TopicContext";

import { Container, createTheme } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
});

export default function App() {
  // State
  const [topics, setTopics] = useState([]);
  const [topicInput, setTopicInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getTopics();
  }, []);

  // Functions
  async function getTopics() {
    try {
      setIsLoading(true);
      await axios
        .get("http://localhost:8000/api/topics")
        .then(response => response.data)
        .then(res => setTopics(res.Items))
        .then(setIsLoading(false));
    } catch (err) {
      console.log("Did not fetch topics: ", err);
    }
  }

  // Grabs input data to eventually use when 'add topic' button is clicked.
  function topicInputHandler(e) {
    setTopicInput(e.target.value);
  }
  // make post -- gives me response. I update ui using react
  async function createTopic() {
    if (topicInput === "") {
      alert("Topic cannot be empty.");
    } else {
      try {
        const newTopic = {
          id: uuidv4().toString(),
          topicTitle: topicInput,
        };
        setTopicInput("");
        console.log("before");
        await axios.post("http://localhost:8000/api", newTopic);
        console.log("after");
        await getTopics();
      } catch (err) {
        console.log("error with 'createTopic()': ", err);
      }
    }
  }

  return (
    // Using React-Router for Home/Session Pages
    <>
      <Container maxWidth='md' bgcolor='primary'>
        {/* <div className='App'> */}
        <Router>
          <Header className='Header' />
          <div className='App-Body'>
            <Switch>
              <TopicContext.Provider
                value={{ topics, isLoading, getTopics, setIsLoading }}
              >
                <Route exact path='/'>
                  <div>
                    <ContentBodyParent
                      className='Topic-Child-Container'
                      createTopic={createTopic}
                      input={topicInput}
                      topicInputHandler={topicInputHandler}
                    />
                  </div>
                </Route>
                <Route exact path='/discussion'>
                  <DiscussionSession />
                </Route>
              </TopicContext.Provider>
            </Switch>
          </div>
        </Router>
        {/* </div> */}
      </Container>
    </>
  );
}
