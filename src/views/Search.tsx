import React, { useState, useEffect } from 'react'
import { Button, Input, Tooltip, Card, message, Form } from 'antd'
import api from '../http/index'
import { createHashHistory } from 'history'
import { DeleteOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons'

const history = createHashHistory()

export default function Search() {
  const [notes, setNotes] = useState([])
  const [input, setInput] = useState('')

  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 18 },
  }
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  }

  useEffect(() => {
    if (input !== '') {
      api('/search', 'POST', {
        content: input,
      }).then((res) => {
        setNotes(res.data.data)
      })
    }
  }, [input])
  return (
    <div className="Search">
      <Form
        {...layout}
        onFinish={(values) => {
          setInput(values.title)
        }}
      >
        <Form.Item
          label="Text title"
          name="title"
          rules={[{ required: true, message: 'The title cannot be empty!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      {notes.map((note: any) => (
        <Card
          key={note.id}
          title={note.cTime}
          extra={
            <span>
              <span className="m-right">
                <Tooltip title="show">
                  <Button
                    shape="circle"
                    icon={<EyeOutlined />}
                    onClick={() =>
                      history.push({ pathname: '/show/' + note.id })
                    }
                  />
                </Tooltip>
              </span>
              <span className="m-right">
                <Tooltip title="edit">
                  <Button
                    shape="circle"
                    icon={<EditOutlined />}
                    onClick={() =>
                      history.push({ pathname: '/edit/' + note.id })
                    }
                  />
                </Tooltip>
              </span>
              <span className="m-right">
                <Tooltip title="delete">
                  <Button
                    shape="circle"
                    icon={<DeleteOutlined />}
                    onClick={() => {
                      api('/delete', 'POST', {
                        id: note.id,
                      }).then((res) => {
                        message.success('successfully deleted')
                        api('/search', 'POST', {
                          content: input,
                        }).then((res) => {
                          setNotes(res.data.data)
                        })
                      })
                    }}
                  />
                </Tooltip>
              </span>
            </span>
          }
          className="m-card"
        >
          <p>{note.title}</p>
          <p>--- Last modified time：{note.mTime}</p>
        </Card>
      ))}
    </div>
  )
}
