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
   
export default  function KeywordPage() {



  //const data = await getkeywords();

  const [data, setData] = useState(null);

  
  const [isLoading, setLoading] = useState(false);
 /* 
  useEffect(() => {
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

  console.log(data); */

  console.log("data");

  const datastatic = [
    {
      "id": 1,
      "name": "agricultural-machinery"
    },
    {
      "id": 2,
      "name": "baby-products"
    },
    {
      "id": 3,
      "name": "fitness"
    },
    {
      "id": 4,
      "name": "football"
    },
    {
      "id": 5,
      "name": "ticket"
    },
    {
      "id": 8,
      "name": "test2"
    },
    {
      "id": 9,
      "name": "test3"
    },
    {
      "id": 10,
      "name": "test3"
    }
  ]

  return (
    <div className="container mx-auto py-10">
{(data &&
                  <DataTable columns={columns} data={data} /> 



        )}
                      <DataTable columns={columns} data={datastatic} /> 

    </div>

  )
}
