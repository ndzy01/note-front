import React, { useState } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import { Button, Layout, Tooltip, message, Input } from 'antd'
import { HomeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { createHashHistory } from 'history'
import './styles/css/index.css'

import Home from './views/Home'
import Add from './views/Add'
import Edit from './views/Edit'
import Show from './views/Show'
import Search from './views/Search'

message.config({
  top: 100,
  duration: 1,
  maxCount: 3,
})

const history = createHashHistory()
const { Header, Footer, Content } = Layout

function App() {
  const [input, setInput] = useState('')
  const [isShow, setIsShow] = useState(
    // process.env.NODE_ENV === 'development' ? true : false
    process.env.NODE_ENV === 'development' ? false : true
  )
  const app = (
    <Layout>
      <Header className="m-header centerF">
        <Tooltip title="home" className="m-right centeS">
          <Button
            shape="circle"
            icon={<HomeOutlined />}
            onClick={() => history.push('/')}
          />
        </Tooltip>
        <Tooltip title="add note" className="m-right">
          <Button
            shape="circle"
            icon={<PlusOutlined />}
            onClick={() => history.push('/add')}
          />
        </Tooltip>
        <Tooltip title="search" className="m-right">
          <Button
            shape="circle"
            icon={<SearchOutlined />}
            onClick={() => history.push('/search')}
          />
        </Tooltip>
      </Header>
      <Content className="site-layout m-content">
        <div className="site-layout-background main">
          <Router>
            <Route exact path="/" component={Home} />
            <Route path="/add" component={Add} />
            <Route path="/edit" component={Edit} />
            <Route path="/show" component={Show} />
            <Route path="/search" component={Search} />
          </Router>
        </div>
      </Content>
      <Footer className="m-footer">
        <p className="centerF">
          <span className="centerS">note ©2020 created by ndzy</span>
        </p>
      </Footer>
    </Layout>
  )
  const i = (
    <div className="m-center">
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
  return <div className="App">{isShow ? app : i}</div>
}

export default App
