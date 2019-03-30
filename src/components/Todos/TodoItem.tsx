import * as React from 'react';
import { Checkbox, Icon } from 'antd';
import { connect } from 'react-redux';
import { editTodo, updateTodo } from '../../redux/actions/todos'
import classNames from 'classnames'
import './TodoItem.scss'
import axios from "../../config/axios"

interface ITodoItemProps {
    id: number;
    description: string;
    completed: boolean;
    editing:boolean;
    updateTodo: (id: number)=> any;
    editTodo: (payload: any)=> any;
}

interface ITodoItemState {
    ediText: string;
}

class TodoItem extends React.Component<ITodoItemProps, ITodoItemState> {
    constructor(props){
        super(props)
        this.state = {
            ediText: this.props.description
        }
    }

    updateTodo = async(params:any) => {
        try {
            const response = await axios.put(`todos/${this.props.id}`, params)
            this.props.updateTodo(response.data.resource)
        } catch(e) {
            throw new Error(e)
        }
    }

    editTodo = () => {
        this.props.editTodo(this.props.id)
    }

    onKeyUp = (e) => {
        if(e.keyCode === 13 && this.state.ediText !== '') {
            this.updateTodo({description: this.state.ediText})
        }
    }

    clickSave = () => {
        if(this.state.ediText !== '') {
            this.updateTodo({description: this.state.ediText})
        }
    }

    public render() {
        const Editing = (
            <div className="editing">
                <input type="text" value={this.state.ediText}
                    onChange={e=> this.setState({ediText: e.target.value})}
                    onKeyUp={this.onKeyUp}
                />
                <div className="iconWrapper">
                    <Icon type="enter" onClick={this.clickSave}/>
                    <Icon type="delete" theme="filled"
                        onClick={(e)=>this.updateTodo({deleted:true})}/>
                </div>
            </div>
        )
        const Text = <span className="text" onDoubleClick={this.editTodo}>{this.props.description}</span>
        const todoItemClass = classNames({
            TodoItem: true,
            editing: this.props.editing,
            completed: this.props.completed
        })
        
        return (
            <div className={todoItemClass} id="TodoItem">
                <Checkbox 
                    checked={this.props.completed}
                    onChange={(e)=> this.updateTodo({completed: e.target.checked})}
                />
                {this.props.editing?Editing:Text}
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => ({
    ...ownProps
})

const mapDispatchToProps = {
    editTodo,
    updateTodo
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoItem);