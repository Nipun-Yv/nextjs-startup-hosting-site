import React from 'react'
import {client} from "@/sanity/lib/client"
import { FETCH_STARTUP_USING_ID, FETCH_STARTUPS_BY_SLUG } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import { Box, Heading, Text, VStack , HStack, Strong, Float, Circle} from '@chakra-ui/react'
import Image from 'next/image'
import { formatDate } from '@/utils'
import Link from 'next/link'
import MarkdownIt from "markdown-it"
import { Views } from '@/components/Views'
import StartupCard from '@/components/StartupCard'
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
// export const experimental_ppr=true
const Startup = async ({params}:{params:Promise<{id:string}>}) => {
  const id=(await params).id
  const post:Post|null=await client.fetch(FETCH_STARTUP_USING_ID,{id})
  if(!post){
    return notFound()

  }
  const {select:posts}:{select:Post[]}=await client.fetch(FETCH_STARTUPS_BY_SLUG,{slug:"editor-picks"})
  const md=new MarkdownIt()
  const parsedContent=md.render(post?.pitch||'')
//   console.log(parsedContent)
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap="8" fontFamily="var(--font-work-sans)" bg="gray.50">
      <VStack justify="center" h="400px" bg='url(/DiamondPattern.png)' alignItems="center" gap="5" w="full">
        <Text bg="yellow.400" p="2" borderRadius="20px" fontWeight="800"  >
            {formatDate(post._createdAt)}
        </Text>
        <Heading size="6xl" w="2/3" minW="500px" fontWeight="extrabold" textAlign="center" 
         color="white" bg="black" p="5" textTransform="uppercase" fontFamily="var(--font-work-sans)">
          {post.title}
        </Heading>
        <Text color="white" fontWeight="bold" textShadow="2px 2px 10px black" textAlign="center" >
          {post.description}
        </Text>
      </VStack>
      <Image src={post.image} width='90' height='50' style={{width:"83%",height:"400px",objectFit:"cover",marginTop:"5",
        border:".5px solid black",
      borderRadius:"16px", boxShadow:"3px 3px 0px black"
      }} alt="Startup Image"
      unoptimized />
      <VStack w="80%" borderRadius="6px" boxShadow="0px 0px 20px lightgrey">
        <HStack justify="space-between" h="1/6" w="full" p="3">
            <HStack>
                <Image src={post.author?.image} height="100" width="100" alt="User Profile Image"
                  style={{width:"40px",height:"40px", borderRadius:"50%",border:"0.1px solid grey",objectFit:"cover"}} unoptimized/>
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
            </HStack>
            <Box borderRadius="20px" bg="#FFE8F0" py="2" px="3" fontSize="small">
                            {post.category}
            </Box>
        </HStack>
        <Heading mt="3" ml="6" fontWeight="700" fontFamily="inherit" fontSize="2xl" w="full" minW="min-content" as="h1">
            Pitch Details:
            <article className="prose !p-2" dangerouslySetInnerHTML={{ __html: parsedContent }} />
        </Heading>
      </VStack>
      <Heading fontFamily="inherit" fontWeight="extrabold" w="full" bg='url(/DiamondPattern.png)' color="white" p="3" textShadow="2px 2px 0px black" textAlign={"center"}>EDITOR PICKS 2024</Heading>
      <HStack wrap="wrap" gap="5" justify="center" align="center" >
        {posts?.map((post:Post)=>(
          <StartupCard key={post._id} post={post}/>
        ))}
      </HStack>
      <Views _id={post._id} views={post.views}/>
    </Box>
  )
}

export default Startup