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
        <table className="table">
          <caption>my triggers</caption>
          <thead>
            <tr>
              <th>#</th>
              <th>noise gate</th>
              <th>text message</th>
              <th>audio clip</th>
              <th>edit</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {triggers.map((trigger, index) => (
                <TriggerRow key={index} index={index + 1} trigger={trigger} addTrigger={addTrigger} />
            ))}
          </tbody>
        </table>
        {/* <ul>
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
        </ul> */}
      </div>
    )
  }
}


export default SettingsForm;