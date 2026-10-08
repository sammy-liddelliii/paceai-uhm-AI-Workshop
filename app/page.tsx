// Edit this list to update the "This semester" section.
const thisSemester = [
  "Taking an intro programming course",
  "Working through first-year calculus",
  "Joining a hands-on engineering club",
];

export default function Home() {
  return (
    <>
      <header className="hero">
        <h1>Sammy Liddell</h1>
        <p className="tagline">
          A freshman at UH Manoa studying computer engineering.
        </p>
      </header>

      <main>
        <section>
          <h2>About</h2>
          <p>
            I&apos;m a freshman at the University of Hawaiʻi at Mānoa, studying
            computer engineering. I&apos;m just getting started and excited to
            learn how hardware and software work together. This site is where
            I&apos;ll share what I&apos;m learning along the way.
          </p>
        </section>

        <section>
          <h2>This semester</h2>
          <ul>
            {thisSemester.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </main>

      <footer>
        <p>© {new Date().getFullYear()} Sammy Liddell</p>
      </footer>
    </>
  );
}
