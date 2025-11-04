import React from 'react'
import prisma from '@/lib/db'

const page = async  () => {
  const Users = await prisma.user.findMany()
  return (
    <div>page users {JSON.stringify(Users)}</div>
  )
}

export default page