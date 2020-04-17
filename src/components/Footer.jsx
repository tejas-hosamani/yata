import React, { useState, useEffect } from "react";
import { Affix, Button, Menu, Dropdown, Avatar, Icon } from "antd";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { addToHistory } from "../actions/todoHistoryActions";

function Footer(props) {
  const { location, history, addNewTodoHistory } = props;
  const [buttonProperties, setButtonProperties] = useState({
    locationPath: "",
    locationName: "",
  });

  useEffect(() => {
    switch (location.pathname) {
      case "/template":
        setButtonProperties({
          locationPath: "/",
          locationName: "< Home",
        });
        break;

      case "/":
        setButtonProperties({
          locationPath: "/template",
          locationName: "Edit Template >",
        });
        break;

      default:
        return null;
    }
  }, [location.pathname]);

  const goToSelectedLocation = () => {
    history.push(buttonProperties.locationPath);
  };

  const saveCurrentProgress = () => {
    addNewTodoHistory();
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <Button onClick={goToSelectedLocation} type="link">
          {buttonProperties.locationName}
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button onClick={saveCurrentProgress} type="link">
          Save today's progress
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Affix offsetBottom={20} style={{ position: "absolute", right: 20 }}>
        <Dropdown overlay={menu} trigger={["click"]} placement="topRight">
          <Avatar
            size={50}
            style={{
              backgroundColor: "#1890ff50",
            }}
            icon={<Icon type="appstore" theme="twoTone" />}
          />
        </Dropdown>
      </Affix>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewTodoHistory: () => dispatch(addToHistory()),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Footer));