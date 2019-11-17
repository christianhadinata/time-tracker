import React, { Component } from "react";
import moment from 'moment';

class Record extends Component {
  state = {

  };

  render() {
    const { desc, startTime, endTime, handleDelete } = this.props;

    const momentStartTime = moment(startTime);
    const momentEndTime = moment(endTime);

    const formattedStartTime = momentStartTime.format("hh:mm:ss");
    const formattedEndTime = momentEndTime.format("hh:mm:ss");

    const duration = moment.duration(momentEndTime.diff(momentStartTime));
    const formattedDuration = (duration._data.hours < 10 ? "0" : "") + duration._data.hours + ":" +
      (duration._data.minutes < 10 ? "0" : "") + duration._data.minutes + ":" +
      (duration._data.seconds < 10 ? "0" : "") + duration._data.seconds;

    return (
      <div style={borderStyle}>
        <div style={{ marginBottom: "10px", color: "#FF994E" }}>
          <div style={{ display: "inline-block", width: "251px" }}>
            {desc}
          </div>
          <button onClick={handleDelete} style={deleteButtonStyle}>
            x
            </button>
        </div>
        <div style={timeStyle}>
          <div>
            {formattedStartTime}-{formattedEndTime}
          </div>
          <div style={{ marginLeft: "89px" }}>
            {formattedDuration}
          </div>
        </div>
      </div>
    );
  }
}
export default Record;

const borderStyle = {
  borderStyle: "solid",
  borderWidth: "1px",
  height: "80px",
  backgroundColor: "#634832",
  color: "white",
  marginBottom: "3px",
  padding: "10px",
  fontSize: "13px"
}

const deleteButtonStyle = {
  display: "inline-block",
  textAlign: "center",
  fontSize: "15px",
  width: "8px",
  height: "1px",
  backgroundColor: "#634832",
  color: "#F08080",
  border: "none",
  padding: "0 0 0 0"
}

const timeStyle = {
  display: "flex",
  flexDirection: "row",
}