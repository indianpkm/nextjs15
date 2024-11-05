import { auth, signIn, signOut } from '@/auth'
import Link from 'next/link'
import React from 'react'

const Navbar = async () => {
    const session = await auth()

    return (
        <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
            <nav className='flex justify-between items-center text-black'>
                <Link rel="stylesheet" href="/" >
                    <img src="/logo.png" alt="logo icon" />
                </Link>

                <div className='flex items-center gap-5'>
                    {
                        session && session?.user ? (
                            <>
                                <Link href="/startup/create">
                                    <span>Create</span>
                                </Link>

                                <form action={async () => {
                                    'use server';
                                    await signOut({
                                        options:{
                                            redirectTo:'/'
                                        }
                                    })
                                }}>
                                    Logout
                                </form>

                                <Link href={`/user/${session?.id}`}>
                                    <span>{session?.user?.name}</span>
                                </Link>
                            </>
                        ) : (
                            <form action={async () => {
                                'use server';
                                await signIn({ provider: 'github' })
                            }}>
                                <button type='submit'>
                                    Login
                                </button>
                            </form>
                        )}
                </div>
            </nav>
        </header >
    )
}

export default Navbar   