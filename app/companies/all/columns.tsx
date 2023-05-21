"use client"

import { ColumnDef } from "@tanstack/react-table"

import { MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import axios from "axios"
import { useState, useEffect } from 'react';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
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



export const columns: ColumnDef<companies>[] = 


[


  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id



      async function supprimerOffer(offerId: number): Promise<any> {

        console.log('Deleting offer...');

        const { data } = await axios.delete(`http://localhost:8001/api/company/Delete/${offerId}`);

        console.log('Offer deleted:', data);

        return data;
      }



      async function valideOffer(offerId: number): Promise<any> {

        console.log('valide offer...');

        const { data } = await axios.post(`http://localhost:8001/api/company/valide/${offerId}`);

        console.log(' valide offer:', data);

        return data;
      }
      
   
    
      const handleDeleteOffer = async (offerId: number) => {
        await supprimerOffer(offerId);
    
        console.log(id);
        window.location.reload();

      };

      const handleValideOffer = async (offerId: number) => {
        await valideOffer(offerId);
       
        console.log(id);
        window.location.reload();

      };
    
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => handleDeleteOffer(id)}
            >
              Supprimer
            </DropdownMenuItem>
            <DropdownMenuSeparator />
       
            <DropdownMenuItem
              onClick={() => handleValideOffer(id)}
            >
              invalider
            </DropdownMenuItem>          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },

  {
    accessorKey: "name",
    header: "name",
  },
  {
    accessorKey: "desc",
    header: "desc",
  },
  
  {
    accessorKey: "countryCode",
    header: "countryCode",
  },
  {
    accessorKey: "valide",
    header: "valide",
  },{
    accessorKey: "keywords",
    header: "keywords",
  },
  {
    accessorKey: "Category",
    header: "category",
  },
]
