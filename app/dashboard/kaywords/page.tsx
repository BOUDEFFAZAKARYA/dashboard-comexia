"use client"

import axios from "axios"
import {  columns } from "./columns"
import { DataTable } from "./data-table"

import { usePathname,  } from 'next/navigation'



export type offers = {
  id: number
  title: string
  desc: string
  categorie: "import" | "export" 
  countryCode:string
  views:number
  created_at:string
  premium:boolean
  valide:boolean
  keywords: keyword

}


export type keyword = {

  id:number
  name:string
}

async function getData(): Promise<any> {

     const {data} = await axios.get('http://146.190.184.106:81/api/Keyword/All     ')

      return data  
    
    } 
   
export default async function Page() {


  
  console.log('Current endpoint:');


  const data = await getData();

  
  if (!data) {
    return <div>Loading...</div>
  }



  return (
    <div className="container mx-auto py-10">

                  <DataTable columns={columns} data={data} /> 




    </div>
  )
}
