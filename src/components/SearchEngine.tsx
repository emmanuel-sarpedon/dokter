"use client";

import { Button } from "@/components/ui/button.tsx";
import { useFields } from "@/hooks/useFields.ts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form.tsx";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet.tsx";
import { useContext, useState } from "react";
import { MapContext } from "@/context/MapContext.ts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { P } from "@/components/Typography.tsx";
import { BellIcon } from "@radix-ui/react-icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useMap } from "react-leaflet";

const SearchEngine = () => {
  const map = useMap();

  const { professions, procedures, sesamVitales, cities, agreements } =
    useFields();

  const { isFetchingPractitioner, practitioners, handleFetchPractitioners } =
    useContext(MapContext);

  const [isSheetOpened, setIsSheetOpened] = useState(false);

  const formSchema = z.object({
    profession: z.string().optional(),
    procedure: z.string().optional(),
    sesamVitale: z.string().optional(),
    city: z.string().optional(),
    agreement: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!handleFetchPractitioners) return;
    handleFetchPractitioners(values);
  }

  const fields: {
    label: string;
    name: keyof z.infer<typeof formSchema>;
    options: { id: number; libelle: string }[];
  }[] = [
    { label: "Profession", name: "profession", options: professions },
    { label: "Type d'acte pratiqué", name: "procedure", options: procedures },
    { label: "Carte Vitale", name: "sesamVitale", options: sesamVitales },
    { label: "Commune", name: "city", options: cities },
    { label: "Conventionnement", name: "agreement", options: agreements },
  ];

  return (
    <Sheet open={isSheetOpened} onOpenChange={setIsSheetOpened}>
      <SheetTrigger className={"z-10 absolute top-10 right-10"} asChild>
        {isFetchingPractitioner ? (
          <Button className={"font-dosis"}>{"Chargement..."}</Button>
        ) : (
          <Button
            className={"font-dosis"}
          >{`${practitioners.length} résultats. Affiner votre recherche`}</Button>
        )}
      </SheetTrigger>

      <SheetContent>
        <SheetHeader className={"hidden sm:block"}>
          <SheetTitle>Recherche de professionnels de santé</SheetTitle>
          <SheetDescription>
            {
              "Filter les professionnels de santé par profession, type d'acte pratiqué, commune."
            }
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className={"h-full"}>
          <Form {...form}>
            <form
              className={"py-4 flex flex-col gap-4"}
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <Accordion type={"single"} collapsible>
                <AccordionItem value={"filters"}>
                  <AccordionTrigger>Affiner ma recherche</AccordionTrigger>
                  {fields.map(({ label, name, options }) => {
                    return (
                      <AccordionContent className={"px-1"}>
                        <FormField
                          key={name}
                          control={form.control}
                          name={name}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className={"hidden sm:block"}>
                                {label}
                              </FormLabel>
                              <Select
                                disabled={isFetchingPractitioner}
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder={label} />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {options.map(({ id, libelle }) => (
                                    <SelectItem key={id} value={libelle}>
                                      {libelle}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                      </AccordionContent>
                    );
                  })}
                </AccordionItem>
              </Accordion>

              <Button type="submit" disabled={isFetchingPractitioner}>
                Filtrer
              </Button>
            </form>
          </Form>

          <div className={"flex flex-col gap-y-4 "}>
            {practitioners.map(
              ({ id, name, address, tel, profession, longitude, latitude }) => {
                return (
                  <div
                    key={id}
                    className={"p-2 shadow rounded hover:cursor-pointer"}
                    onClick={() => {
                      if (!map) return;
                      if (!latitude || !longitude) return;

                      map.setView([latitude, longitude], 22);
                      setIsSheetOpened(false);
                    }}
                  >
                    <P bold>{`DR ${name} - ${profession}`}</P>
                    <P>{address}</P>
                    {tel ? (
                      <P className={"flex items-center"}>
                        <BellIcon className={"mr-2 h-4 w-4"} />
                        {tel}
                      </P>
                    ) : null}
                  </div>
                );
              },
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default SearchEngine;
