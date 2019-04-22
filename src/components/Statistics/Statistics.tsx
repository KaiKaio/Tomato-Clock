import * as React from 'react';
import {connect} from 'react-redux'
import Polygon from './Polygon'
import TodoHistory from './TodoHistory/TodoHistory'
import {format} from "date-fns";
import _ from 'lodash'
import './Statistics.scss'

interface IStatisticsProps {
	todos: any[];
}

class Statistics extends React.Component<IStatisticsProps> {
	get finishedTodos(){
		return this.props.todos.filter(t => t.completed && !t.deleted)
	}

	get dailyTodos(){
		return _.groupBy(this.finishedTodos,(todo)=>{
			return format(todo.updated_at,'YYYY-MM-D')
		})
	}

	constructor(props){
		super(props)
	}

	public render() {
		return (
			<div className="Statistics" id="Statistics">
				<ul className="graph">
					<li>
						<div className="desc">
							<span className="title">统计</span>
						</div>
					</li>
					<li>
						<div className="desc">
							<span className="title">番茄历史</span>
						</div>
					</li>
					<li>
						<div className="desc">
							<span className="title">任务历史</span>
							<span className="subtitle">累计完成任务</span>
							<span className="quantity">{this.finishedTodos.length}</span>
						</div>
						<Polygon
							data={this.dailyTodos}
							totalFinishedCount={this.finishedTodos.length} />
					</li>
				</ul>

				<TodoHistory/>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	todos: state.todos,
	...ownProps
})

export default connect(mapStateToProps)(Statistics);