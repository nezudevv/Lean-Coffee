import React from "react";
import ContentBody from "./ContentBody";
import { Link } from "react-router-dom";

export default function ContentBodyParent({
  topics,
  getTopics,
  topicInputHandler,
  createTopic,
  input,
}) {
  return (
    <div className='Main-Topic-Container'>
      <div className='Topic-Submit-Wrapper'>
        <button className='Start-Discussion-Button'>
          <Link className='Start-Discussion-Button-Link' to='/discussion'>
            Start Discussion
          </Link>
        </button>
        <h1 className='Main-Title'>Input Topic</h1>
        <input
          type='text'
          value={input}
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
