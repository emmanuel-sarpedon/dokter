import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
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
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";

const SearchEngineFormForEstablishments = ({
  setIsOpened,
  setIsResultsOpen,
  fieldsRecords,
  isFetchingEstablishment,
  handleFetchEstablishments,
}: {
  setIsOpened: (isOpen: boolean) => void;
  setIsResultsOpen: (isOpen: boolean) => void;
  fieldsRecords: Fields;
  isFetchingEstablishment: boolean;
  handleFetchEstablishments: (
    filters: Record<string, unknown>,
  ) => Promise<void>;
}) => {
  const { categories, cities } = fieldsRecords;

  const formSchema = z.object({
    category: z.string().optional(),
    name: z.string().optional(),
    city: z.string().optional(),
    finess: z.string().optional(),
    siret: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleFetchEstablishments({ ...values }).then(() => {
      setIsOpened(false);
      setIsResultsOpen(true);
    });
  }

  const fields: {
    label: string;
    name: keyof z.infer<typeof formSchema>;
    options: { id: number; libelle: string }[] | null;
  }[] = [
    {
      label: "Catégorie",
      name: "category",
      options: categories,
    },
    { label: "Raison sociale", name: "name", options: null },
    { label: "Commune", name: "city", options: cities },
    { label: "Finess", name: "finess", options: null },
    { label: "Siret", name: "siret", options: null },
  ];

  return (
    <ScrollArea className={"h-full"}>
      <Form {...form}>
        <form
          className={"py-4 flex flex-col gap-4 px-2"}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {fields.map(({ label, name, options }) => {
            return (
              <FormField
                key={label}
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={"hidden sm:block"}>{label}</FormLabel>
                    {options ? (
                      <Select
                        disabled={isFetchingEstablishment}
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
                    ) : (
                      <FormControl>
                        <Input {...field} disabled={isFetchingEstablishment} />
                      </FormControl>
                    )}
                  </FormItem>
                )}
              />
            );
          })}

          <Button type="submit">Filtrer</Button>
        </form>
      </Form>
    </ScrollArea>
  );
};

export default SearchEngineFormForEstablishments;
