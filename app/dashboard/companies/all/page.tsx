

"use client"

import { DataTable } from "./data-table";
import { columns } from "./columns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import useSWR, { mutate } from "swr"
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";



const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function Page() {



  const { data, error, isLoading , mutate } = useSWR('http://api.www.comexia-dz.org:81/api/company/All', fetcher , { refreshInterval: 1000 })

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

      <DataTable columns={columns} data={data.data} />

    </div>)
}


