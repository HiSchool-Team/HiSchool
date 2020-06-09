import React from 'react';

import {Card} from 'antd';
import myData from '../../newData.json'
import NewLayout from '../NewLayout';
import {RouteComponentProps} from 'react-router-dom';
import './SchoolDetail.css';
import {School} from "../../types";
import Tooltip from 'antd/es/tooltip';

// TODO will go in as props in the future
const types = ["Public School", "Boarding School"];
const extracurriculars = ["Dueling Club", "Quiddich", "Charms Club", "Potions Club", "Astronomy Club"];
const amenities = ["Quidditch Pitch", "Flying Grounds", "Hospital Wing", "Dining Hall"];
const others = ["Triwizard Tournament"];

const categories = [{name: "Type", value: types},
  {name: "Extracurricular", value: extracurriculars},
  {name: "Amenities", value: amenities},
  {name: "Other", value: others}]


interface State {
  school: School;
}

class SchoolDetail extends React.Component<RouteComponentProps> {
  state: Readonly<State> = {
    school: {
      id: 0,
      name: 'unset_name',
      description: 'unset_description',
      student_satisfaction: 0,
      parent_satisfaction: 0,
      img_src: 'no_src'
    },
  };

  componentDidMount() {
    let correctSchool = myData[0];

    this.setState({
      school: correctSchool,
    });
  }

  render() {
    return (
      <NewLayout route={{
        history: this.props.history,
        location: this.props.location,
        match: this.props.match,
        staticContext: this.props.staticContext
      }}>
        <Card title={this.state.school.name}>
          <div className={'horizontal-table'}>
            <p className={'school-description'}>{this.state.school.description}</p><br/>
            <div style={{position: "absolute", bottom: "25px", display: "flex"}}>
              <a className={'qa-link'} style={{float: "left"}}
                 href={`${window.location.href}/qa`}>Questions & Answers </a>
              <div style={{float: "left", marginLeft: "20px", alignSelf: "center"}}>
                <b style={{float: "left", fontSize: "large"}}>School Motto:</b>
                <div
                  style={{marginLeft: "10px", float: "left", fontSize: "large", fontStyle: "italic"}}>
                  Draco Dormiens Numquam Titillandus
                </div>
              </div>
            </div>
            <div className={"school-links"}>
              <div className={"vertical-table"}>
                <a href="https://www.wizardingworld.com/">Website</a><br/>
                <a href="https://www.google.com">Twitter</a><br/>
                <a href="https://www.facebook.com/wizardingworld/">Facebook</a><br/>
              </div>
            </div>
            <img className={"school-picture"} alt="" src={this.state.school.img_src}/>
          </div>
        </Card>

        <table>
          <tr>
            <th className={"school-tour"}>
              <h1>School tour</h1>
              <iframe width="420" height="315"
                      src="https://www.youtube.com/embed/TtNWXCwDs7o">
              </iframe>
            </th>
            <th className={"tag-fields"}>
              <table style={{display: "flex", flexFlow: "column wrap", alignItems: "center"}}>
                {categories.map(elem => {
                  return (
                    <div>
                      <tr>
                        <th style={{textAlign: "center"}}>{elem.name}</th>
                      </tr>
                      <tr>
                        {elem.value.map(pill => {
                          // The search results go to tooltip
                          return <Tooltip title={pill}>
                            <th style={{flexShrink: 2}} className={"pill"}>{pill}</th>
                          </Tooltip>
                        })}
                      </tr>
                    </div>
                  )
                })}
              </table>
            </th>
            <th className={"misc"}>
              <iframe
                src="https://calendar.google.com/calendar/embed?src=0dmsr8gecd94i4sjrdq18j96j4%40group.calendar.google.com&ctz=Europe%2FLondon"
                width="300" height="200" frameBorder="0" scrolling="no"/>
              <br/>

              <iframe src="http://maps.google.com/maps?q=56.207862,-2.803599&z=15&output=embed"/>
            </th>
          </tr>
        </table>
      </NewLayout>
    );
  }
}

export default SchoolDetail;
