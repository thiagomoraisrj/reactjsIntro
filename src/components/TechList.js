import React, { Component } from "react";

import TechItem from "./TechItem";

class TechList extends Component {
  // static defaultProps = {
  //   tech: "Oculto"
  // };

  state = {
    newTech: "",
    techs: []
  };

  //Executa sempre que o componente aparece na tela
  componentDidMount() {
    const techs = localStorage.getItem("techs");

    if (techs) {
      this.setState({ techs: JSON.parse(techs) });
    }
  }

  //Aparece sempre que o componente sofre alguma alteração no estado ou prop
  componentDidUpdate(prevProps, prevState) {
    if (this.state.techs != prevState.techs) {
      localStorage.setItem("techs", JSON.stringify(this.state.techs));
    }
  }

  //Executado quando o componente deixa de existir
  componentWillUnmount() {}

  handleInputChange = e => {
    this.setState({ newTech: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({
      techs: [...this.state.techs, this.state.newTech],
      newTech: ""
    });
  };

  handleDelete = tech => {
    this.setState({ techs: this.state.techs.filter(t => t != tech) });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ul>
          {this.state.techs.map(tech => (
            <TechItem
              key={tech}
              tech={tech}
              onDelete={() => {
                this.handleDelete(tech);
              }}
            />
          ))}
        </ul>
        <input
          type="text"
          onChange={this.handleInputChange}
          value={this.state.newTech}
        />
        <button type="submit">Enviar</button>
      </form>
    );
  }
}

export default TechList;
