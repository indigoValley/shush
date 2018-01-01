import React from 'react';

var TriggerRow = ({index, trigger, addTrigger}) => {
  const onAddClick = () => {
    addTrigger(props.trigger);
  }

  return (
    <div className="trigger">
      <div>
        trigger #{index}
        <br/>
        noise limit: {trigger.gate}
        <br/>
        message: {trigger.message}
        <br/>
        audio clip: {trigger.clip}
        <br/>
        EDIT BUTTON || DELETE BUTTON
      </div>
    </div>
  )
};


export default TriggerRow;