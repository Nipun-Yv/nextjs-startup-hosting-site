import React from 'react'
import Form from "next/form"
import { Button, Input } from '@chakra-ui/react'
const SearchForm = () => {
  return (
    <Form action='/' scroll={false} className="flex w-75">
        <Input
            name="query"
            defaultValue=""
            placeholder="Search Startups"
            bg="white"
            shadow="md"
            shadowColor="black"
            borderRightRadius="0px"
        />
        <Button type='submit' borderLeftRadius="0px">
            Search
        </Button>
    </Form>
  )
}

export default SearchForm