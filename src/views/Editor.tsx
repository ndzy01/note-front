import React, { useState, useEffect } from 'react'
import BraftEditor from 'braft-editor'
import { Button, Input, message } from 'antd'
import api from '../http/index'
import { createHashHistory } from 'history'

const history = createHashHistory()

export default function Editor(props: any) {
  const [input, setInput] = useState('')
  const [id, setId] = useState('')
  const [content, setContent] = useState(BraftEditor.createEditorState(null))
  const controls: any = [
    'undo',
    'redo',
    'separator',
    'font-size',
    'line-height',
    'letter-spacing',
    'separator',
    'text-color',
    'bold',
    'italic',
    'underline',
    'strike-through',
    'separator',
    'superscript',
    'subscript',
    'remove-styles',
    // 'emoji',
    'separator',
    'text-indent',
    'text-align',
    'separator',
    'headings',
    'list-ul',
    'list-ol',
    'blockquote',
    'code',
    'separator',
    'link',
    'separator',
    'hr',
    'separator',
    'media',
    'separator',
    // 'clear',
  ]
  const noteSubmit = () => {
    if (input === '') {
      message.error('标题不能为空！')
    } else {
      api('/edit', 'POST', {
        id: id,
        title: input,
        content: content,
      }).then((res: any) => {
        message.info('编辑成功！')
        history.push({ pathname: '/' })
      })
    }
  }
  useEffect(() => {
    api(
      '/getNote',

      'POST',
      {
        id: props.location.pathname.substring(
          props.location.pathname.lastIndexOf('/') + 1
        ),
      }
    ).then((res) => {
      console.log(res.data.data)
      setInput(res.data.data.title)
      setId(res.data.data.id)
      setContent(BraftEditor.createEditorState(res.data.data.content))
    })
  }, [props])

  return (
    <div>
      <div className="flex-box">
        <p></p>
        <Input
          value={input}
          onChange={(e: any) => {
            setInput(e.target.value)
          }}
          placeholder="请输入！"
        />
        <Button
          type="primary"
          onClick={() => {
            noteSubmit()
          }}
        >
          提交
        </Button>
      </div>
      <div className="editor-wrapper">
        <BraftEditor
          controls={controls}
          value={content}
          onChange={(contents: any) => {
            setContent(contents.toHTML())
          }}
        />
      </div>
    </div>
  )
}
