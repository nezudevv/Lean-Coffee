import React, { useState } from "react";
import axios from "axios";
export default function ContentBody({ topic, getTopics, id }) {
  // State
  const [inputChange, setInputChange] = useState("");
  const [isTopicClicked, setIsTopicClicked] = useState(false);
  //Functions

  function deleteTopic() {
    try {
      axios.delete(`http://localhost:8000/api/${topic.id}`);
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
        const info = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTopic),
        };
        await fetch(`http://localhost:8000/api/topic/${id}`, info);
      } catch (err) {
        console.log(err);
      }
      changeTopicClickedToFalse();
    }
    getTopics();
  }

  function changeTopicClickedToFalse() {
    setIsTopicClicked(false);
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
            <div className='Bottom-Card-Portion-Text2' onClick={deleteTopic}>
              delete
            </div>
          </div>
        </div>
      ) : (
        <div>
          <input onInput={inputChangeHandler}></input>
          <button onClick={submitTopicTitleChange}>Submit Change</button>
        </div>
      )}
    </div>
  );
}
