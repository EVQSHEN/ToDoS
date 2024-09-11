const validateInput = (form: string) => {
  if (form === undefined || form === null || form.trim() === '') return true;
  return false;
};
export default validateInput;
