import React, { useState } from "react";
import axios from "axios";

export default function ContentBody({
  topic,
  getTopics,
  id,
  setIsLoading,
  setTopics,
  topics,
}) {
  // State
  const [inputChange, setInputChange] = useState("");
  const [isTopicClicked, setIsTopicClicked] = useState(false);

  //Functions
  async function deleteTopic(itemId) {
    try {
      await axios.delete(`http://localhost:8000/api/${topic.id}`);
      const newArr = await topics.filter(item => item.id !== itemId);
      await setTopics(newArr);
    } catch (err) {
      console.log(err);
    }
  }

  function inputChangeHandler(e) {
    setInputChange(e.target.value);
  }

  async function submitTopicTitleChange() {
    if (inputChange === "") {
      alert("Field must not be empty.");
    } else {
      try {
        const updatedTopic = { topicTitle: inputChange };
        await axios.post(`http://localhost:8000/api/topic/${id}`, updatedTopic);
        getTopics();
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div key={id}>
      {!isTopicClicked ? (
        <div className='Card-Topics-Wrapper'>
          <div className='Card-Topics'>
            <p
              className='Card-Title'
              onClick={() => {
                setIsTopicClicked(true);
              }}
            >
              {topic.topicTitle}
            </p>
          </div>
          <div className='Bottom-Card-Portion'>
            {/* This is where the voting element will live...
            <div className='Bottom-Card-Portion-Text'>vote</div>*/}
            <div
              onClick={() => deleteTopic(id)}
              className='Bottom-Card-Portion-Text2'
            >
              delete
            </div>
          </div>
        </div>
      ) : (
        <div className='Card-Topics-Wrapper'>
          <div className='Card-Topics'>
            <p className='Card-Title'>
              <input onInput={inputChangeHandler}></input>
              <button onClick={submitTopicTitleChange}>Submit Change</button>
            </p>
          </div>
          <div className='Bottom-Card-Portion'>
            {/* This is where the voting element will live...
            <div className='Bottom-Card-Portion-Text'>vote</div>*/}
            <div className='Bottom-Card-Portion-Text2'>delete</div>
          </div>
        </div>
      )}
    </div>
  );
}
