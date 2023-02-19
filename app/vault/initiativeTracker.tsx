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
    activeCharacter: number = 0;
    nextCharacter: number = 1;
    constructor(props: {}) {
        super(props);
        this.state = { inputList: [] };
        this.addItem = this.addItem.bind(this);
        this.next = this.next.bind(this);
    }

    addItem() {
        const inputList = this.state.inputList;
        let className: string = "initiative-item"
        const itemToAdd = (
            <div className={className} key={inputList.length} id={inputList.length}>
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
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label htmlFor="initiative" id={"initiative_" + inputList.length} className="block text-gray-500 font-bold labelText mb-1 md:mb-0 pr-4">Initiative</label>
                    </div>
                    <div className="md:w-2/3 items-end">
                        <input id="initiative" type={"number"} min="0" className="inputText bg-gray-100 appearance-none w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
                    </div>
                </div>
            </div>
        )

        this.setState({
            inputList: inputList.concat(itemToAdd)
        });

        this.activeCharacter = 0;
        this.nextCharacter = 1;
        for (let index = 0; index < inputList.length; index++) {
            document.getElementById(index.toString())?.classList.remove("active")
        }
        document.getElementById("0")?.classList.add("active")
    }

    next() {
        const inputList = this.state.inputList;
        document.getElementById(this.activeCharacter.toString())?.classList.toggle("active")
        document.getElementById(this.nextCharacter.toString())?.classList.toggle("active")
        if (this.nextCharacter == inputList.length - 1) { this.nextCharacter = 0 }
        else { this.nextCharacter++ }
        if (this.activeCharacter == inputList.length - 1) { this.activeCharacter = 0 }
        else { this.activeCharacter++ }
    }

    sort() {
        const inputList = this.state.inputList;
        document.getElementById(this.activeCharacter.toString())?.classList.toggle("active")
        document.getElementById(this.nextCharacter.toString())?.classList.toggle("active")
    }

    render(): React.ReactNode {
        return (
            <div>
                <button type="button" onClick={this.addItem}>Add a character</button>
                <div></div>
                <button type="button" onClick={this.next}>Next</button>
                <div></div>
                <button type="button" onClick={this.sort}>Sort</button>

                {this.state.inputList.map(function (input, index) {

                    return input;
                })}
            </div>
        );
    }
}