const LOCAL_STORAGE_USER = "Username";

const getLocalUser = (): string => {
  return localStorage.getItem(LOCAL_STORAGE_USER) || "";
};

const setLocalUser = (name: string) => {
  localStorage.setItem(LOCAL_STORAGE_USER, name);
};

export { setLocalUser, getLocalUser };
