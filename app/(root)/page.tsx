import { Box, Container, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import axios from "axios"
import SearchForm from "../../components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { FETCH_STARTUP_WITH_SEARCH_TERM, STARTUP_QUERY } from "@/sanity/lib/queries";
import {client} from "@/sanity/lib/client"
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";
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
export default async function Home({searchParams}:{searchParams:Promise<{query?:string}>}) {
  const query=(await searchParams).query
  const params={search:query||null}
  const session=await auth()
  console.log(session?.id)
  const posts=await client.fetch(FETCH_STARTUP_WITH_SEARCH_TERM,{search:params.search})
  console.log(posts)
  return (
    <Box>
      <VStack justify="center" h="500px" bg='url(./DiamondPattern.png)' alignItems="center" gap="5">
        <Heading size="6xl" w="2/3" minW="500px" fontWeight="extrabold" textAlign="center" 
         color="white" bg="black" p="5">
          PITCH YOUR STARTUP, CONNECT WITH ENTREPENEURS
        </Heading>
        <Text color="white" fontWeight="bold" textShadow="black" >
          Submit ideas, vote in pitches and get noticed in virtual competitions
        </Text>
        <SearchForm/>
      </VStack>
      <Heading mt="3" ml="6" fontWeight="700" fontFamily="inherit" fontSize="2xl">
        {query?`Showing results for '${query}'`:"Recommended Startups:"}
      </Heading>
      <HStack wrap="wrap" gap="5" justify="center" align="center" py="6">
        {posts?.map((post:Post)=>(
          <StartupCard key={post._id} post={post}/>
        ))}
      </HStack>
      {/* <SanityLive/> */}
    </Box>
  );
}
