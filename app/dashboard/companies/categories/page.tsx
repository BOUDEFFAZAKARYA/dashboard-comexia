"use client"


import { QueryClient, useHydrate, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useEffect } from "react"
import {  columns } from "./columns"
import { DataTable } from "./data-table"




export type Category = {

  id:number
  name:string
}

async function getData(): Promise<any> {

     const {data} = await axios.get('https://146.190.184.106:81/api/categorie/All')

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
