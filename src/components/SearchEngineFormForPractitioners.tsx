import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SearchEngineFormForPractitioners({
  setIsOpened,
  setIsResultsOpen,
  fieldsRecords,
  isFetchingPractitioner,
  handleFetchPractitioners,
}: {
  setIsOpened: (isOpen: boolean) => void;
  setIsResultsOpen: (isOpen: boolean) => void;
  fieldsRecords: Fields;
  isFetchingPractitioner: boolean;
  handleFetchPractitioners: (filters: Record<string, unknown>) => Promise<void>;
}) {
  const { professions, procedures, sesamVitales, cities, agreements } =
    fieldsRecords;

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
    <ScrollArea className={"h-full"}>
      <Form {...form}>
        <form
          className={"py-4 flex flex-col gap-2 sm:gap-2 px-2"}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {fields.map(({ label, name, options }) => {
            return (
              <FormField
                key={name}
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <Select
                      disabled={isFetchingPractitioner}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
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
            );
          })}

          <Button type="submit" disabled={isFetchingPractitioner}>
            Filtrer
          </Button>
        </form>
      </Form>
    </ScrollArea>
  );
}
