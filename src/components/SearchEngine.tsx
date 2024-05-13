"use client";

import { Button } from "@/components/ui/button.tsx";
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
} from "@/components/ui/sheet.tsx";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Practitioner } from "@prisma/client";

const SearchEngine = ({
  isOpened,
  setIsOpened,
  setIsResultsOpen,
  fieldsRecords,
  isFetchingPractitioner,
  handleFetchPractitioners,
}: {
  isOpened: boolean;
  setIsOpened: (isOpen: boolean) => void;
  setIsMenuOpened: (isMenuOpened: boolean) => void;
  setIsResultsOpen: (isOpen: boolean) => void;
  fieldsRecords: Fields;
  isFetchingPractitioner: boolean;
  practitioners: Partial<Practitioner>[];
  handleFetchPractitioners: (filters: Record<string, unknown>) => Promise<void>;
}) => {
  const { professions, procedures, sesamVitales, cities, agreements } =
    fieldsRecords;

  const formSchema = z.object({
    profession: z.string().optional().nullable(),
    procedure: z.string().optional().nullable(),
    sesamVitale: z.string().optional().nullable(),
    city: z.string().optional().nullable(),
    agreement: z.string().optional().nullable(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleFetchPractitioners({ ...values }).then(() => {
      setIsOpened(false);
      setIsResultsOpen(true);
    });
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
    <Sheet open={isOpened} onOpenChange={setIsOpened}>
      <SheetContent className={"sm:max-w-1000px"}>
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
              <Accordion type={"single"} collapsible defaultValue={"filters"}>
                <AccordionItem value={"filters"}>
                  <AccordionTrigger>Affiner ma recherche</AccordionTrigger>
                  <Button
                    variant={"ghost"}
                    className={
                      "mb-4 text-red-700 hover:bg-red-100 hover:text-red-900"
                    }
                    onClick={(event) => {
                      event.preventDefault();

                      form.setValue("profession", null);
                      form.setValue("procedure", null);
                      form.setValue("sesamVitale", null);
                      form.setValue("city", null);
                      form.setValue("agreement", null);
                    }}
                  >
                    Réinitialiser les filtres
                  </Button>
                  {fields.map(({ label, name, options }) => {
                    return (
                      <AccordionContent className={"px-1"} key={label}>
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
                                defaultValue={field.value || undefined}
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
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default SearchEngine;
