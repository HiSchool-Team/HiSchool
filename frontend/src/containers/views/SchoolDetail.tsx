import React from 'react';

import { Card } from 'antd';
import myData from '../../data.json';
import NewLayout from '../NewLayout';
import { RouteComponentProps } from 'react-router-dom';
import './SchoolDetail.css';

const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis tellus justo. Vestibulum vestibulum turpis vel elit lacinia accumsan. Proin accumsan, purus nec congue lacinia, nisl nibh porttitor nunc, eget sagittis tellus metus vitae quam. Donec in porta dui. In hac habitasse platea dictumst. Curabitur id maximus purus, in commodo tellus. Ut orci purus, sagittis quis vulputate sit amet, pulvinar sit amet enim. Curabitur sit amet malesuada sem. Donec cursus ex eget turpis egestas, at tincidunt neque convallis. Maecenas dictum erat dui, et consectetur lorem convallis et.';

class SchoolDetail extends React.Component<RouteComponentProps> {
    state = {
      school: {
        name: 'unset_name',
        img_src: 'no_src'
      }
    };

    componentDidMount () {
      // @ts-ignore
      const schoolID = parseInt(this.props.match.params.schoolID, 10);
      let correctSchool = myData[0];
      for (let i = 0; i < myData.length; i++) {
        if (myData[i].id === schoolID) {
          correctSchool = myData[i];
        }
      }

      this.setState({
        school: correctSchool
      });
    }

    render () {
      return (
        <NewLayout route={{
          history: this.props.history,
          location: this.props.location,
          match: this.props.match,
          staticContext: this.props.staticContext
        }}>
          <Card title={this.state.school.name}>
                    <div className={'horizontal-table'}>
                        <p className={'school-description'}>{loremIpsum}</p>
                        <div className={"school-links"}>
                            <div className={"vertical-table"}>
                                <a href="https://www.google.com">Facebook</a><br/>
                                <a href="https://www.google.com">Twitter</a><br/>
                                <a href="https://www.google.com">Instagram</a>
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
                        <table className={"new-table"}>
                            <tr><th>Type</th></tr><tr>
                                <th className={"pill"}>Public School</th> <th className={"pill"}>Boarding School</th>
                            </tr>
                            <tr><th>Extracurricular</th></tr><tr>
                                <th className={"pill"}>Dueling Club</th><th className={"pill"}>Quidditch</th>
                                <th className={"pill"}>Charms Club</th><th className={"pill"}>Potions Club</th>
                                <th className={"pill"}>Astronomy Club</th>
                            </tr>
                            <tr><th>Amenities</th></tr><tr>
                                <th className={"pill"}>Quidditch pitch</th><th className={"pill"}>Flying Grounds</th>
                                <th className={"pill"}>Hospital Wing</th><th className={"pill"}>Dining Hall</th>
                            </tr>
                            <tr><th>Other</th></tr><tr className={"pill"}>Triwizard Tournament</tr>
                        </table>
                    </th>
                    <th className={"misc"}>
                        <iframe src="https://calendar.google.com/calendar/embed?src=0dmsr8gecd94i4sjrdq18j96j4%40group.calendar.google.com&ctz=Europe%2FLondon"
                                width="300" height="200" frameBorder="0" scrolling="no"/><br/>

                                <iframe src="http://maps.google.com/maps?q=56.207862,-2.803599&z=15&output=embed"></iframe>
                    </th>
                    </tr>
                </table>
        </NewLayout>
      );
    }
}

export default SchoolDetail;
