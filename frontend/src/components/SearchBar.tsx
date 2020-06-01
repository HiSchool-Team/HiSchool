import React from "react";

import Search from "antd/lib/input/Search";

class SearchBar extends React.Component<{}, {}> {

    searchAsGet(value: string) {
        const axios = require('axios');

        axios.get('/api/', {
            params: {
               search: value
            }
        }).then((resp: any) => {
            console.log(resp.data);
        })
    }

    render() {
        return (
            <Search placeholder={"search by school name"}
                    onSearch={value => this.searchAsGet(value)}
                    enterButton />
        )
    }
}

export default SearchBar;