import React, { Component } from "react";
/* COMPONENTS */
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  LinkList,
  LinkListItem,
  AvatarContainer,
  AvatarWrapper,
  AvatarIcon,
  AvatarExtraText,
  Row,
  Col,
  Icon,
} from "design-react-kit";
/* STYLES */
import "../../assets/styles/Header.css";

export default class MainFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownOpen: false,
    };
  }

  SetState(stateName, value) {
    this.setState({ [stateName]: value });
  }

  render() {
    return (
      <Dropdown
        a11y
        active={false}
        addonType={false}
        direction="down"
        inNavbar={false}
        isOpen={this.state.dropDownOpen}
        nav={false}
        setActiveFromChild={false}
        toggle={() => this.SetState("dropDownOpen", !this.state.dropDownOpen)}
      >
        <DropdownToggle
          aria-haspopup
          caret
          className="btn btn-dropdown"
          color="secondary"
          tag="span"
        >
          <AvatarContainer tag="div">
            <AvatarWrapper extra="text" tag="div">
              <AvatarIcon size="lg" tag="div">
                <img
                  alt="Guilia Neri"
                  src="https://randomuser.me/api/portraits/women/33.jpg"
                />
              </AvatarIcon>
              <AvatarExtraText tag="div">
                <span>Guilia Neri</span>
                <Icon color="" icon="it-expand" padding={false} size="" />
                {/* <p>Lorem ipsum dolor</p> */}
              </AvatarExtraText>
            </AvatarWrapper>
          </AvatarContainer>
        </DropdownToggle>
        <DropdownMenu flip tag="div">
          <LinkList tag="div">
            <LinkListItem tag="a">Azione 1</LinkListItem>
            <LinkListItem tag="a">Azione 2</LinkListItem>
            <LinkListItem tag="a">Azione 3</LinkListItem>
          </LinkList>
        </DropdownMenu>
      </Dropdown>
    );
  }
}
