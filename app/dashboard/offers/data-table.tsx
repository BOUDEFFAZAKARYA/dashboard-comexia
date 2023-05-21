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
import axios from "axios"
import React, { useState } from "react"

import { Textarea } from "@/components/ui/textarea"


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
 
  const handleInputChange4 = (event: { target: { value: React.SetStateAction<string> } }) => {
    
    setInputValue(event.target.value);
  };


  const handleSubmit = () => {
    addOffer();
    console.log('Input value:', inputValue);
    window.location.reload();

  };


async function addOffer(): Promise<any> {

  console.log('Add offer...');

  console.log('Categoris is :');


  console.log(values);


const offer = {
    title: inputName,
    desc: inputDesc,
    categorie: values,
    countryCode: val ,
    keywords: [
        {
            name: inputValue
        },

    ]
};
  const response = await axios.post('http://localhost:8001/api/products/create', offer);

  console.log('Response:', response.data);


}



const frameworks = [
  {
    value: "import",
    label: "import",
  },
  {
    value: "export",
    label: "export",
  },
 
]


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


      <div  className="flex justify-between items-center" >
      
      <div className="flex items-center py-4 space-x-4">

        <Input
          placeholder="Filter titres..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        
        <Input
          placeholder="Filter categorie..."
          value={(table.getColumn("categorie")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("categorie")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />



      <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
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



        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className=" bg-black text-white ">add offer</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>ajouter offer</DialogTitle>
              <DialogDescription>
                Make a new to offer here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value={inputName} onChange={handleInputChange} className="col-span-3" />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                desc
                </Label>
                {/* <Input id="name" value={inputDesc} onChange={handleInputChange1} className="col-span-3" /> */}

                <Textarea id="name" value={inputDesc} onChange={handleInputChange1} className="col-span-3" placeholder="Type your message here." />
              </div>


              <div className="grid grid-cols-4 items-center gap-4">

              <Label htmlFor="name" className="text-right">
                category
                </Label>

              <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
 
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
          value={values} 

        >
          {values
            ? frameworks.find((framework) => framework.value === values)?.label
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                onSelect={(currentValue) => {
                  setValues(currentValue === values ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    values === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
                  </div>


                  <div className="grid grid-cols-4 items-center gap-4">

              <Label htmlFor="name" className="text-right">
              countryCode
                </Label>

      <Popover open={opens} onOpenChange={setOpens}>
      <PopoverTrigger asChild>
 
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={opens}
          className="w-[200px] justify-between"
          value={val} 

        >
          {val
            ? countrycodes.find((cd) => cd.value === val)?.label
            : "Select countrycode..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
        <CommandInput placeholder="Search country code..." />
          <CommandEmpty>No countrycode found.</CommandEmpty>
          <CommandGroup>
            {countrycodes.map((cd) => (
              <CommandItem
                key={cd.value}
                onSelect={(currentVal) => {
                  setVal(currentVal === val ? "" : currentVal)
                  setOpens(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    val === cd.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {cd.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
                  </div>



              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Keyword
                </Label>
                <Input id="name" value={inputValue} onChange={handleInputChange4} className="col-span-3" />
              </div>

            </div>
            <DialogFooter>

              <Button               onClick={() => handleSubmit()}  type="submit">Save changes</Button>

            </DialogFooter>
          </DialogContent>
        </Dialog>


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
