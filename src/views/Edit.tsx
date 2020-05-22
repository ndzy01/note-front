import React, { useState, useEffect } from 'react'
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
import { Button, Input, message, Upload } from 'antd'
import apiP from '../http'
import { createHashHistory } from 'history'

const history = createHashHistory()

export default function Edit(props: any) {
  // const [form] = useForm()
  const [title, setTitle] = useState('')
  const [noteId, setNoteId] = useState('')
  const [content, setContent] = useState(BraftEditor.createEditorState(null))
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

  const uploadProps = {
    name: 'file',
    action: 'http://www.ndzy01.com:3889/upload',
    headers: {
      authorization: 'authorization-text',
    },
  }

  const extendControls: any = [
    {
      key: 'antd-uploader',
      type: 'component',
      component: (
        <Upload
          {...uploadProps}
          accept="image/*"
          showUploadList={false}
          onChange={(info: any) => {
            if (info.file.status !== 'uploading') {
              // console.log(info.file, info.fileList)
            }
            if (info.file.status === 'done') {
              message.success(`${info.file.name} file uploaded successfully`)
              setContent(
                ContentUtils.insertMedias(content, [
                  {
                    type: 'IMAGE',
                    url: info.file.response.data.url,
                  },
                ])
              )
            } else if (info.file.status === 'error') {
              message.error(`${info.file.name} file upload failed.`)
            }
          }}
        >
          <Button
            className="control-item button upload-button"
            data-title="插入图片"
          >
            插入图片
          </Button>
        </Upload>
      ),
    },
  ]

  useEffect(() => {
    apiP('/getNote', 'POST', {
      id: props.location.pathname.substring(
        props.location.pathname.lastIndexOf('/') + 1
      ),
    }).then((res) => {
      setTitle(res.data.data.title)
      setNoteId(res.data.data.id)
      setContent(BraftEditor.createEditorState(res.data.data.content))
    })
  }, [props])

  return (
    <div className="Edit">
      <div>
        <div style={{ marginBottom: '20px', display: 'flex' }}>
          <Input readOnly value={title} />{' '}
          <Button
            type="primary"
            onClick={() => {
              apiP('/edit', 'POST', {
                id: noteId,
                title,
                content: content.toHTML(),
              }).then((res) => {
                message.success('successfully edited')
                history.push({ pathname: '/' })
              })
            }}
          >
            Submit
          </Button>
        </div>
        <div>
          <BraftEditor
            className="my-editor"
            value={content}
            controls={controls}
            extendControls={extendControls}
            onChange={(editorState) => {
              setContent(editorState)
            }}
            placeholder="Please enter the text content!"
          />
        </div>
      </div>
    </div>
  )
}
