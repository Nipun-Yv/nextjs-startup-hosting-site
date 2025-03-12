"use client"
import React, { useActionState, useState } from 'react'
import { Box, Button, Field, Heading, HStack, Input, Text, Textarea, Toast, VStack } from '@chakra-ui/react'
import MDEditor from "@uiw/react-md-editor"
import { createPitch } from '@/actions'
// import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
const StartupForm = () => {
    const router=useRouter()
    const handleFormSubmit=async (prevState:any,formData:FormData)=>{
        try{
            // throw new Error()
            const result:any=await createPitch(prevState,formData,pitch)
            if(result.status=="200"){
                router.push(`/startup/${result._id}`)
            }
            return {
                ...result
            }
        }
        catch(error:any){
            console.log(error.message)
            return {
                error:"Internal server error, please try again later",
                status:"400"
            }
        }
        finally{
            setPitch("")
        }
    }
    const [state,formAction,isPending]=useActionState(handleFormSubmit,{error:"",status:"INITIAL"})
    const [pitch,setPitch]=useState<string>("")
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap="8" fontFamily="var(--font-work-sans)" bg="gray.50">
    <VStack justify="center" h="400px" bg='url(/DiamondPattern.png)' alignItems="center" gap="5" w="full">
      <Text bg="yellow.400" p="2" borderRadius="20px" fontWeight="800"  >
      </Text>
      <Heading size="6xl" w="2/3" minW="500px" fontWeight="extrabold" textAlign="center" 
       color="white" bg="black" p="5" textTransform="uppercase" fontFamily="var(--font-work-sans)">
        SUBMIT STARTUP
      </Heading>
      <Text color="white" fontWeight="bold" textShadow="2px 2px 10px black" textAlign="center" >
        Submit the pitch for your startup
      </Text>
    </VStack>
    <form action={formAction} className='w-full flex justify-center'>
    <Text color="red.500">{state.error?state.error:null}</Text>
    <VStack w="80%" borderRadius="6px"  boxShadow="0px 0px 20px lightgrey" fontFamily="inherit" gap="5" p="5">
        <Field.Root required w="90%">
            <Field.Label textTransform="uppercase" fontWeight="700">
                Title<Field.RequiredIndicator />
            </Field.Label>
            <Input placeholder="Enter the title" border="3px solid black" rounded="20px" p="3" h="50px"
            fontWeight="bolder" bg="white" name="title"/>
            <Field.HelperText></Field.HelperText>
        </Field.Root>
        <Field.Root required w="90%">
            <Field.Label textTransform="uppercase" fontWeight="700">
                Description<Field.RequiredIndicator />
            </Field.Label>
            <Textarea placeholder="Short description of your startup idea" border="3px solid black" rounded="20px" p="3" h="200px"
            fontWeight="bolder" bg="white" verticalAlign="top" name="description"/>
            <Field.HelperText>The description would provide subtext on your card</Field.HelperText>
        </Field.Root>
        <Field.Root required w="90%">
            <Field.Label textTransform="uppercase" fontWeight="700">
                Category <Field.RequiredIndicator />
            </Field.Label>
            <Input placeholder="Enter category, for ex. Tech, Education etc." border="3px solid black" rounded="20px" p="3" h="50px"
            fontWeight="bolder" bg="white" name="category"/>
        </Field.Root>
        <Field.Root required w="90%">
            <Field.Label textTransform="uppercase" fontWeight="700">
                Image/Video Link <Field.RequiredIndicator />
            </Field.Label>
            <Input placeholder="Please provide a url for a hosted image" border="3px solid black" rounded="20px" p="3" h="50px"
            fontWeight="bolder" bg="white" name="link"/>
        </Field.Root>
        <Field.Root required w="90%">
            <Field.Label textTransform="uppercase" fontWeight="700">
                PITCH <Field.RequiredIndicator />
            </Field.Label>
            <MDEditor
            value={pitch}
            onChange={(value)=>setPitch(value?value:"")}
             style={{width:"100%",border:"3px solid black", borderRadius:"20px",overflow:"hidden"}}/>
        </Field.Root>
        <Button disabled={isPending} variant={"surface"} w="90%" rounded="20px" bg="#EE2B69" color="white" h="50px" border="1px solid black"
        fontWeight={"extrabold"} type="submit">
            SUBMIT FORM
        </Button>
    </VStack>
    </form>
  </Box>
  )
}

export default StartupForm