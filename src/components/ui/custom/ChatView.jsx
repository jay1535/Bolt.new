"use client"
import { useConvex } from 'convex/react';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import { api } from '../../../../convex/_generated/api';
import { MessagesContext } from '@/context/MessagesContext';
import Colors from '@/data/Colors';
import { UserDetailContext } from '@/context/UserDetailContext';
import Image from 'next/image';
import { ArrowUp, Link } from 'lucide-react';
import Lookup from '@/data/Lookup';

function ChatView() {
    const {id} = useParams();
    const convex =useConvex();
    const {messages,setMessages} = useContext(MessagesContext);
    const {userDetails, setUserDetails} = useContext(UserDetailContext);
    const [userInput, setUserInput] = useState();



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
    <div className='relative h-[85vh] flex flex-col'>
     <div className='flex-1 overflow-y-scroll'>
       {
        messages?.map((msg,index)=>(
            <div key={index} className='p-3 rounded-lg mb-2 flex gap-2 items-start' style={{
                backgroundColor :Colors.BACKGROUND
            }}>
                {msg?.role == 'user'&&<Image src={userDetails.picture} alt='userImage' width ={35} height={35} className='rounded-full'/>}
                <h2>
                    {msg.context}
                </h2>
            </div>
        ))
       }
     </div>
     {/* Input Section */}

       <div
        style={{
          backgroundColor: Colors.BACKGROUND,
        }}
        className="animate-borderGlow p-5 border border-blue-800 rounded-xl max-w-2xl mt-3 w-full shadow-[0_0_10px_rgba(59,130,246,0.7)] transition duration-300"
      >
        <div className="flex gap-2">
          <textarea
            className="outline-none bg-transparent w-xl h-22 max-h-56 resize-none  "
            placeholder={Lookup.INPUT_PLACEHOLDER}
            onChange={(event) => {
              setUserInput(event.target.value);
            }}
          />
          {userInput && (
            <ArrowUp
              onClick={() => onGenerate(userInput)}
              className="bg-gradient-to-t from-blue-600 to-blue-900 p-2 h-8 w-8 rounded-md cursor-pointer"
            />
          )}
        </div>
        <div>
          <Link className="w-4 h-4"></Link>
        </div>
        </div>
    </div>
  )
}

export default ChatView
