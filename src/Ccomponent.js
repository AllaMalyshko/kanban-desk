import { Component } from "react";


export default class CComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            name: 'Alla'
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.setState({
            name: 'Kostya'
        })
    }



    render (){
        return(
            <div>
                <h2>{this.state.name} learn React</h2>
                <button onClick={this.handleClick}>Click</button>
            </div>
        )
    }
}