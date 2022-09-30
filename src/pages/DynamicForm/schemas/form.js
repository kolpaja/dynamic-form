
const form = {
  formId: "new-client-form",
  formField: {
    PersonName: {
      name: "person_name",
      label: "Person Name",
      type: "text",
      placeholder: "eg. Beni",
      errorMsg: "name is required.",
    },

    Country: {
      name: "Country",
      label: "country",
      type: "select",
      placeholder: "eg. Albania",
      errorMsg: "Country is required.",
    },
  },
};

export default form;
