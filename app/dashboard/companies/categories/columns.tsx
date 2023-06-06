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





export type Category = {

  id:number
  name:string
}



export const columns: ColumnDef<Category>[] = 


[


  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id



      async function supprimerOffer(offerId: number): Promise<any> {

        console.log('Deleting catgorie...');

        const { data } = await axios.delete(`http://api.www.comexia-dz.org:81/api/categorie/Delete/${offerId}`);

        console.log('Categorie deleted:', data);

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
            <DropdownMenuSeparator />

        
            
                </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },

  {
    accessorKey: "name",
    header: "name",
  },
  
]
