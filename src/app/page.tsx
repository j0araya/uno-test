import Link from "next/link";
const style = {
  container: { width: "100%", height: "300px" },
  content: {
    display: "flex",
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
    height: "100%",
  },
};

export default function Page() {
  return (
    <div style={style.container}>
      <div style={style.content}>
        <Link href="/game">IR al juego</Link>
      </div>
    </div>
  );
}
