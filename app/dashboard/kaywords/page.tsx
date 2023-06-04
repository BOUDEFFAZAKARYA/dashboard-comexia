"use client"


import { QueryClient, useHydrate, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useEffect, useState } from "react"
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

async function getkeywords(): Promise<any> {

     const {data} = await axios.get('http://146.190.184.106:81/api/Keyword/All');

     console.log("i'm here in getdata fct");


      return data  
    
    } 
   
export default async function KeywordPage() {



  //const data = await getkeywords();

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
 
  useEffect(() => {
    console.log("useeffect");

    setLoading(true);
    fetch('http://146.190.184.106:81/api/Keyword/All')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [data]);
 
  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  console.log("data");

  console.log(data);


  console.log("Setdata");


  console.log(        setData(data)  );


  return (
    <div className="container mx-auto py-10">
   { <DataTable columns={columns} data={data} /> }

    </div>

  )
}
