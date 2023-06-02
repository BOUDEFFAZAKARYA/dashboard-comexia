"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  VisibilityState,
  getSortedRowModel,
  useReactTable,

} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import React, { useState } from "react"


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"



import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,

    state: {
      columnFilters,
      columnVisibility,

    },

  })

  const [inputName, setInputName] = useState('');
  const [inputDesc, setInputDesc] = useState('');
  const [inputCategorie, setInputCategorie] = useState('');
  const [inputCountryCode, setInputCountryCode] = useState('');
  const [inputValue, setInputValue] = useState('');
  
  
  const [open, setOpen] = React.useState(false)

  const [opens, setOpens] = React.useState(false)

  const [values, setValues] = React.useState("")

  const [val, setVal] = React.useState("")

  
  const handleInputChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setInputName(event.target.value);
  
  };

  const handleInputChange1 = (event: { target: { value: React.SetStateAction<string> } }) => {
    setInputDesc(event.target.value);
   
  };
  const handleInputChange2 = (event: { target: { value: React.SetStateAction<string> } }) => {
 
    setInputCategorie(event.target.value);

  };
  const handleInputChange3 = (event: { target: { value: React.SetStateAction<string> } }) => {
  
    setInputCountryCode(event.target.value);
  };
  const handleInputChange4 = (event: { target: { value: React.SetStateAction<string> } }) => {
    
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    addcompany();

  };


  async function addcompany(): Promise<any> {



    const company = {
      name: inputName,
      desc: inputDesc,
      countryCode: val,
      keywords: [
        {
          name: inputValue
        },

      ],
      category: [
        {
          name: values
        },

      ]
    };


      const Response = await axios.post('http://146.190.184.106:81/api/company/create', company);

      console.log('Response:', Response.status);


  }

  const countrycodes = [
    {
      value: "DZ",
      label: "DZ",
    },
    {
      value: "FR",
      label: "FR",
    },
   
  ]

  return (
    
    <div>

<div className="flex justify-between items-center" >

<div className="flex items-center py-4 space-x-4">
  <Input
    placeholder="Filter names..."
    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
    onChange={(event) =>
      table.getColumn("name")?.setFilterValue(event.target.value)
    }
    className="max-w-sm"
  />


  <Input
    placeholder="Filter countryCode..."
    value={(table.getColumn("countryCode")?.getFilterValue() as string) ?? ""}
    onChange={(event) =>
      table.getColumn("countryCode")?.setFilterValue(event.target.value)
    }
    className="max-w-sm"
  />

</div>



  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" className="ml-auto  bg-black text-white ">
        Columns
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      {table
        .getAllColumns()
        .filter(
          (column) => column.getCanHide()
        )
        .map((column) => {
          return (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={(value) =>
                column.toggleVisibility(!!value)
              }
            >
              {column.id}
            </DropdownMenuCheckboxItem>
          )
        })}
    </DropdownMenuContent>
  </DropdownMenu>





</div>


<div className="rounded-md border">
<Table>
  <TableHeader>
    {table.getHeaderGroups().map((headerGroup) => (
      <TableRow key={headerGroup.id}>
        {headerGroup.headers.map((header) => {
          return (
            <TableHead key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
            </TableHead>
          )
        })}
      </TableRow>
    ))}
  </TableHeader>
  <TableBody>
    {table.getRowModel().rows?.length ? (
      table.getRowModel().rows.map((row) => (
        <TableRow
          key={row.id}
          data-state={row.getIsSelected() && "selected"}
        >
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))
    ) : (
      <TableRow>
        <TableCell colSpan={columns.length} className="h-24 text-center">
          No results.
        </TableCell>
      </TableRow>
    )}
  </TableBody>
</Table>
<div className="flex items-center justify-end space-x-2 py-4">
  <Button
    variant="outline"
    size="sm"
    onClick={() => table.previousPage()}
    disabled={!table.getCanPreviousPage()}
  >
    Previous
  </Button>
  <Button
    variant="outline"
    size="sm"
    onClick={() => table.nextPage()}
    disabled={!table.getCanNextPage()}
  >
    Next
  </Button>
</div>
</div>
    </div>
  )
}
