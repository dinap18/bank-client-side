import React from "react";
import gmailApi from 'react-gmail'

class ApproveRequests extends React.Component {
    state = {
        messages: []
    };

    getMessages = () => {
        gmailApi.getMessages(true, 5, "334577680333-2iof95r451cki6q7hj0k5s73hqv0qnoj.apps.googleusercontent.com").then(res => {
            this.setState({messages: gmailApi.normalizeData(res)});
        });
    };

    // Another way to get messages by ids
    // getMessages = () => {
    //   gmailApi.getMessageIds(false, 5).then(resIds => {
    //     gmailApi.getMessages(gmailApi.getArrayOfIds(resIds)).then(res => {
    //       this.setState({ messages: gmailApi.normalizeData(res) });
    //     });
    //   });
    // }

    render() {
        const {messages} = this.state;
        return (
            <div>
                <button onClick={this.getMessages}>Get Messages</button>
                <ul>
                    {messages.map(message => (
                        <li key="message.id">
                            <div>
                <span>
                  {message.subject}: {message.snippet}
                </span>
                                <p>{message.date}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default ApproveRequests