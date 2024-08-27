import React,{useRef} from 'react'
import type { FC } from 'react'
import { NavBar, TabBar, Footer, Tag, Button, Dropdown,Grid } from 'antd-mobile'
import { DropdownRef } from 'antd-mobile/es/components/dropdown'
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  MemoryRouter as Router,
} from 'react-router-dom'
import {
  AppOutline,
  MessageOutline,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons'
import { GiHouse } from "react-icons/gi";
import "./index.css"
import { Device } from '../Shebei'
import { Home } from '../Home'
import { Message } from '../Message'
import { Personal } from '../Wode'

const Bottom: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { pathname } = location

  const setRouteActive = (value: string) => {
    navigate(value)
  }

  const tabs = [
    {
      key: '/home',
      title: '首页',
      icon: <AppOutline />,
    },
    {
      key: '/device',
      title: '设备',
      icon: <UnorderedListOutline />,
    },
    {
      key: '/message',
      title: '消息',
      icon: <MessageOutline />,
    },
    {
      key: '/me',
      title: '我的',
      icon: <UserOutline />,
    },
  ]

  return (
    <TabBar activeKey={pathname} onChange={(value: string) => setRouteActive(value)}>
      {tabs.map(item => (
        <TabBar.Item className="label-size" key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  )
}

export const MyHome = () => {
  const ref = useRef<DropdownRef>(null)
  return (
    <Router initialEntries={['/home']}>
      <div className="app">
        <div className="top">
          <div className='div-footer'>
          <GiHouse className='githouse-styles'/>
          <text style={{fontSize:"20px"}}>Smart Room</text>
          </div>
        </div>
        <div className="body">
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/device' element={<Device />} />
            <Route path='/message' element={<Message />} />
            <Route path='/me' element={<Personal />} />
          </Routes>
        </div>
        <div className="bottom">
          <Bottom />
        </div>
      </div>
    </Router>
  )
}

