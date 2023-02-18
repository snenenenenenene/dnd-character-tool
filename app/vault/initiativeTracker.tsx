"use client"

import React, { Component } from "react";
import "./InitiativeStyle.css";

export default function InitiativeTracker() {
    return (
        <div className="w-25 h-full flex">
            <section className="w-64 text-center border-l-2 border-gray-200 h-full overflow-y-scroll scrollbar-hide">
                <h1 className="underline">Initiative tracker</h1>
                <InitiativeList />
            </section>
        </div>
    );
}

class InitiativeList extends React.Component<{}, any> {
    nextCharacter: number = 0;
    constructor(props: {}) {
        super(props);
        this.state = { inputList: [] };
        this.addItem = this.addItem.bind(this);
        this.next = this.next.bind(this);
    }

    addItem() {
        const inputList = this.state.inputList;
        this.setState({
            inputList: inputList.concat(
                <div className="initiative-item" key={inputList.length}>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label htmlFor="name" className="block text-gray-500 font-bold labelText mb-1 md:mb-0 pr-4">Name</label>
                    </div>
                    <div className="md:w-2/3 items-end">
                        <input id="name" type={"text"} className="inputText bg-gray-100 appearance-none w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label htmlFor="health" className="block text-gray-500 font-bold labelText mb-1 md:mb-0 pr-4">HP</label>
                    </div>
                    <div className="md:w-2/3 items-end">
                        <input id="health" type={"number"} min="0" className="inputText bg-gray-100 appearance-none w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
                    </div>
                </div>
            </div>
            )
        });
    }

    next(){
        const inputList = this.state.inputList;
        // inputList[this.nextCharacter]
        console.log(inputList[this.nextCharacter])
        if(this.nextCharacter == inputList.length - 1){this.nextCharacter = 0}
        else{this.nextCharacter++}
    }

    render(): React.ReactNode {
        return (
            <div>
                <button type="button" onClick={this.addItem}>Add a character</button>
                <div></div>
                <button type="button" onClick={this.next}>Next</button>
                
                {this.state.inputList.map(function (input, index) {

                    return input;
                })}
            </div>
        );
    }
}

// class InitiativeItem extends React.Component {
//     className:string = "initiative-item";
//     constructor(props: {}){
//         super(props)
//     }
    

//     isNext() {
//         this.className = "initiative-item active"
//     }
    
//     render() {
//         this.isNext()
//         return (
//             <div className={this.className}>
//                 <div className="md:flex md:items-center mb-6">
//                     <div className="md:w-1/3">
//                         <label htmlFor="name" className="block text-gray-500 font-bold labelText mb-1 md:mb-0 pr-4">Name</label>
//                     </div>
//                     <div className="md:w-2/3 items-end">
//                         <input id="name" type={"text"} className="inputText bg-gray-100 appearance-none w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
//                     </div>
//                 </div>
//                 <div className="md:flex md:items-center mb-6">
//                     <div className="md:w-1/3">
//                         <label htmlFor="health" className="block text-gray-500 font-bold labelText mb-1 md:mb-0 pr-4">HP</label>
//                     </div>
//                     <div className="md:w-2/3 items-end">
//                         <input id="health" type={"number"} min="0" className="inputText bg-gray-100 appearance-none w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }