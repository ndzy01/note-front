import React, { useState, useEffect } from 'react'
import BraftEditor from 'braft-editor'
import api from '../http/index'

export default function Show(props: any) {
  const [content, setContent] = useState(BraftEditor.createEditorState(null))
  const [input, setInput] = useState('')
  const [mTime, setMTime] = useState('')
  const controls: any = []
  useEffect(() => {
    api('/getNote', 'POST', {
      id: props.location.pathname.substring(
        props.location.pathname.lastIndexOf('/') + 1
      ),
    }).then(res => {
      setContent(BraftEditor.createEditorState(res.data.data.content))
      setInput(res.data.data.title)
      setMTime(res.data.data.mTime)
    })
  }, [props])
  return (
    <div>
      <h1
        style={{
          padding: '10px',
        }}
      >
        {input}
      </h1>
      <p>
        <span>最后修改时间:{mTime}</span>
      </p>
      <div className="editor-wrapper">
        <BraftEditor controls={controls} value={content} />
      </div>
    </div>
  )
}
