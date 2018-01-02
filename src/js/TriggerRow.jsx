import React from 'react';

var TriggerRow = ({index, trigger, addTrigger, editTrigger , deleteTrigger}) => {

  const onAddClick = () => {
    addTrigger(props.trigger);
  }
  const onEditClick = (trigger) => {
    editTrigger(trigger);
  }
  const onDeleteClick = (trigger, index) => {
    deleteTrigger(trigger, index);
  }
  
  return (
    <tr>
      <td>{index}</td>
      <td>{trigger.gate}</td>
      <td>{trigger.message}</td>
      <td>{trigger.clip}</td>
      <td>
        <button className="btn btn-info btn-sm" onClick={onEditClick.bind(this, trigger)}>edit</button>
      </td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={onDeleteClick.bind(this, trigger, index - 1)}>remove</button>
      </td>
    </tr>
  )
};

export default TriggerRow;