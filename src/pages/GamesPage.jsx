import { useMemo, useState } from 'react'
import GamesCarousel from '../components/games/GamesCarousel.jsx'
import games from '../data/gamesData.js'
import { useGameEconomy } from '../context/GameEconomyContext.jsx'
import styles from './GamesPage.module.css'

export default function GamesPage() {
  const { state, resetDemo } = useGameEconomy()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  const categories = useMemo(
    () => ['All', ...new Set(games.map((game) => game.category).filter(Boolean))],
    []
  )

  const filteredGames = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return games.filter((game) => {
      const matchesCategory = category === 'All' || game.category === category
      const matchesQuery =
        !normalized ||
        game.name.toLowerCase().includes(normalized) ||
        game.category?.toLowerCase().includes(normalized)
      return matchesCategory && matchesQuery
    })
  }, [category, query])

  return (
    <main className={styles.page}>
      <div className={styles.glow} aria-hidden="true" />
      <section className={styles.shell}>
        <header className={styles.topbar}>
          <div className={styles.brand} aria-label="VELoop Rewards">
            <span>V</span>
            <div>
              <strong>VELoop</strong>
              <small>REWARDS ARCADE</small>
            </div>
          </div>

          <div className={styles.wallet}>
            <span>
              <img src="/assets/icons/token.avif" alt="" />
              <b>{state.tokens}</b> Tokens
            </span>
            <span>
              <img src="/assets/icons/game-coin.avif" alt="" />
              <b>{state.gameCoins}</b> Coins
            </span>
          </div>
        </header>

        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}>
              <span className={styles.liveDot} />
              PLAY • EARN • REDEEM
            </div>
            <h1>Play smart.<br /><em>Earn more.</em></h1>
            <p>
              Jump into quick challenges, spend Tokens to enter, and build your
              Game Coin balance for rewards.
            </p>

            <div className={styles.heroActions}>
              <a href="#game-library">Explore games <span>↓</span></a>
              <button type="button" onClick={resetDemo}>Reset demo</button>
            </div>
          </div>

          <div className={styles.heroStats}>
            <div className={styles.balanceCard}>
              <span>YOUR BALANCE</span>
              <strong>{state.gameCoins}</strong>
              <small>Game Coins</small>
              <img src="/assets/icons/game-coin.avif" alt="" />
            </div>
            <div className={styles.miniStats}>
              <div><b>{games.length}</b><span>Games</span></div>
              <div><b>20</b><span>Entry tokens</span></div>
            </div>
          </div>
        </section>

        <section id="game-library" className={styles.library}>
          <div className={styles.sectionHead}>
            <div>
              <p>GAME LIBRARY</p>
              <h2>Pick your challenge</h2>
            </div>
            <span>{filteredGames.length} of {games.length} available</span>
          </div>

          <div className={styles.controls}>
            <label className={styles.search}>
              <span aria-hidden="true">⌕</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search games..."
                aria-label="Search games"
              />
              {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search">×</button>}
            </label>

            <div className={styles.filters} aria-label="Filter by category">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={category === item ? styles.activeFilter : ''}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {filteredGames.length ? (
            <GamesCarousel games={filteredGames} />
          ) : (
            <div className={styles.empty}>
              <strong>No games found</strong>
              <span>Try another search or category.</span>
              <button type="button" onClick={() => { setQuery(''); setCategory('All') }}>Show all games</button>
            </div>
          )}
        </section>

        <section className={styles.infoGrid} aria-label="Game information">
          <div><strong>01</strong><span>Choose a challenge</span><small>Browse by genre and find your vibe.</small></div>
          <div><strong>02</strong><span>Enter with 20 Tokens</span><small>One simple entry cost across the arcade.</small></div>
          <div><strong>03</strong><span>Play & collect</span><small>Playable titles feed rewards into your wallet.</small></div>
          <div><strong>04</strong><span>Redeem rewards</span><small>Convert Game Coins from the Redeem page.</small></div>
        </section>

        <footer className={styles.footer}>
          <span>VELoop Rewards Arcade</span>
          <span>Demo experience • Frontend state only</span>
        </footer>
      </section>
    </main>
  )
}
