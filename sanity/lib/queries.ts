import { defineQuery } from "next-sanity";

export const STARTUP_QUERY=
defineQuery(`
    *[_type=="startup" && defined(slug.current)] | order(_createdAt desc){
  _id,title,slug,_createdAt,author,
    views,category,
    image,
    author->{
      name,bio,image, _id
    },
    pitch
}
`)

export const FETCH_STARTUP_WITH_SEARCH_TERM=
defineQuery(`
    *[_type=="startup" && defined(slug.current) && (!defined($search)||category match $search|| title match $search|| author->name match $search)]{
      _id,title,slug,_createdAt,author,
    views,category,
    description,
    image,
    author->{
      name,bio,image,_id
    },
    pitch
    }
`)

export const FETCH_STARTUP_USING_ID=
defineQuery(`
*[_type=="startup" && _id==$id][0]{
    _id,title,
    slug,
    _createdAt,
    views,
    category,
    description,
    image,
    author->{
      _id,name,bio,image
    },
    pitch
}
`)

export const FETCH_AUTHOR_WITH_ID=
defineQuery(`
*[_type=="author" && id==$id][0]{
    _id,
    id,
    name,
    bio,
    image
}
`)

export const FETCH_STARTUPS_BY_AUTHOR=
defineQuery(`
  *[_type=="startup" && defined(slug.current) && author->_id==$id] | order(_createdAt desc){
    _id,
    description,
    category,
    pitch,
    image,
    title,
    views,
    author->{
      _id,name,bio,image
    },
    _createdAt
  }
`)

export const FETCH_AUTHOR_WITH_SANITY_ID=
defineQuery(`
  *[_type=="author" && _id==$id][0]{
    _id,
    image,
    name,
    username,
    bio
  }
`)

export const FETCH_STARTUPS_BY_SLUG=
defineQuery(`
  *[_type=="playlist" && $slug==slug.current][0]{
    select[]->{
      _id,title,
      slug,
      _createdAt,
      views,
      category,
      description,
      image,
      author->{
        _id,name,bio,image
      },
      pitch
    }
  }
`)