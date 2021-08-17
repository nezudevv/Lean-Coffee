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
      const response = await axios.get("http://localhost:8000/api/topics");
      const topics = await response.data;
      setIsLoading(true);
      setTopics(topics.Items);
    } catch (err) {
      console.log("Did not fetch topics: ", err);
    }
  }

  // Grabs input data to eventually use when 'add topic' button is clicked.
  function topicInputHandler(e) {
    setTopicInput(e.target.value);
  }

  async function createTopic() {
    const newTopic = {
      id: uuidv4().toString(),
      topicTitle: topicInput,
    };
    setTopicInput("");

    console.log(newTopic);
    const info = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTopic),
    };
    getTopics();
    await fetch("http://localhost:8000/api", info);

    console.log("clicked");
  }

  return (
    // Using React-Router for Home/Session Pages

    <div className='App'>
      <Router>
        <Header className='Header' />
        <div className='App-Body'>
          <Switch>
            <TopicContext.Provider value={{ topics, isLoading, getTopics }}>
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
    </div>
  );
}
