import React, { useContext } from "react";
import { TopicContext } from "./Contexts/TopicContext";
import Timer from "./Timer/Timer.js";
import DragandDropContainer from "./DragandDrop/DragandDropContainer.js";

export default function DiscussionSession() {
  const { topics } = useContext(TopicContext);
  return (
    <div>
      Session Started.
      <Timer />
      <DragandDropContainer />
    </div>
  );
}
