import React, {Component, createContext} from 'react';


//create context function is used to create the actual context
//The return value is an object containing two components Provider and Consumer
const {Provider, Consumer } = createContext('permissions');

export class PermissionProvider extends Component {

    //the state contains the actual data that components might want to use. In this example if the value is true then the feature should be displayed as normal. If its false then the feature doesn't have permission to render
    state = {
        first: true, 
        second: true,
        third: false
    }

    //the value that is rendered is the Provider Component
     render() {
         return ( 
             <Provider value={this.state}>{this.props.children}</Provider>
         )
     }
}


//abstraction for permission consumers
//instead of having every component that needs to test for permissions implement the same logic over and over the Permission Consumer component can do it. The child of the consumer component is always a function that takes the context data as an argument.In this example the PermissionConsumer component has a name property for the name of the feature. This is compared with the value from the context and if it's false - nothing is rendered.

const PermissionConsumer = ({ name, children }) => (
    <Consumer>{value => value[name] && children}</Consumer>
);

export {PermissionConsumer };