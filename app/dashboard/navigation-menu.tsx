
"use client"

import * as React from "react"
import Link from "next/link"
import Image from 'next/image';

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "companies",
    href: "/dashboard/companies/all",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Invalid Companies",
    href: "/dashboard/companies/invalid", 
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Keywords",
    href: "/dashboard/kaywords",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Categories",
    href: "/dashboard/companies/categories",
    description: "Visually or semantically separates content.",
  },
  {
    title: "commercant",
    href: "/dashboard/commercant/all",
    description:
      "For sighted users to preview content available behind a link.",
  },

]

export function NaviMenu() {
  return (

    <div className="flex justify-center space-between content-start px-10 py-3 flex-row  items-center ">
       <Link className="" href={"/dashboard/offers"}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={100} height={36} />

            </Link>
    <NavigationMenu className="">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Client offers</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/dashboard/offers/premuimOffers"
                  >
                                        <div className="mb-2 mt-4 text-lg font-medium">
                                        premuim offers
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components built with Radix UI and
                      Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/dashboard/offers" title="offers">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/dashboard/offers/valideOffers" title="valide offers">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/dashboard/offers/invalideOffers" title="invalide offers">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
           
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        
      </NavigationMenuList>
    </NavigationMenu>

    <Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

      
