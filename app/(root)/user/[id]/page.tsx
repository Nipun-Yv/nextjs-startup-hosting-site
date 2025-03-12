import StartupCard from '@/components/StartupCard';
import { client } from '@/sanity/lib/client';
import { FETCH_AUTHOR_WITH_ID, FETCH_AUTHOR_WITH_SANITY_ID, FETCH_STARTUPS_BY_AUTHOR } from '@/sanity/lib/queries';
import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react'
interface Author{
    _id:string;
    name:string;
    image:string;
    bio:string;
    username:string;
}
interface Post{
    _createdAt:string;
    views:number;
    _id:string;
    description:string;
    pitch:string;
    image:string;
    category:string;
    title:string;
    author:Author;
}
const User = async ({params}:{params:{id:string}}) => {
  const id=params.id;
  const posts:Post[]=await client.fetch(FETCH_STARTUPS_BY_AUTHOR,{id})
  const author:Author=await client.fetch(FETCH_AUTHOR_WITH_SANITY_ID,{id})
  console.log(author)
  return (
        <Box display="flex" gap="4" flexWrap="wrap" fontFamily="var(--font-work-sans)" justifyContent="center" p="6" pt="8">
            <VStack w="250px" bg="#EE2B69" border="3.5px solid black" h="350px" gap="2"
    borderRadius="16px" boxShadow="4px 4px 0px black" py="2">
                <Box bg="black" w="90%" textAlign="center" mt="-7"
                borderRadius="14px" h="50px" transform="rotate(-2.5deg)" >
                    <Heading bg="white" textAlign="center" p="0.5" fontFamily="inherit" fontWeight="extrabold" fontSize="xl"
                        borderRadius="14px" h="full" w="full" transform="rotate(2.5deg)" border="4px solid black">
                        NIPUN YADAV
                    </Heading>
                </Box>
                <img className="w-[90%] border-1 border-white-100" src={author.image} style={{borderRadius:"50%",border:"4px solid white"}}/>
                <Heading fontFamily="inherit" color="white">
                    @{author.username}
                </Heading>
                <Text color="white" w="full" fontSize="smaller" textAlign="center">
                    Next.js enthusiast is an overstatement
                </Text>
            </VStack>
            <HStack wrap="wrap" flex="1" maxW="800px" pl="4" justifyContent={{sm:"center",md:"flex-start"}}>
                {posts?.map((post)=>{
                    return (
                        <StartupCard key={post._id} post={post}/>
                    )
                })}
            </HStack>
        </Box>
  )
}

export default User