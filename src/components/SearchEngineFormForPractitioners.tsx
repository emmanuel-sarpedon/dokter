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
import { useContext } from "react";
import { MapContext } from "@/context/MapProvider.tsx";

export default function SearchEngineFormForPractitioners() {
  const {
    fields,
    isFetchingPractitioner,
    formForPractitionerSearchEngine,
    handleSubmitPractitionerSearchEngine,
  } = useContext(MapContext);

  const { professions, procedures, sesamVitales, cities, agreements } = fields;

  const fieldsInput: {
    label: string;
    name: string;
    options: { id: number; libelle: string }[];
  }[] = [
    { label: "Profession", name: "profession", options: professions },
    { label: "Type d'acte pratiqué", name: "procedure", options: procedures },
    { label: "Carte Vitale", name: "sesamVitale", options: sesamVitales },
    { label: "Commune", name: "city", options: cities },
    { label: "Conventionnement", name: "agreement", options: agreements },
  ];

  if (!formForPractitionerSearchEngine) return null;

  return (
    <ScrollArea className={"h-full"}>
      <Form {...formForPractitionerSearchEngine}>
        <form
          className={"py-4 flex flex-col gap-2 sm:gap-2 px-2"}
          onSubmit={formForPractitionerSearchEngine.handleSubmit(
            handleSubmitPractitionerSearchEngine,
          )}
        >
          {fieldsInput.map(({ label, name, options }) => {
            return (
              <FormField
                key={name}
                control={formForPractitionerSearchEngine.control}
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
