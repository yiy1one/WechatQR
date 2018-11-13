import React, { Component } from 'react'
import './index.css'
import { Form, Input, Row, Col, Icon, Button, Card, List, message } from 'antd'
import axios from 'axios'
const FormItem = Form.Item
const { Meta } = Card




class AutoReply extends Component {
  constructor(props) {
    super(props)
    this.state = {
      event: '',
      reply: '',
      list: []
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.getQR = this.getQR.bind(this)
  }


  render() {
    return (
      <div>
        <Row>
          <Col span={8}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem className="ant-form-item"
              label="回复Event"
            >
              <Input name="event" value={this.state.event} onChange={this.handleInputChange}></Input>
            </FormItem>

            <FormItem className="ant-form-item"
              label="回复内容"
            >
              <Input name="reply" value={this.state.reply} onChange={this.handleInputChange}></Input>
            </FormItem>

            <FormItem className="ant-form-item">
              <Button type="primary" onClick={this.getQR}>获取二维码</Button>
            </FormItem>
          </Form>
          </Col>

          <Col span={16}>
            <div className="list">
              <List
                itemLayout="vertical"
                size="large"
                pagination={{
                  onChange: (page) => {
                    console.log(page);
                  },
                  pageSize: 3,
                }}
                dataSource={this.state.list}
                footer={<div>共{this.state.list.length}条</div>}
                renderItem={item => (
                  <List.Item
                    key={item.event}
                    actions={[<Icon type="delete" onClick={this.delete} />]}
                    extra={<img width={100} alt="logo" src={item.base64} />}
                  >
                    <List.Item.Meta
                      title={<a href={item.href}>{item.event}</a>}
                      description={`事件名称：${item.event}`}
                    />
                    回复内容：{item.reply}
                  </List.Item>
                )}
              />
            </div>
          </Col>
        </Row>
      </div>
    )
  }
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  getQR() {
    axios.post('/reply/config',{
      params:{
        event: this.state.event,
        reply: this.state.reply
      }
    }).then(res =>{
      message.info('添加成功')
      this.getList()
    })
  }

  delete(){
    
  }

  getList() {
    axios.get('/reply/list').then((res) => {
      this.setState({
        list: res.data.reverse()
      })
    })
  }

  componentWillMount() {
    this.getList()
  }
}

export default AutoReply