import React from 'react';

var TriggerRow = ({index, trigger, addTrigger}) => {
  
  const onAddClick = () => {
    addTrigger(props.trigger);
  }

  return (
    <tr>
      <td>{index}</td>
      <td>{trigger.gate}</td>
      <td>{trigger.message}</td>
      <td>{trigger.clip}</td>
      <td>
        <button className="btn btn-info btn-sm">edit</button>
      </td>
      <td>
        <button className="btn btn-danger btn-sm">remove</button>
      </td>
    </tr>
  )
};


export default TriggerRow;