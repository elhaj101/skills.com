// Fixed deep-space backdrop: gradients and two slow star layers in pure CSS
// (see .starfield in globals.css).
export function ThemeBackground() {
  return <div className="starfield" aria-hidden="true" />;
}

// Runs before first paint: applies the stored theme (no flash) and marks
// that JavaScript is on, so scroll reveals only hide content when they can
// also show it again.
export const themeScript = `try{var d=document.documentElement;d.setAttribute("data-js","");var t=localStorage.getItem("theme");if(t==="light"||t==="dark")d.dataset.theme=t}catch(e){}`;
