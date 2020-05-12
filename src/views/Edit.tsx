import React, { useState, useEffect } from 'react'
import BraftEditor from 'braft-editor'
import { Button, Input, message, Form } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import apiP from '../http'
import { createHashHistory } from 'history'

const history = createHashHistory()

export default function Edit(props: any) {
  const [form] = useForm()
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
  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 18 },
  }
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  }

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
      <Form
        name="editForm"
        {...layout}
        form={form}
        onFinish={(values) => {
          apiP('/edit', 'POST', {
            id: noteId,
            title: values.title,
            content: values.content.toHTML(),
          }).then((res) => {
            message.success('successfully edited')
            history.push({ pathname: '/' })
          })
        }}
      >
        {form.setFieldsValue({ title, content: content })}
        <Form.Item label="Text title" name="title">
          <Input readOnly />
        </Form.Item>
        <Form.Item
          label="Text content"
          name="content"
          rules={[{ required: true, message: 'Please edit the content!' }]}
        >
          <BraftEditor
            className="my-editor"
            controls={controls}
            placeholder="Please enter the text content!"
          />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
