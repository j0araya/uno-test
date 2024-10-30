"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { IMG } from "../../types";
import getImages from "./service";
import Card from "../../components/card/index";
import { getLocalUser, setLocalUser } from "../../utils/LocalStorageUtils";

const defaultImg: IMG = {
  id: 0,
  url: "",
  uuid: "",
  title: "",
  show: false,
};

export default function Game() {
  const [images, setImages] = useState<IMG[]>([]);
  const [selected, setSelected] = useState<IMG>(defaultImg);
  const [secondary, setSecondary] = useState<IMG>(defaultImg);
  const [assert, setAssert] = useState<number>(0);
  const [errors, setErrors] = useState<number>(0);
  const [user, setUser] = useState<string>("");
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const get = async () => {
      const data = await getImages();
      setImages(data);
    };
    get();
    const user = getLocalUser();
    if (user) setUser(user);
  }, []);

  const onSelect = (item: IMG) => {
    // wait timeou of secondary card
    if (secondary.id) return;
    // select same card
    if (selected.id === item.id) {
      setSelected(defaultImg);
      // select match
    } else if (selected.uuid === item.uuid) {
      const temp = images.map((i) =>
        i.uuid === item.uuid ? { ...i, show: true } : i
      );
      setAssert((a) => a + 1);
      setImages(temp);
      setSelected(defaultImg);
      // not mach
    } else if (selected.id) {
      setErrors((e) => e + 1);
      setSecondary(item);
      setTimeout(() => {
        setSelected(defaultImg);
        setSecondary(defaultImg);
      }, 1000);
    } else {
      setSelected(item);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalUser(name);
    setUser(name);
  };

  const finished = useMemo(
    () => user && !!images.length && images.length / 2 === assert,
    [images, assert, user]
  );

  return (
    <>
      <div style={{ height: "100px" }}>
        {!finished && (
          <h1 style={{ textAlign: "center" }}>
            Aciertos: {assert} - Errores: {errors}
          </h1>
        )}
        {finished && (
          <h1 style={{ textAlign: "center" }}>Feliciationes {user}</h1>
        )}
      </div>
      {!user && !!images.length && (
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: "24px 0",
          }}
        >
          <form onSubmit={onSubmit}>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Ingresa tu nombre"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={onChange}
            />
            <button type="submit">guardar</button>
          </form>
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          rowGap: "12px",
          columnGap: "12px",
          justifyContent: "center",
        }}
      >
        {images.map((img) => (
          <div key={img.id} className="card-grid" onClick={() => onSelect(img)}>
            <Card
              img={img}
              show={
                img.show || selected.id === img.id || secondary.id === img.id
              }
            />
          </div>
        ))}
      </div>
    </>
  );
}
