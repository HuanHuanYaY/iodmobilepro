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

import "./index.css"

export const Message=()=>{
    return(
        <>
            <div>
                开发中
            </div>
        </>
    )

}