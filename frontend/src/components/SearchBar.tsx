import React from "react";

import Search from "antd/lib/input/Search";
import {Redirect} from "react-router-dom";

type SearchState = {
    redirect: boolean,
    params: string,
}

class SearchBar extends React.Component<{}, SearchState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            redirect: false,
            params: ""
        }
    }

    render() {
        if (this.state.redirect) {
            return (
                <div>
                    <Redirect to={{
                        pathname: "/",
                        search: `?${this.state.params}`
                    }}/>
                    <Search placeholder={"search by school name"}
                            onSearch={value => {
                                this.setState({
                                    params: new URLSearchParams({"search": value}).toString(),
                                    redirect: true
                                })
                            }}

                            enterButton/>
                </div>
            )
        }


        return (
            <Search placeholder={"search by school name"}
                    onSearch={value => this.setState({
                        params: new URLSearchParams({"search": value}).toString(),
                        redirect: true
                    })}
                    enterButton/>
        )
    }
}

export default SearchBar;