import * as Yup from "yup";
import form from "./form";

const { PersonName, Country } = form.formField

const validations = Yup.object().shape({
  [PersonName.name]: Yup.string().min(3).max(64).required(PersonName.errorMsg),
  [Country.name]: Yup.string().required(Country.errorMsg),
})

export default validations;
