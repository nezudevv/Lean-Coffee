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
        <h1 className='Main-Title'>Input Topic</h1>
        <input
          placeholder={"Add new topic..."}
          onInput={topicInputHandler}
        ></input>
        <button onClick={createTopic}>Submit</button>
      </div>
      <div className='Topic-Child-Container'>
        <div className='Topic-Child-Container2'>
          {topics.map(topic => (
            <div className='Card-Topics-Container' key={topic.id}>
              <ContentBody id={topic.id} topic={topic} getTopics={getTopics} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
