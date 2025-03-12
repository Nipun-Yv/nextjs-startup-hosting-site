// "use client"
import { auth } from '@/auth'
import { Box, Button, Field, Heading, HStack, Input, Text, Textarea, VStack } from '@chakra-ui/react'
import { redirect } from 'next/navigation'
import React from 'react'
import MDEditor from "@uiw/react-md-editor"
import StartupForm from '@/components/StartupForm'
const CreateStartup = async() => {
    const session=await auth()
    if(!session){
        redirect("/")
    }
  return (
    <StartupForm/>
  )
}

export default CreateStartup