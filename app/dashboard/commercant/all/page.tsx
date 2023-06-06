"use client"

import { DataTable } from "./data-table";
import { columns } from "./columns";


import useSWR, { mutate } from "swr"


import axios from "axios"
import React, { useState } from "react"


import { Skeleton } from "@/components/ui/skeleton"




export type offers = {
  id: number
  title: string
  desc: string
  categorie: "import" | "export"
  countryCode: string
  views: number
  created_at: string
  premium: boolean
  valide: boolean
  keywords: keyword

}


export type keyword = {

  id: number
  name: string
}

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function Page() {


  const { data, error, isLoading, mutate } = useSWR('http://api.www.comexia-dz.org:81/api/Commercant/All', fetcher, { refreshInterval: 1000 })

  console.log(data)

  if (error) return <div>failed to load</div>
  if (isLoading)     return <div className="flex items-center justify-center space-x-4 py-10">
  <div className="space-y-4 items-center ">
    <Skeleton className="h-8 w-[1000px]" />
    <Skeleton className="h-8 w-[1000px]" />
    <Skeleton className="h-8 w-[1000px]" />
    <Skeleton className="h-8 w-[1000px]" />
    <Skeleton className="h-8 w-[1000px]" />
    <Skeleton className="h-8 w-[1000px]" />
    <Skeleton className="h-8 w-[1000px]" />
    <Skeleton className="h-8 w-[1000px]" />
  </div>
</div>


  return (
    <div className="container mx-auto py-10">
  <DataTable columns={columns} data={data} />

    </div>)
}


