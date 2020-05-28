import React from "react";
import axios from "axios";

import {Card} from "antd"


class SchoolDetail extends React.Component {
    //FIXME this doesn't seem like a valid/sensible pattern
    state = {
        school: {
            name: "unset_name"
        }
    }

    componentDidMount() {
        console.log("Hello world 2");
        // const schoolID = this.props.match.params.schoolID;
        // axios.get(`http://127.0.0.1:8000/api/${schoolID}`)
        //     .then(res => {
        //         this.setState({
        //             school: res.data
        //         })
        //         console.log(res.data);
        //     })
    }

    render() {
        return (
            <Card title={this.state.school.name}>
                <p>{this.state.school.name}</p>
            </Card>
        )
    }
}

export default SchoolDetail;
