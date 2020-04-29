import React, { useState, useEffect } from 'react'
import { Button, Input, Tooltip, Card, message } from 'antd'
import api from '../http/index'
import { createHashHistory } from 'history'
import { DeleteOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons'

const history = createHashHistory()

export default function Search() {
  const [notes, setNotes] = useState([])
  const [input, setInput] = useState('')

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
    <div>
      <Input
        value={input}
        onChange={(e: any) => {
          setInput(e.target.value)
        }}
        placeholder="请输入！"
        className="m-bottom"
      />
      {notes.map((note: any) => (
        <Card
          key={note.id}
          title={note.cTime}
          extra={
            <span>
              <span className="m-right">
                {' '}
                <Tooltip title="展示">
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
                {' '}
                <Tooltip title="编辑">
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
                {' '}
                <Tooltip title="删除">
                  <Button
                    shape="circle"
                    icon={<DeleteOutlined />}
                    onClick={() => {
                      api('/delNote', 'POST', {
                        id: note.id,
                      }).then((res) => {
                        api('/search', 'POST', {
                          content: input,
                        }).then((res) => {
                          setNotes(res.data.data)
                        })
                        message.info('已删除')
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
          <p></p>
        </Card>
      ))}
    </div>
  )
}
