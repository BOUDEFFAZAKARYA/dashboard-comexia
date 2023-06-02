"use client"

import axios from "axios"
import {  columns } from "./columns"
import { DataTable } from "./data-table"


export type commercant = {
  id: number
  Raison_Sociale: string
  Catégorie:string
  Adresse: string
  Ville: string
  Code_postal : number
  tel : number
  Nom: string
  Prenom: string
  email: string
  password: string
  abonnement: string


  companies: Companies

}

export type Companies = {
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

     const {data} = await axios.get('https://146.190.184.106:81/api/Commercant/All')

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
