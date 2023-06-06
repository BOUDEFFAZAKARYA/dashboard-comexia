"use client"

import { DataTable } from "./data-table";
import { columns } from "./columns";


import useSWR, { mutate } from "swr"


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

export type offers = {
  id: number
  title: string
  desc: string
  categorie: "import" | "export"
  countryCode: string
  views: number
  created_at: string
  premium: boolean
  valide: boolean
  keywords: keyword

}


export type keyword = {

  id: number
  name: string
}

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function Page() {


  const [inputName, setInputName] = useState('');
  const [inputDesc, setInputDesc] = useState('');
  const [inputCategorie, setInputCategorie] = useState('');
  const [inputCountryCode, setInputCountryCode] = useState('');
  const [inputValue, setInputValue] = useState('');

  
  const [open, setOpen] = useState(false)

  const [opens, setOpens] = useState(false)

  const [values, setValues] = useState("")

  const [val, setVal] = useState("")






  const { data, error, isLoading, mutate } = useSWR('http://146.190.184.106:81/api/products/All', fetcher, { refreshInterval: 1000 })

  console.log(data)

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  async function addOffer(): Promise<any> {
    const offer = {
        title: inputName,
        desc: inputDesc,
        categorie: values,
        countryCode: val,
        keywords: [
          {
            name: inputValue
          },
  
        ]
      };
      const response = await axios.post('http://146.190.184.106:81/api/products/create', offer);

      mutate();

  
      console.log('Response:', response.data);
   }
  const handleInputChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setInputName(event.target.value);
  };

  const handleInputChange1 = (event: { target: { value: React.SetStateAction<string> } }) => {
    setInputDesc(event.target.value);
  };
  const handleInputChange4 = (event: { target: { value: React.SetStateAction<string> } }) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    await addOffer();
     console.log('Input value:', inputValue);
 
   };
   

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
    <div className="container mx-auto py-10">

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













      <DataTable columns={columns} data={data} />

    </div>)
}


