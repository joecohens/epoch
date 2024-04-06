import React, { Component } from "react"
import moment from "moment"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default class Current extends Component {
  constructor(props) {
    super(props);

    this.state = { timestamp: moment().tz(props.tz) };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({ timestamp: moment().tz(this.props.tz) });
  }

  renderHeader(name, time) {
    return (
      <div className="well text-center padding-sm">
        <h4 className="uppercase margin-top-lg">{name}</h4>
        <p>{time}</p>
      </div>
    );
  }

  render() {
    const { timestamp } = this.state;

    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unix Seconds
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {timestamp ? timestamp.format('X') : null}
            </div>
          </CardContent>
        </Card>
        {this.renderHeader(
          'Unix milliseconds',
          timestamp ? timestamp.format('x') : null
        )}
        {this.renderHeader(
          'Current time',
          timestamp ? timestamp.format('YYYY-MM-DD HH:mm:ss') : null
        )}
      </div >
    );
  }
}
