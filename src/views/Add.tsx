import React from 'react'
import BraftEditor from 'braft-editor'
import { Button, Input, message, Form } from 'antd'
import apiP from '../http'
import { createHashHistory } from 'history'

const history = createHashHistory()
const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 18 },
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

export default function Add() {
  const controls: any = [
    'headings',
    'font-size',
    'list-ul',
    'list-ol',
    'text-color',
    'bold',
    'italic',
    'underline',
    'hr',
    'link',
    'clear',
  ]
  return (
    <div className="Add">
      <Form
        {...layout}
        onFinish={(values) => {
          apiP('/save', 'POST', {
            title: values.title,
            content: values.content.toHTML(),
          }).then((res) => {
            message.success('successfully added')
            history.push({ pathname: '/' })
          })
        }}
      >
        <Form.Item
          label="Text title"
          name="title"
          rules={[{ required: true, message: 'The title cannot be empty!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Text content"
          name="content"
          rules={[{ required: true, message: 'Please edit the content!' }]}
        >
          <BraftEditor
            className="my-editor"
            controls={controls}
            placeholder="Please enter the text content!"
          />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
