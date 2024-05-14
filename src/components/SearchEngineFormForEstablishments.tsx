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
import { useContext } from "react";
import { MapContext } from "@/context/MapProvider.tsx";

const SearchEngineFormForEstablishments = () => {
  const {
    fields,
    isFetchingEstablishments,
    formForEstablishmentSearchEngine,
    handleSubmitEstablishmentSearchEngine,
  } = useContext(MapContext);
  const { categories, cities } = fields;

  const fieldsInput: {
    label: string;
    name: string;
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

  if (!formForEstablishmentSearchEngine) return null;

  return (
    <ScrollArea className={"h-full"}>
      <Form {...formForEstablishmentSearchEngine}>
        <form
          className={"py-4 flex flex-col gap-2 sm:gap-2 px-2"}
          onSubmit={formForEstablishmentSearchEngine.handleSubmit(
            handleSubmitEstablishmentSearchEngine,
          )}
        >
          {fieldsInput.map(({ label, name, options }) => {
            return (
              <FormField
                key={label}
                control={formForEstablishmentSearchEngine.control}
                name={name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    {options ? (
                      <Select
                        disabled={isFetchingEstablishments}
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
                        <Input {...field} disabled={isFetchingEstablishments} />
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
