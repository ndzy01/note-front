import React, { useState, useEffect } from 'react'
import { Button, Card, Tooltip, Pagination, message } from 'antd'
import { DeleteOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons'
import api from '../http/index'
import { createHashHistory } from 'history'
const history = createHashHistory()

export default function Home() {
  const [notes, setNotes] = useState([])
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(0)
  useEffect(() => {
    api('/page', 'POST', {
      page: page,
    }).then(res => {
      setNotes(res.data.data)
      setMaxPage(res.data.totalCount)
    })
  }, [page])
  return (
    <div>
      {notes.map((note: any) => (
        <Card
          key={note.id}
          title={note.cTime}
          extra={
            <span>
              <span style={{ marginRight: '10px' }}>
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
              <span style={{ marginRight: '10px' }}>
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
              <span style={{ marginRight: '10px' }}>
                {' '}
                <Tooltip title="删除">
                  <Button
                    shape="circle"
                    icon={<DeleteOutlined />}
                    onClick={() => {
                      api('delNote', 'POST', {
                        id: note.id,
                      }).then(res => {
                        api('/page', 'POST', {
                          page: page,
                        }).then(res => {
                          setNotes(res.data.data)
                          setMaxPage(res.data.totalCount)
                        })
                        message.info('已删除')
                      })
                    }}
                  />
                </Tooltip>
              </span>
            </span>
          }
          style={{ maxWidth: '90vw' }}
        >
          <p>{note.title}</p>
          <p></p>
        </Card>
      ))}
      <br />
      <Pagination
        current={page}
        onChange={(page: any) => {
          setPage(parseInt(page))
        }}
        total={maxPage}
      />
    </div>
  )
}
