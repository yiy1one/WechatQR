import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Welcome from '../../components/Welcome'
import AutoReply from '../../components/AutoReply'
import './index.css'

import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;


class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
    }
  }
  render() { 
    return (
      <Router>
        <div>
          <Route exact path="/welcome" component={Welcome} />
          

          <Layout style={{ minHeight: '100vh' }}>
            <Sider
              collapsible
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse}
            >
            <div className="logo" />
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">

                <Menu.Item key="1">
                  <Icon type="pie-chart" />
                  <span>Option 1</span>
                </Menu.Item>

                <Menu.Item key="2">
                  <Icon type="desktop" />
                  <span>Option 2</span>
                </Menu.Item>

                <SubMenu
                  key="sub1"
                  title={<span><Icon type="wechat" /><span>微信</span></span>}
                >
                  <Menu.Item key="3"><Link to="/autoreply/">自动回复</Link></Menu.Item>
                  <Menu.Item key="4">Bill</Menu.Item>
                  <Menu.Item key="5">Alex</Menu.Item>
                </SubMenu>

                <SubMenu
                  key="sub2"
                  title={<span><Icon type="team" /><span>Team</span></span>}
                >
                  <Menu.Item key="6">Team 1</Menu.Item>
                  <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="9">
                  <Icon type="file" />
                  <span>File</span>
                </Menu.Item>
              </Menu>

            </Sider>

        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />

          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Route exact path="/autoReply" component={AutoReply} />
            </div>
          </Content>

          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>

        </Layout>
      </Layout>

        </div>
        
      </Router>
    )
  }
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }
}


export default Index