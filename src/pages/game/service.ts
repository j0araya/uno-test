import { IMG } from "../../types";

const shuffle = (array: IMG[]) => {
  const temp = [...array, ...array];
  for (let i = temp.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [temp[i], temp[j]] = [temp[j], temp[i]];
  }
  return temp;
};

const addId = (img: IMG, i: number): IMG => ({ ...img, id: i + 1 });

const getImages = async () => {
  try {
    const URL = "https://challenge-uno.vercel.app/api/images";
    const data = await fetch(URL);
    const images = await data.json();
    const shuffled = shuffle(images).map(addId);
    return shuffled;
  } catch (e) {
    console.warn("error", e);
    return [];
  }
};

export { getImages };
