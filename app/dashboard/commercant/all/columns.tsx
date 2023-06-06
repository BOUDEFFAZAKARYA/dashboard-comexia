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






export const columns: ColumnDef<commercant>[] = 


[


  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id



      async function supprimerOffer(offerId: number): Promise<any> {

        console.log('Deleting offer...');

        const { data } = await axios.delete(`http://api.www.comexia-dz.org:81/api/products/Delete/${offerId}`);

        console.log('Offer deleted:', data);

        return data;
      }

    
      
    
      const handleDeleteOffer = async (offerId: number) => {
        await supprimerOffer(offerId);


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
                   
              </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },

  {
    accessorKey: "Raison_Sociale",
    header: "Raison_Sociale",
  },
  {
    accessorKey: "Catégorie",
    header: "Catégorie",
  },
  
  {
    accessorKey: "Adresse",
    header: "Adresse",
  },
  {
    accessorKey: "Ville",
    header: "Ville",
  },
  {
    accessorKey: "Code_postal",
    header: "Code_postal",
  }, {
    accessorKey: "tel",
    header: "tel",
  }, {
    accessorKey: "Nom",
    header: "Nom",
  },
  {
    accessorKey: "Prenom",
    header: "Prenom",
  }, {
    accessorKey: "email",
    header: "email",
  },
  {
    accessorKey: "abonnement",
    header: "abonnement",
  },
  
 
]
