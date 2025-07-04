"use client"
import { useConvex } from 'convex/react';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect } from 'react'
import { api } from '../../../../convex/_generated/api';
import { MessagesContext } from '@/context/MessagesContext';

function ChatView() {
    const {id} = useParams();
    const convex =useConvex();
    const {messages,setMessages} = useContext(MessagesContext);



    useEffect(()=>{
        id && GetWorkspaceData();
    },[id])


    const GetWorkspaceData=async ()=>{
        const result = await convex.query(api.workspace.GetWorkspace ,{
            workspaceId:id
        });
        setMessages(result?.messages);
        console.log("workspace data",result);
        

    }

  return (
    <div>
     <div>
       {
        messages?.map((msg,index)=>(
            <div key={index}>
                <h2>
                    {msg.context}
                </h2>
            </div>
        ))
       }
     </div>
    </div>
  )
}

export default ChatView
