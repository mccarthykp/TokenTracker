export default function Footer() {
  return (
    <>
      <section className="flex flex-col py-6 px-10 items-center text-left md:text-center select-none dark:bg-slate-800 bg-zinc-950">
        <p className="text-xs text-slate-400 min-w-[355px]">Built with React. Hosted on GitHub Pages.</p>
        <p className="text-xs text-slate-400 min-w-[355px]">
          &copy; 2024 - <b>Designed & Developed by Kevin McCarthy</b>
        </p>
      </section>
    </>
  );
}
