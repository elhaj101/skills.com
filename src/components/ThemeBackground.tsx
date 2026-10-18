// Fixed deep-space backdrop: gradients and two slow star layers in pure CSS
// (see .starfield in globals.css). No canvas, no video, no JS.
export function ThemeBackground() {
  return <div className="starfield" aria-hidden="true" />;
}

// Runs before first paint so the stored theme never flashes.
export const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;
