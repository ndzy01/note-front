import React, { useState } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import 'braft-editor/dist/index.css'
import { Button, Input, Layout, Tooltip } from 'antd'
import { HomeOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons'
import { createHashHistory } from 'history'
import './App.css'
import Home from './views/Home'
import Add from './views/Add'
import Editor from './views/Editor'
import Show from './views/Show'
import MSearch from './views/Search'

const history = createHashHistory()

const { Header, Footer, Content } = Layout

function App() {
  const [input, setInput] = useState('')
  const [isShow, setIsShow] = useState(true)
  const app = (
    <div>
      {' '}
      <Layout>
        <Header
          style={{
            position: 'fixed',
            zIndex: 10000,
            width: '100%',
            background: '#fff',
            boxShadow: '0 2px 4px 0 rgba(0,0,0,.05)',
          }}
        >
          <Tooltip title="主页">
            <Button
              shape="circle"
              icon={<HomeOutlined />}
              onClick={() => history.push('/')}
            />
          </Tooltip>
          <Tooltip title="添加">
            <Button
              shape="circle"
              icon={<PlusOutlined />}
              onClick={() => history.push('/add')}
            />
          </Tooltip>
          <Tooltip title="搜索">
            <Button
              shape="circle"
              icon={<SearchOutlined />}
              onClick={() => history.push('/search')}
            />
          </Tooltip>
        </Header>
        <Content
          className="site-layout"
          style={
            window.innerWidth < 500
              ? { marginTop: 64 }
              : { padding: '0 50px', marginTop: 64 }
          }
        >
          <div
            className="site-layout-background"
            style={{ padding: 12, minHeight: 800 }}
          >
            <Router>
              <Route exact path="/" component={Home} />
              <Route path="/add" component={Add} />
              <Route path="/show" component={Show} />
              <Route path="/edit" component={Editor} />
              <Route path="/search" component={MSearch} />
            </Router>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          note ©2020 Created by NDZY
        </Footer>
      </Layout>
    </div>
  )
  const i = (
    <div
      style={{
        margin: '300px 50px',
      }}
    >
      <Input
        value={input}
        onChange={(e: any) => {
          if (e.target.value === 'ndzy') {
            setInput(e.target.value)
            setIsShow(true)
          }
          setInput(e.target.value)
        }}
        placeholder="请输入！"
      />
    </div>
  )
  return <div>{isShow ? app : i}</div>
}

export default App
