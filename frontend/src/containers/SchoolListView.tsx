import React from "react";
import myData from "../data.json"

import Schools, {School} from "../components/Schools";

interface SchoolListProps {
    schools: School[];
}

class SchoolList extends React.Component<SchoolListProps, {}> {
    constructor(props: SchoolListProps) {
        super(props);
        this.state = {
            schools: myData
        }
    }

    getNewData() {
    }

    render() {
        return (
            <Schools data={this.props.schools}/>
        )
    }
}

export default SchoolList;