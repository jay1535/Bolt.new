import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"

import { FaBolt } from 'react-icons/fa6'
import { Button } from '../button'
import { MessageCircleCodeIcon } from 'lucide-react'
import WorkSpaceHistory from './WorkSpaceHistory'

function AppSideBar() {
  return (
    <Sidebar>
      <SidebarHeader className='p-5'>
        <FaBolt className='text-2xl m-1  text-blue-600'/>
      </SidebarHeader>
      <SidebarContent className='p-5'>
        <Button><MessageCircleCodeIcon/>Start New Chat</Button>
        <SidebarGroup>
            <WorkSpaceHistory/>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

export default AppSideBar
