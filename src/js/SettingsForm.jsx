import React from 'react';
import TriggerRow from './TriggerRow.jsx'

class SettingsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    const { triggers , addTrigger} = this.props;
    return (
      <div>
        <ul>
          {triggers.map((trigger, index) => (
            <div>
              <TriggerRow key={index} index={index + 1} trigger={trigger} addTrigger={addTrigger}/>
              <br/>
            </div>
          ))}
          <br/>
          <li>
            add new trigger
          </li>
        </ul>
      </div>
      // <div>
      //   Trigger
      //   <br />
      //   Trigger
      //   <br />
      //   Trigger
      //   <br />
      //   Trigger
      //   <br />
      // </div>
    )
  }
}


export default SettingsForm;