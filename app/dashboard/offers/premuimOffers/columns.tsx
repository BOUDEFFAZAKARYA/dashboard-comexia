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



export const columns: ColumnDef<offers>[] = 


[


  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id



      async function supprimerOffer(offerId: number): Promise<any> {

        console.log('Deleting offer...');

        const { data } = await axios.delete(`http://localhost:8001/api/products/Delete/${offerId}`);

        console.log('Offer deleted:', data);

        return data;
      }

      async function premiumOffer(offerId: number): Promise<any> {

        console.log('premuim offer...');

        const { data } = await axios.post(`http://localhost:8001/api/products/premium/${offerId}`);

        console.log(' premuim offer:', data);

        return data;
      }

      async function valideOffer(offerId: number): Promise<any> {

        console.log('valide offer...');

        const { data } = await axios.post(`http://localhost:8001/api/products/valide/${offerId}`);

        console.log(' valide offer:', data);

        return data;
      }
      
       
    
      const handleDeleteOffer = async (offerId: number) => {
        await supprimerOffer(offerId);
      
        console.log(id);
        window.location.reload();

      };
      const handlePremuimOffer = async (offerId: number) => {
        await premiumOffer(offerId);
     
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
              onClick={() => handlePremuimOffer(id)}
            >
              make it premuim
            </DropdownMenuItem>          
            <DropdownMenuItem
              onClick={() => handleValideOffer(id)}
            >
              valider
            </DropdownMenuItem>          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },

  {
    accessorKey: "title",
    header: "title",
  },
  {
    accessorKey: "desc",
    header: "desc",
  },
  {
    accessorKey: "categorie",
    header: "categorie",
  },
  {
    accessorKey: "countryCode",
    header: "countryCode",
  },{
    accessorKey: "views",
    
    header: "views",
  },{
    accessorKey: "premium",
    header: "premium",
  },
  {
    accessorKey: "valide",
    header: "valide",
  },{
    accessorKey: "keywords",
    header: "keywords",
  },
]
