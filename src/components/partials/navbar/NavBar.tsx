"use client";
import { Button } from "@/components/ui/button";
import { NAVIGATION_BAR } from "@/data/Navigation";
import Link from "next/link";
import React from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Account from "@/components/wallet/Account";
import { Icons } from "@/components/assets/Icons";
import { Triangle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CustomButton from "@/components/custom/CustomButton";

export default function NavBar() {
  const [openMenuId, setOpenMenuId] = React.useState<string | null>(null);

  const toggleMenu = (id: string) => {
    setOpenMenuId((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      <nav
        className={`h-20 border-b w-full hidden md:flex items-center justify-center sticky top-0 left-0 bg-background/90 backdrop-blur-md z-50 relative `}
      >
        <div
          className={`container mx-auto flex items-center justify-between w-full`}
        >
          <Link href={"/"} className={`h-20`}>
            <Icons.textLogo
              className={`h-full w-auto aspect-video object-contain fill-foreground`}
            />
          </Link>
          <div>
            <ul className="flex items-center justify-center space-x-4">
              {NAVIGATION_BAR.map((n) => (
                <li key={n.id}>
                  <Button
                    variant={"link"}
                    onClick={() => toggleMenu(n.id.toString())}
                    className={`flex items-center gap-2`}
                  >
                    <span>{n.name}</span>
                    <span>
                      <Triangle
                        className={`fill-foreground size-2 transition-all ${
                          openMenuId === n.id.toString() && "rotate-180"
                        }`}
                      />
                    </span>
                  </Button>
                  {openMenuId === n.id.toString() && (
                    <div
                      className={`absolute left-0 -bottom-14 min-h-14 w-full bg-background border-b shadow-lg flex items-center justify-center`}
                    >
                      <ul className={`flex items-center justify-center gap-2`}>
                        {n.items.map((item) => (
                          <li key={item.id}>
                            <Button variant={"ghost"} asChild>
                              <Link href={item.value}>{item.name}</Link>
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <CustomButton>Buy Acces</CustomButton>
              </DialogTrigger>
              <DialogContent
                className={`bg-[#07112B] md:rounded-[36px] border-white/20`}
              >
                <DialogHeader>
                  <DialogTitle className={`text-foreground text-center`}>
                    Buy Before It Is Listed On The Market
                  </DialogTitle>
                </DialogHeader>
                <Account />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </nav>
      <nav
        className={`h-20 border-b w-full flex md:hidden items-center justify-center sticky top-0 bg-background/90 backdrop-blur-md z-50`}
      >
        <div
          className={`container mx-auto flex items-center justify-between w-full`}
        >
          <Link href={"/"} className={`h-20`}>
            <Icons.textLogo
              className={`h-full w-auto aspect-video object-contain fill-foreground`}
            />
          </Link>
          <div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant={"link"}>
                  <Icons.hamburgerMenuIcon
                    className={`size-10 aspect-square object-contain`}
                  />
                </Button>
              </SheetTrigger>
              <SheetContent className={`w-full`}>
                <SheetHeader
                  className={`h-full flex flex-col justify-between items-center`}
                >
                  <SheetTitle asChild className={`w-full`}>
                    {/* <h2>Metacces Navigation</h2> */}
                    <div></div>
                  </SheetTitle>
                  <SheetDescription asChild>
                    <ul className={`flex flex-col gap-6 w-full`}>
                      {NAVIGATION_BAR.map((n) => (
                        <li key={n.id} className={`w-full`}>
                          <Accordion
                            type="single"
                            collapsible
                            className={`w-full`}
                          >
                            <AccordionItem
                              value={`${n.name}`}
                              className={`w-full `}
                            >
                              <AccordionTrigger
                                className={`rounded-full text-3xl font-semibold text-foreground w-full focus:outline-none`}
                              >
                                {n.name}
                              </AccordionTrigger>
                              <AccordionContent>
                                <ul>
                                  {n.items.map((i) => (
                                    <li key={i.id}>
                                      <SheetClose asChild>
                                        <Button
                                          variant={"link"}
                                          className={`text-xl font-semibold text-foreground w-fullflex items-center justify-start focus:outline-none`}
                                          asChild
                                        >
                                          <Link
                                            href={`${i.value}`}
                                            className={`w-full`}
                                          >
                                            {i.name}
                                          </Link>
                                        </Button>
                                      </SheetClose>
                                    </li>
                                  ))}
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </li>
                      ))}
                    </ul>
                  </SheetDescription>
                  <SheetFooter className={"w-full"}>
                    <CustomButton className={`w-full`}>
                      <Link href={"/buy-acces"}>Buy Acces</Link>
                    </CustomButton>
                  </SheetFooter>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
}
