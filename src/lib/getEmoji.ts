export const getEmoji = (profession?: string | null) => {
  switch (profession) {
    case "Anesthésiste réanimateur":
      return "💤";

    case "Cancérologue  radiothérapeute":
      return "🩻";

    case "Cardiologue":
      return "💙";

    case "Chirurgien général":
      return "😷";

    case "Chirurgien maxillo-facial":
      return "😷";

    case "Chirurgien maxillo-facial et stomatologiste":
      return "😷";

    case "Chirurgien orthopédiste et traumatologue":
      return "😷";

    case "Chirurgien plasticien":
      return "😷";

    case "Chirurgien thoracique et cardio-vasculaire":
      return "😷";

    case "Chirurgien urologue":
      return "😷";

    case "Chirurgien vasculaire":
      return "😷";

    case "Chirurgien viscéral":
      return "😷";

    case "Chirurgien-dentiste":
      return "🦷";

    case "Chirurgien-dentiste spécialiste en orthopédie dento-faciale":
      return "🦷";

    case "Dermatologue et vénérologue":
      return "🧴";

    case "Endocrinologue-diabétologue":
      return "🥗";

    case "Gastro-entérologue et hépatologue":
      return "🧑‍🔬";

    case "Gynécologue médical":
      return "👶";

    case "Gynécologue médical et obstétricien":
      return "👶";

    case "Gynécologue obstétricien":
      return "👶";

    case "Gériatre":
      return "👴";

    case "Médecin généraliste":
      return "👨‍⚕️";

    case "Médecin spécialiste en médecine nucléaire":
      return "👨‍⚕️";

    case "Neurologue":
      return "🧠";

    case "Néphrologue":
      return "🩺";

    case "Ophtalmologiste":
      return "👁️";

    case "Oto-Rhino-Laryngologue (ORL) et chirurgien cervico-facial":
      return "👂";

    case "Pneumologue":
      return "🫁";

    case "Psychiatre":
      return "🧠";

    case "Pédiatre":
      return "👶";

    case "Radiologue":
      return "🩻";

    case "Rhumatologue":
      return "🦴";

    case "Sage-femme":
      return "🤰";

    case "Spécialiste en médecine physique et de réadaptation":
      return "🦾";

    default:
      return "👨‍⚕️";
  }
};
