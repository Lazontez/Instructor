import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Checkbox,
  ListItemIcon,
} from '@mui/material';

const HandsOnTaskList = ({ handsOnTask }) => {
  const [completedTasks, setCompletedTasks] = useState([]);

  const toggleTask = (index) => {
    setCompletedTasks((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <List>
      {handsOnTask.map((task, index) => (
        <ListItem
          key={index}
          button
          onClick={() => toggleTask(index)}
          style={{
            textDecoration: completedTasks.includes(index)
              ? 'line-through'
              : 'none',
          }}
        >
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={completedTasks.includes(index)}
              tabIndex={-1}
              disableRipple
            />
          </ListItemIcon>
          <ListItemText primary={task} />
        </ListItem>
      ))}
    </List>
  );
};

export default HandsOnTaskList;
