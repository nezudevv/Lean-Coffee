import React from "react";
import ContentBody from "./ContentBody";

export default function ContentBodyParent({
  topics,
  getTopics,
  topicInputHandler,
  createTopic,
}) {
  return (
    <div>
      <h1>Input Topic Below</h1>
      <input onInput={topicInputHandler}></input>
      <button onClick={createTopic}>Submit</button>
      {topics.map(topic => (
        <div key={topic.id}>
          <ContentBody id={topic.id} topic={topic} getTopics={getTopics} />
        </div>
      ))}
    </div>
  );
}
