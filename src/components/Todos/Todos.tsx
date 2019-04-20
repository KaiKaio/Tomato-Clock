import * as React from 'react';
import { connect } from 'react-redux';
import {updateTodo} from "../../redux/actions/todos";
import TodoInput from 'src/components/Todos/TodoInput'
import TodoItem from  'src/components/Todos/TodoItem'
import { Empty, Collapse } from 'antd'
import './Todos.scss'

const Panel = Collapse.Panel;

class Todos extends React.Component<any> {
	constructor(props){
		super(props)
	}

	get unDeletedTodos(){
		return this.props.todos.filter(t => !t.deleted)
	}

	get unCompletedTodos(){
		return this.unDeletedTodos.filter(t => !t.completed)
	}

	get completedTodos(){
		return this.unDeletedTodos.filter(t => t.completed)
	}

	public render() {
		return (
			<div className="Todos" id="Todos">
				<TodoInput/>
				<div className="todoLists">
					{
						this.unCompletedTodos.length === 0? <Empty /> : this.unCompletedTodos.map(t=> <TodoItem key={t.id} {...t}/>)
					}
					<Collapse>
						<Panel header="最近完成的任务" key="1">
							{
								this.completedTodos.map(t=> <TodoItem key={t.id} {...t} />)
							}
						</Panel>
					</Collapse>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	todos: state.todos,
	...ownProps
})

const mapDispatchToProps = {
	updateTodo
}

export default connect(mapStateToProps,mapDispatchToProps)(Todos);