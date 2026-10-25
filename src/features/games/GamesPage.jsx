export function GamesPage() {
  return (
    <section className="games">
      <h1>Games</h1>
      <ul className="games-list">
        <li className="games-list-item">
          {/* Opens in a new tab on purpose: a window.open call inside a render is blocked by popup rules. */}
          <a href="/luci" target="_blank" rel="noopener">
            <img
              src="/images/luci/thumbnail.jpg"
              alt="Luci"
              className="games-list-item-thumbnail"
            />
          </a>
        </li>
      </ul>
    </section>
  );
}
