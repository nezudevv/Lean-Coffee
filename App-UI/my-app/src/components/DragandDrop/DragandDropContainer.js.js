import React, { useContext } from "react";
import { TopicContext } from "../Contexts/TopicContext";
import Column from "./Column.js";

export default function DragandDropContainer() {
  const { topics } = useContext(TopicContext);

  const discussionTopics = topics.map(topic => {
    return { id: topic.id, title: topic.topicTitle };
  });

  const initialData = {
    columns: {
      "column-1": {
        id: "column-1",
        title: "To do",
        taskIds: [discussionTopics],
      },
      // Facilitate reordering of the columns
    },
    columnOrder: ["column-1"],
  };

  console.log(initialData);

  return (
    <div>
      {initialData.columnOrder.map(columnId => {
        const column = initialData.columns[columnId];
        const tasks = column.taskIds.map(taskIds => discussionTopics[taskIds]);

        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
    </div>
  );
}
