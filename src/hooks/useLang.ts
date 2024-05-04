import { useUnit } from 'effector-react'; // Importing useStore from Effector
import { $lang } from '../contexts/lang'; // Importing the Effector store
import translationsJson from '../../public/translations/translations.json';

export const useLang = () => {
    const lang = useUnit($lang); // Using useStore to access the state of $lang
    const translations = translationsJson; // Loading translations JSON

    return { lang, translations };
};
