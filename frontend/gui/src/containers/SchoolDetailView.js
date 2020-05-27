import React from "react";
import axios from "axios";

import { Card } from "antd"

class SchoolDetail extends React.Component {
    state = {
        school: {}
    }

    componentDidMount() {
        const schoolID = this.props.match.params.schoolID;
        axios.get(`http://127.0.0.1:8000/api/${schoolID}`)
            .then(res => {
                this.setState({
                    school: res.data
                })
                console.log(res.data);
            })
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
