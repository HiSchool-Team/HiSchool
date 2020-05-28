import React from "react";
import axios from "axios";

import Schools from "../components/Schools";

class SchoolList extends React.Component {
    state = {
        schools: []
    }

    componentDidMount() {
        // Get required data from server
        /*
        axios.get('http://127.0.0.1:8000/api/')
            .then(res => {
                this.setState({
                    schools: res.data
                })
                console.log(res.data);
            })
         */
    }

    render() {
        return (
            <Schools data={this.state.schools}/>
        )
    }
}

export default SchoolList;