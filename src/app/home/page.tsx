"use client"
import Dashboard from '@/components/Dashboard'
import { useProtectRoute } from '@/hooks/useProtectRoute'
import React from 'react'

type Props = {}

const Home = (props: Props) => {
  return (
    <div className=" mx-auto py-[5rem] px-[3rem]">
      <Dashboard />
    </div>
  )
}

export default Home