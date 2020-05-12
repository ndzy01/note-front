import React, { useState, useEffect } from 'react'
import { Button, Card, Tooltip, Pagination, message } from 'antd'
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { createHashHistory } from 'history'
import apiP from '../http'

const history = createHashHistory()

export default function Home() {
  const [notes, setNotes] = useState([])
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(0)

  useEffect(() => {
    apiP('/page', 'POST', {
      page: page,
    }).then((res) => {
      setNotes(res.data.data)
      setMaxPage(parseInt(res.data.totalCount))
    })
  }, [page])

  return (
    <div className="Home">
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
                      apiP('/delete', 'POST', {
                        id: note.id,
                      }).then((res) => {
                        message.success('successfully deleted')
                        apiP('/page', 'POST', {
                          page: page,
                        }).then((res) => {
                          setNotes(res.data.data)
                          setMaxPage(parseInt(res.data.totalCount))
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
      <p className="centerF">
        <span className="centerS">
          {notes.length === 0 ? (
            '暂无相关数据'
          ) : (
            <Pagination
              current={page}
              onChange={(page: any) => {
                setPage(parseInt(page))
              }}
              total={maxPage}
            />
          )}
        </span>
      </p>
    </div>
  )
}
