import React, { useState } from 'react'
import BraftEditor from 'braft-editor'
import { Button, Input, message } from 'antd'
import api from '../http/index'
import { createHashHistory } from 'history'

const history = createHashHistory()

export default function Add() {
  const [input, setInput] = useState('')
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
      api(
        '/save',

        'POST',
        {
          title: input,
          content: content,
        }
      ).then((res) => {
        message.success('已成功添加！')
        history.push({ pathname: '/' })
      })
    }
  }
  return (
    <div>
      <div className="flex-box">
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
