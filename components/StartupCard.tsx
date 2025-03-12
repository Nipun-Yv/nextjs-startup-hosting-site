import { Box, Button, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'
import { LuEye, LuView } from 'react-icons/lu'
import { formatDate } from '@/utils'
import Link from 'next/link'
interface Author{
    _id:string;
    name:string;
    image:string;
  }
  interface Post{
    _createdAt:string;
    views:number;
    author:Author;
    _id:string;
    description:string;
    pitch:string;
    image:string;
    category:string;
    title:string;
}
const StartupCard = ({post}:{post:Post}) => {
  return (
    <VStack w="1/6" minW="250px" border="3.5px solid black" h="350px" gap="3"
    borderRadius="16px" boxShadow="3px 3px 0px black" py="2" _hover={{bgColor:"#FFE8F0",borderColor:"#EE2B69",
    boxShadow:"6px 6px 0px black",cursor:"pointer"}}>
        <HStack justify="space-between" w="full" px="3">
            <Box borderRadius="20px" bg="#FFE8F0" py="2" px="3" fontSize="small">
                {formatDate(post._createdAt)}
            </Box>
            <HStack borderRadius="20px" gap="1">
                <LuEye size="25" color="#EE2B69"/>
                <Text fontSize="small" fontWeight="extralight">
                    {post.views}
                </Text>
            </HStack>
        </HStack>
        <HStack justify="space-between" h="1/6" w="full" p="3">
            <Box>
                <Text fontSize="small" mb='-1'>
                    <Link href={`/user/${post.author?._id}`}>
                        {post.author?.name}
                    </Link>
                </Text>
                <Heading fontWeight="extrabold" fontFamily="inherit">
                    <Link href={`/startup/${post._id}`}>
                        {post.title}
                    </Link>
                </Heading>
            </Box>
            <Image src={post.author?.image} height="100" width="100" alt="User Profile Image"
            style={{width:"40px",height:"40px", borderRadius:"50%",border:"0.1px solid grey",objectFit:"cover"}} unoptimized/>
        </HStack>
        <Text textAlign="center" fontSize="small" color="gray.500" px="3">
            {post.description.slice(0,60)}...
        </Text>
        <Image height="90" width="25" src={post.image} alt="Image of the startup"
        style={{height:"35%",width:'90%', borderRadius:"12px",objectFit:"cover"}} unoptimized/>
        <HStack justify="space-between" w="full" p="3" h="10%">
            <Text fontSize="small">
                {post.category}
            </Text>
            <Button borderRadius="20px">
                <Link href={`/startup/${post._id}`}>Details</Link>
            </Button>
        </HStack>
    </VStack>
  )
}

export default StartupCard