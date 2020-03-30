import React, { useState } from 'react'
import { createHashHistory } from 'history'
import BraftEditor from 'braft-editor'
import { Button, Input, message } from 'antd'
import api from '../http/index'
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
  return (
    <div>
      <div
        style={{
          display: 'flex',
        }}
      >
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
              ).then(res => {
                message.success('已成功添加！')
                history.push({ pathname: '/' })
              })
            }
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
