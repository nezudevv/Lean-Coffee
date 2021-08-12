// import React from "react";
// import styled from "styled-components";
// import Task from "./Task.js";
// import { Droppable } from "react-beautiful-dnd";
// const Container = styled.div`
//   margin: 8px;
//   border: 1px solid lightgrey;
//   border-radius: 2px;
//   color: white;
// `;

// const Title = styled.h3`
//   padding: 8px;
// `;
// const TaskList = styled.div`
//   padding: 8px;
// `;

// export default function Column({ column, tasks }) {
//   // console.log("tasks", tasks);

//   return (
//     <Container>
//       <Title>{column.title}</Title>
//       <Droppable droppableId={column.id}>
//         {provided => (
//           <TaskList ref={provided.innerRef} {...provided.droppableProps}>
//             {tasks.map((task, index) => (
//               <Task key={task.id} task={task} index={index} />
//             ))}
//             {provided.placeholder}
//           </TaskList>
//         )}
//       </Droppable>
//     </Container>
//   );
// }
