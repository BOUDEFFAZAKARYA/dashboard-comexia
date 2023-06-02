"use client"


import axios from "axios"
import { useEffect } from "react"
import {  columns } from "./columns"
import { DataTable } from "./data-table"

import { usePathname, useRouter } from 'next/navigation'

import http from 'http';
import { data } from "autoprefixer"



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
const makeInsecureHttpRequest = (url: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    http.get(url, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        resolve(data);
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
};

async function getData(): Promise<any> {
  
  makeInsecureHttpRequest('http://api.www.comexia-dz.org:81/api/products/All')
  .then((data) => {
    console.log(data);
    return data  

  })
  .catch((error) => {
    console.error(error);
  });


    // const {data} = await axios.get('http://api.www.comexia-dz.org:81/api/products/All')

    
    } 
   
export default async function OffersPage() {

  const pathname = usePathname();

  
  console.log('Current endpoint:', pathname);


  const data = await getData();

  
  if (!data) {
    return <div>Loading...</div>
  }



  return (
    <div className="container mx-auto py-10">
   { <DataTable columns={columns} data={data} /> }

    </div>
  )
}
