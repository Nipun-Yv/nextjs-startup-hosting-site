import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { auth,signOut,signIn } from '@/auth'
const Navbar = async () => {
    const session=await auth()
    return (
    <header className="px-5 py-3 bg-white shadow-sm">
        <nav className="flex justify-between items-center !p-[15px] !font-semibold">
            <Link href="/">
                <Image src="/logo.png" alt="YC Directory site logo" width="144" height="30"/>
            </Link>
            <div className="flex items-center gap-5 text-black">
                {session && session?.user?(
                    <>
                        <Link href="/startup/create">
                            <span>Create</span>
                        </Link>
                        <form action={async ()=>{
                            "use server"
                            await signOut({redirectTo:"/"})
                        }}>
                            <button>
                                <span className="text-primary">Logout</span>
                            </button>
                        </form>
                        <Link href={`/user/${session?.user.id}`}>
                            <span>{session?.user?.name}</span>
                        </Link>
                    </>
                    ):
                    <form action={
                        async()=>{
                            "use server"
                            await signIn('github')
                            }
                        }>
                            <button >
                                <span>Login</span>
                            </button>
                    </form>
                }
            </div>
        </nav>
    </header>
  )
}

export default Navbar