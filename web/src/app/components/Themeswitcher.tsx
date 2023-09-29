import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { RiMoonFill, RiSunLine } from "react-icons/ri";

export default function ThemeSwitcher() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <div>
      {!mounted ? (
        <button className="rounded-xl p-2">
          <RiSunLine size={25} color="#00000000" />
        </button>
      ) : currentTheme === "dark" && mounted ? (
        <button
          onClick={() => {
            setTheme("light");
            // setNavbar(!navbar);
          }}
          className="rounded-xl p-2"
        >
          <RiSunLine size={25} color="white" />
        </button>
      ) : (
        <button
          onClick={() => {
            setTheme("dark");
            // setNavbar(!navbar);
          }}
          className="rounded-xl p-2"
        >
          <RiMoonFill size={25} color="black" />
        </button>
      )}
    </div>
  );
}
