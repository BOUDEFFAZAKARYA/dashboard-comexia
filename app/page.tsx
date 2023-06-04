'use client'

import Image from 'next/image'

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"



import { useToast } from "@/components/ui/use-toast"

import { cookies } from 'next/headers';


import versel from "../public/versel.svg";
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ToastAction } from '@/components/ui/toast'
import { NextResponse } from 'next/server'





export default function Home() {

  const [contine, setContinue] = React.useState(false);

  const [path, setPath] = React.useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = React.useState('');

  const { toast } = useToast()



  const handleEmailChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setEmail(event.target.value);

  };

  const handlePasswordChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setPassword(event.target.value);

  };



  const router = useRouter();


  const handleSubmit = () => {
    login();

  };

  async function login(): Promise<any> {

    if ((email == ("comexia@gmail.com" || "admin@gmail.com" || "boss@gmail.com")) && (password == ("testTest.31A"))) {
      const responce = NextResponse.next();
      responce.cookies.set('name', 'lee');

      router.push('/dashboard/offers/premuimOffers');


    } else if (!(email == ("comexia@gmail.com" || "admin@gmail.com" || "boss@gmail.com"))) {
      console.log('toast');
      toast({
        variant: "destructive",
        title: "Uh oh! wrong email .",
        description: "Possibly there was a problem with your email request.",
        action: <ToastAction onClick={() => { setEmail('') }} altText="Try again">Reset email </ToastAction>,
      })
    } else if (!(password == ("testTest.31A"))) {
      console.log('toast');
      toast({
        variant: "destructive",
        title: "Uh oh! wrong password .",
        description: "Possibly there was a problem with your password request.",
        action: <ToastAction onClick={() => { setPassword('') }} altText="Try again">Reset password </ToastAction>,
      })
    }
  }



  return (
    <div className=" flex justify-center items-center h-screen   ">
      <div className="  space-y-4 w-1/3">
        <div className="flex justify-center">
          <Image src="/comexia.svg" alt="Vercel Logo" width={140} height={60} />

        </div>
        <p className="text-center text-4xl font-bold		">Welcome back</p>

        {(contine &&
          <p className="text-center text-xl text-slate-500	">Enter your password to sign in to your account </p>) ||
          <p className="text-center text-xl text-slate-500	">Enter your email to sign in to your account </p>

        }
        <Input
          id="email"
          placeholder="name@example.com"
          type="email"
          autoCapitalize="none"
          autoComplete="none"
          autoCorrect="off"
          value={email}
          onChange={handleEmailChange}
          className=" h-14 w-full  text-lg	"
        />

        {contine &&
          <Input
            id="password"
            placeholder="password"
            type="password"
            autoCapitalize="none"
            autoComplete="none"
            autoCorrect="off"
            value={password}
            onChange={handlePasswordChange}
            className=" h-14 w-full  text-lg	"
          />

        }

        {(contine &&
          <Button
            onClick={() => handleSubmit()}
            className="bg-black text-white h-16 w-full  text-xl">  Continue  </Button>) ||


          <Button onClick={() => { setContinue((prev) => true) }
          }
            className="bg-black text-white h-16 w-full  text-xl">  Continue  </Button>

        }
      </div>
    </div>


  )







}


