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

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.




export type keyword = {

  id:number
  name:string
}





export const columns: ColumnDef<keyword>[] = 


[


  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id



      async function supprimerk(offerId: number): Promise<any> {

        console.log('Deleting offer...');

        const { data } = await axios.delete(`http://api.www.comexia-dz.org:81/api/Keyword/Delete/${offerId}`);

        console.log('Offer deleted:', data);

        return data;
      }

    
      
    
      const handleDeleteOffer = async (offerId: number) => {
        await supprimerk(offerId);
        console.log(id);

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
    accessorKey: "name",
    header: "name",
  },
  
]
