import React, { useState, useEffect } from "react";
import "./Styles/App.scss";
import "./Styles/Reset.css";
import "./Styles/Header.scss";
import "./Styles/ContentBody.scss";
// import ContentBody from "./components/ContentBody.js";
import axios from "axios";
// import Timer from "./components/Timer/Timer.js";
import Header from "./components/Header.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ContentBodyParent from "./components/ContentBodyParent.js";
import DiscussionSession from "./components/DiscussionSession.js";

export default function App() {
  // State
  const [topics, setTopics] = useState([]);
  const [topicInput, setTopicInput] = useState("");

  useEffect(() => {
    getTopics();
  }, [topics.id]);

  // Functions;
  async function getTopics() {
    try {
      const response = await axios.get("http://localhost:8000/api/topics");
      const topics = await response.data;
      setTopics(topics.Items);
    } catch (err) {
      console.log("Did not fetch topics!!", err);
    }
  }

  function topicInputHandler(e) {
    setTopicInput(e.target.value);
  }
  console.log(topicInput);
  console.log(topics);

  async function createTopic() {
    const newTopic = {
      id: Date.now().toString(),
      topicTitle: topicInput,
    };
    if (topicInput === "") {
      alert("Field must not be empty.");
    } else {
      console.log(newTopic);
      const info = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTopic),
      };
      await fetch("http://localhost:8000/api", info);
    }
    getTopics();
  }

  return (
    // Using React-Router for Home/Session Pages

    <div className='App'>
      <Router>
        <Header className='Header' />
        <div className='App-Body'>
          <Switch>
            <Route exact path='/'>
              <div>
                <ContentBodyParent
                  className='Topic-Child-Container'
                  topics={topics}
                  getTopics={getTopics}
                  input={topicInput}
                  topicInputHandler={topicInputHandler}
                  createTopic={createTopic}
                />
              </div>
            </Route>
            <Route exact path='/discussion'>
              <DiscussionSession />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}
