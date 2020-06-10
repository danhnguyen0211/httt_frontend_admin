export const validateNotNull = (value: string) => {
  if (value != "") {
    return true;
  }
  return false;
};

export const getBase64 = (file, cb) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = async () => {
    const dataBase64 = reader.result.toString();
    cb(dataBase64);
  };
  reader.onerror = error => {
    console.log("Error: ", error);
    cb(false);
  };
};
