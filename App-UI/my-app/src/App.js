import React, { useState, useEffect } from "react";
import "./Styles/App.scss";
import ContentBody from "./components/ContentBody.js";
import "./Styles/Reset.css";
import axios from "axios";
import Timer from "./components/Timer/Timer.js";

export default function App() {
  // State

  const [topics, setTopics] = useState([]);
  const [topicInput, setTopicInput] = useState("");

  useEffect(() => {
    getTopics();
  }, []);

  // Functions;
  async function getTopics() {
    try {
      const response = await axios.get("http://localhost:8000/api/topics");
      const topics = response.data;
      setTopics(topics.Items);
    } catch (err) {
      console.log("Did not fetch topics!!", err);
    }
  }

  function topicInputHandler(e) {
    setTopicInput(e.target.value);
  }

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
      getTopics();
    }
  }

  return (
    <div className='App'>
      <div>
        <h1>Input Topic Below</h1>
        <input onInput={topicInputHandler}></input>
        <button onClick={createTopic}>Submit</button>
        {}
        {topics.map(topic => (
          <div key={topic.id}>
            <ContentBody id={topic.id} topic={topic} getTopics={getTopics} />
          </div>
        ))}
      </div>
      <p id='timer'>____</p>
    </div>
  );
}
