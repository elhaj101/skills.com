import { SpaceParticles } from "./SpaceParticles";

// Fixed deep-space backdrop for every page: the background colour and glows
// are CSS (.starfield in globals.css), the moving particles are a canvas.
export function ThemeBackground() {
  return (
    <div className="starfield" aria-hidden="true">
      <SpaceParticles />
    </div>
  );
}

// Runs before first paint: applies the stored theme (no flash) and marks
// that JavaScript is on, so scroll reveals only hide content when they can
// also show it again.
export const themeScript = `try{var d=document.documentElement;d.setAttribute("data-js","");var t=localStorage.getItem("theme");if(t==="light"||t==="dark")d.dataset.theme=t}catch(e){}`;
