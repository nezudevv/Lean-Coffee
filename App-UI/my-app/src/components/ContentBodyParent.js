import React from "react";
import ContentBody from "./ContentBody";

export default function ContentBodyParent({
  topics,
  getTopics,
  topicInputHandler,
  createTopic,
}) {
  return (
    <div className='Main-Topic-Container'>
      <div className='Topic-Submit-Wrapper'>
        <h1>Input Topic Below</h1>
        <input onInput={topicInputHandler}></input>
        <button onClick={createTopic}>Submit</button>
      </div>
      <div className='Card-Topics-Container'>
        {topics.map(topic => (
          <div key={topic.id}>
            <ContentBody id={topic.id} topic={topic} getTopics={getTopics} />
          </div>
        ))}
      </div>
    </div>
  );
}
