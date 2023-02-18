"use client"

import React, { Component } from "react";

export default function InitiativeTracker() {
    return (
        <div className="w-25 h-full flex">
            <section className="w-64 text-center border-r-2 border-r-light h-full pr-8 overflow-y-scroll">
                <h1 className="underline">Initiative tracker</h1>
                <InitiativeItem />
            </section>
        </div>
    );
}

class InitiativeItem extends React.Component<{}, any> {
    constructor(props: {}) {
        super(props);
        this.state = { inputList: [] };
        this.addItem = this.addItem.bind(this);
    }

    addItem() {
        const inputList = this.state.inputList;
        this.setState({
            inputList: inputList.concat(<Input key={inputList.length} />)
        });
    }

    render(): React.ReactNode {
        return (
            <div>
                <button type="button" onClick={this.addItem}>Add a character</button>
                {this.state.inputList.map(function (input, index) {
                    return input;
                })}
            </div>
        );
    }
}

class Input extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <label htmlFor="health" className="float-left">HP</label>
                    <input id="health" value="0" type={"number"} min="0" className="border-solid float-right" />
                </div>
            </div>
        );
    }
}