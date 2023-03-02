"use client";

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

class InitiativeList extends Component<{}, any> {
  activeCharacter: number = 0;
  nextCharacter: number = 1;
  initiativeOrder: number[] = [];
  constructor(props: {}) {
    super(props);
    this.state = { inputList: [] };
    this.addItem = this.addItem.bind(this);
    this.next = this.next.bind(this);
    this.sort = this.sort.bind(this);
  }

  addItem() {
    const inputList = this.state.inputList;
    let className: string = "initiative-item";
    const itemToAdd = (
      <div className={className} key={inputList.length} id={inputList.length}>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              htmlFor="name"
              className="block text-gray-500 font-bold labelText mb-1 md:mb-0 pr-4"
            >
              Name
            </label>
          </div>
          <div className="md:w-2/3 items-end">
            <input
              id="name"
              type={"text"}
              className="inputText bg-gray-100 appearance-none w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              htmlFor="health"
              className="block text-gray-500 font-bold labelText mb-1 md:mb-0 pr-4"
            >
              HP
            </label>
          </div>
          <div className="md:w-2/3 items-end">
            <input
              id="health"
              type={"number"}
              min="0"
              className="inputText bg-gray-100 appearance-none w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              htmlFor={"initiative"}
              className="block text-gray-500 font-bold labelText mb-1 md:mb-0 pr-4"
            >
              Initiative
            </label>
          </div>
          <div className="md:w-2/3 items-end">
            <input
              id={"initiative_" + inputList.length}
              name="initiative"
              type={"number"}
              min="0"
              className="inputText bg-gray-100 appearance-none w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            />
          </div>
        </div>
      </div>
    );

    this.setState({
      inputList: inputList.concat(itemToAdd),
    });

    this.activeCharacter = 0;
    this.nextCharacter = 1;
    for (let index = 0; index < inputList.length; index++) {
      document.getElementById(index.toString())?.classList.remove("active");
    }
    let index = this.initiativeOrder[0] || 0;
    document.getElementById(index.toString())?.classList.add("active");
  }

  next() {
    const inputList = this.state.inputList;
    document
      .getElementById(this.initiativeOrder[this.activeCharacter].toString())
      ?.classList.toggle("active");
    document
      .getElementById(this.initiativeOrder[this.nextCharacter].toString())
      ?.classList.toggle("active");
    if (this.nextCharacter == inputList.length - 1) {
      this.nextCharacter = 0;
    } else {
      this.nextCharacter++;
    }
    if (this.activeCharacter == inputList.length - 1) {
      this.activeCharacter = 0;
    } else {
      this.activeCharacter++;
    }
  }

  sort() {
    const inputList = this.state.inputList.sort((a: any, b: any) =>
      a.key > b.key ? 1 : -1
    );
    // eslint-disable-next-line no-undef
    let itemList: JSX.Element[] = [];
    let initiativeList: HTMLInputElement[] = [];

    for (let i = 0; i < inputList.length; i++) {
      this.initiativeOrder[i] = i;
      itemList[i] = inputList[i];
      initiativeList[i] = document.getElementById(
        "initiative_" + i.toString()
      ) as HTMLInputElement;
    }

    for (let i = 0; i < inputList.length - 1; i++) {
      for (let j = 0; j < inputList.length - 1; j++) {
        const initiativeNumber = Number(initiativeList[j].value) || 0;
        const nextInitiative = Number(initiativeList[j + 1].value) || 0;

        if (initiativeNumber < nextInitiative)
          this.swapIndexes(itemList, initiativeList, j);
      }
    }

    this.setState({
      inputList: itemList,
    });

    for (let i = 0; i < inputList.length - 1; i++) {
      document.getElementById(i.toString())?.classList.remove("active");
    }
    document
      .getElementById(this.initiativeOrder[0].toString())
      ?.classList.add("active");
  }

  swapIndexes(
    // eslint-disable-next-line no-undef
    itemList: JSX.Element[],
    initiativeList: HTMLInputElement[],
    firstIndex: number
  ) {
    let nextIndex = firstIndex++;

    let tempItem = itemList[firstIndex];
    let tempInitiative = initiativeList[firstIndex];
    let tempIndex = this.initiativeOrder[firstIndex];

    itemList[firstIndex] = itemList[nextIndex];
    initiativeList[firstIndex] = initiativeList[nextIndex];
    this.initiativeOrder[firstIndex] = this.initiativeOrder[nextIndex];

    itemList[nextIndex] = tempItem;
    initiativeList[nextIndex] = tempInitiative;
    this.initiativeOrder[nextIndex] = tempIndex;
  }

  render(): React.ReactNode {
    return (
      <div>
        <button type="button" onClick={this.addItem}>
          Add a character
        </button>
        <div></div>
        <button type="button" onClick={this.next} className="w-1/2">
          Next
        </button>
        <button type="button" onClick={this.sort} className="w-1/2">
          Sort
        </button>

        {this.state.inputList.map((input: any) => input)}
      </div>
    );
  }
}
