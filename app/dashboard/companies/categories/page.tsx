"use client"

import { DataTable } from "./data-table";
import { columns } from "./columns";
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
import useSWR, { mutate } from "swr"
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";



const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function Page() {

  const [inputValue, setInputValue] = useState('');


  const { data, error, isLoading , mutate } = useSWR('http://146.190.184.106:81/api/categorie/All', fetcher , { refreshInterval: 1000 })

  console.log(data)

  if (error) return <div>failed to load</div>
  
  if (isLoading)     return <div className="flex items-center justify-center space-x-4 py-10">
  <div className="space-y-4 items-center ">
    <Skeleton className="h-8 w-[1000px]" />
    <Skeleton className="h-8 w-[1000px]" />
    <Skeleton className="h-8 w-[1000px]" />
    <Skeleton className="h-8 w-[1000px]" />
    <Skeleton className="h-8 w-[1000px]" />
    <Skeleton className="h-8 w-[1000px]" />
    <Skeleton className="h-8 w-[1000px]" />
    <Skeleton className="h-8 w-[1000px]" />
  </div>
</div>


  const handleInputChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
   await addCategory();
    console.log('Input value:', inputValue);

  };



  async function addCategory(): Promise<any> {

    console.log('Add catgorie...');
  
    const category = { name: inputValue  };
    const response = await axios.post('http://146.190.184.106:81/api/categorie/create', category);
    mutate();
  
    console.log('Response:', response.data);
  
  
  }

  return (
    <div className="container mx-auto py-10">

<Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className=" bg-black text-white ">ajouter categorie</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>ajouter keyword</DialogTitle>
              <DialogDescription>
                Make a new to keyword here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value={inputValue} onChange={handleInputChange} className="col-span-3" />
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


