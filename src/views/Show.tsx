import React, { useState, useEffect } from 'react'
// import { CodeHighlighter } from 'braft-extensions'
import apiP from '../http'

export default function Edit(props: any) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [modifyTime, setModifyTime] = useState('')

  useEffect(() => {
    apiP('/getNote', 'POST', {
      id: props.location.pathname.substring(
        props.location.pathname.lastIndexOf('/') + 1
      ),
    }).then((res) => {
      setTitle(res.data.data.title)
      setContent(res.data.data.content)
      setModifyTime(res.data.data.mTime)
    })
  }, [props])

  return (
    <div className="Show">
      <p>--- Last modified time：{modifyTime}</p>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  )
}
