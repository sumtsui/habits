import React from 'react';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
// import EditIcon from '@material-ui/icons/Edit';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';

const ManageHabitsList = ({ onSortEnd, items, onPromptOpen, getDeleteItem }) => {

  const DragHandle = SortableHandle(() =>
    <ListItemIcon>
      <DragHandleIcon />
    </ListItemIcon>);

  const SortableItem = SortableElement(({ value }) =>
    <ListItem button divider >
      <DragHandle />
      <ListItemText primary={value.title} />
      {/* <IconButton aria-label="Edit" onClick={() => console.log('Edit')}>
        <EditIcon />
      </IconButton> */}
      <IconButton aria-label="Delete" onClick={() => { onPromptOpen(); getDeleteItem(value); }}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );

  const SortableList = SortableContainer(({ items }) => {
    return (
      <List>
        {items.map((value, index) => (
          <SortableItem key={`item-${index}`} index={index} value={value} />
        ))}
      </List>
    );
  });
  
  return (
    <SortableList items={items} onSortEnd={onSortEnd} lockAxis='y' useDragHandle />
  )
};

export default ManageHabitsList;
