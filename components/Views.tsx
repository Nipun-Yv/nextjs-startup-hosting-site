import React from 'react'
import {Box,Circle,Float,Strong} from "@chakra-ui/react"
import { writeClient } from '@/sanity/lib/write-client'
export const Views = async({views,_id}:{views:number,_id:string}) => {
  await writeClient.patch(_id).set({views:views+1}).commit();
  return (
          <Box
          position="fixed"
          bottom="2"
          right="2"
          zIndex={10}
          borderRadius="8px" bg="#FFE8F0" py="2" px="3" fontSize="small"
          >
           <Strong>{views}</Strong> Views
           <Float>
            <Circle size="2" bg="red">
                <Circle size="2" bg="red" animation="ping"/>
            </Circle>
           </Float>
          </Box>
  )
}
