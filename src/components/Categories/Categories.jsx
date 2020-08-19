import React from "react";
import { Menu, Dropdown, Icon } from "antd";





export default function Categories(props) {

  const { categories, handleChangeCategory } = props;

  const categoryMenu = (
    <Menu>
      {categories.map((category, i) => {
        return (
          <Menu.Item key={`Category-${i}`}>
            <a onClick={(e) => handleChangeCategory(e.currentTarget.innerHTML)}>{category}</a>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  return (
    <Dropdown overlay={categoryMenu}>
      <a className="ant-dropdown-link" href="#">
        <Icon type="down" /> <>Categories: </>
      </a>
    </Dropdown>
  );
}
