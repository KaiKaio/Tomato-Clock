import * as React from 'react';
import {connect} from 'react-redux';
import TomatoAction from './TomatoAction'
import {initTodos, updateTodo} from "../../redux/actions";
import './Tomatoes.scss'

class Tomatoes extends React.Component {
    public render() {
        return (
            <div className="Tomatoes" id="Tomators">
                <TomatoAction />
            </div>
        )
    }
}

const mapStateToprops = (state, ownProps) => ({
    tomatoes: state.tomatoes,
    ... ownProps
})

const mapDispatchToProps = {
    initTodos,
    updateTodo
}

export default connect(mapStateToprops,mapDispatchToProps)(Tomatoes)