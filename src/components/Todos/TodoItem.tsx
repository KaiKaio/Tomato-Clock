import * as React from 'react';
import { Checkbox, Icon } from 'antd';

interface ITodoItemProps {
    id: number;
    description: string;
    completed: boolean;
    editing:boolean;
    update: (id: number, params: any)=> void;
    toEditing: (id: number) => void;
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

    update = (params) => {
        this.props.update(this.props.id, params)
    }

    toEditing = () => {
        this.props.toEditing(this.props.id)
    }

    onKeyUp = (e) => {
        if(e.keyCode === 13 && this.state.ediText !== '') {
            this.update({description: this.state.ediText})
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
                    <Icon type="enter"/>
                    <Icon type="delete" theme="filled"
                        onClick={(e)=>this.update({deleted:true})}/>
                </div>
            </div>
        )
        const Text = <span onDoubleClick={this.toEditing}>{this.props.description}</span>
        
        return (
            <div className="TodoItem" id="TodoItem">
                <Checkbox 
                    checked={this.props.completed}
                    onChange={(e)=> this.update({completed: e.target.checked})}
                />
                {this.props.editing?Editing:Text}
            </div>
        )
    }
}

export default TodoItem;