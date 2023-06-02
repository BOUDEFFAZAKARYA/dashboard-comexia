"use client"


import { QueryClient, useHydrate, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useEffect } from "react"
import {  columns } from "./columns"
import { DataTable } from "./data-table"


export type companies = {
  
  id: number
  name: string
  countryCode:string
  desc: string
  valide:boolean
  keywords: keyword
  category :Category

}



export type keyword = {

  id:number
  name:string
}

export type Category = {

  id:number
  name:string
}

async function getData(): Promise<any> {

     const {data} = await axios.get('http://api.www.comexia-dz.org:81/api/Keyword/All')

      return data  
    
    } 
   
export default async function Page() {

  const data = await getData();

 if (!data) {
    return <div>Loading...</div>
  }

  console.log(data);

  return (
    <div className="container mx-auto py-10">
   { <DataTable columns={columns} data={data} /> }

    </div>

  )
}
