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
import { useContext } from "react";
import { MapContext } from "@/context/MapProvider.tsx";

export default function SearchEngineFormForPractitioners() {
  const {
    fields,
    isFetchingPractitioner,
    formForPractitionerSearchEngine,
    handleSubmitPractitionerSearchEngine,
    setPractitionerProfessionFilter,
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
    <Form {...formForPractitionerSearchEngine}>
      <form
        className={"pb-4 flex flex-col gap-1 sm:gap-2 px-2"}
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
                    value={field.value}
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

        <div className={"flex gap-2"}>
          <Button type="submit" className={"flex-1"}>
            Filtrer
          </Button>
          <Button
            variant={"destructive"}
            type="reset"
            className={"flex-1"}
            onClick={(e) => {
              e.preventDefault();

              Object.keys(formForPractitionerSearchEngine.getValues()).forEach(
                (field) => {
                  formForPractitionerSearchEngine.setValue(field, "");
                },
              );

              setPractitionerProfessionFilter(
                professions.map(({ libelle }) => libelle),
              );
            }}
          >
            Réinitialiser
          </Button>
        </div>
      </form>
    </Form>
  );
}
