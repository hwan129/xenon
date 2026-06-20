import { useMemo, useState } from 'react';
import './App.css';

const INITIAL_STATS = {
  strength: '',
  dexterity: '',
  luck: '',
  attack: '',
  allStat: '',
};

const fields = [
  { key: 'strength', label: '힘', shortLabel: 'STR', multiplier: 1, accent: 'yellow' },
  { key: 'dexterity', label: '덱스', shortLabel: 'DEX', multiplier: 1, accent: 'green' },
  { key: 'luck', label: '럭', shortLabel: 'LUK', multiplier: 1, accent: 'purple' },
  { key: 'attack', label: '공격력', shortLabel: 'ATT', multiplier: 6, accent: 'red' },
  { key: 'allStat', label: '올스탯', shortLabel: 'ALL', multiplier: 20, accent: 'blue' },
];

const toNumber = (value) => Number(value) || 0;
const formatNumber = (value) => new Intl.NumberFormat('ko-KR').format(value);

function App() {
  const [stats, setStats] = useState(INITIAL_STATS);

  const contributions = useMemo(
    () => fields.map((field) => ({
      ...field,
      value: toNumber(stats[field.key]) * field.multiplier,
    })),
    [stats]
  );

  const total = contributions.reduce((sum, item) => sum + item.value, 0);
  const hasValue = Object.values(stats).some((value) => value !== '');

  const handleChange = (key, value) => {
    if (value === '' || /^\d+$/.test(value)) {
      setStats((current) => ({ ...current, [key]: value }));
    }
  };

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <section className="calculator" aria-labelledby="page-title">
        <header className="hero">
          <div className="brand-mark" aria-hidden="true">X</div>
          <div>
            <p className="eyebrow">STAT CALCULATOR</p>
            <h1 id="page-title">제논 스탯 계산기</h1>
          </div>
        </header>

        <div className="formula-card">
          <span className="formula-label">계산 공식</span>
          <p>
            <span>(힘 + 덱 + 럭)</span>
            <b> + </b>
            <span>(공격력 × 6)</span>
            <b> + </b>
            <span>(올스탯 × 20)</span>
          </p>
        </div>

        <div className="content-grid">
          <section className="input-panel" aria-labelledby="input-title">
            <div className="section-heading">
              <div style={{ paddingRight: '20px' }}>
                <p className="section-kicker">INPUT</p>
                <h2 id="input-title">능력치 입력</h2>
              </div>
              <span>숫자만 입력해 주세요</span>
              <button
                className="reset-button"
                type="button"
                onClick={() => setStats(INITIAL_STATS)}
                disabled={!hasValue}
              >
                <span aria-hidden="true">↻</span> 초기화
              </button>
            </div>

            <div className="field-grid">
              {fields.map((field) => (
                <label className="stat-field" key={field.key}>
                  <span className={`stat-icon ${field.accent}`}>{field.shortLabel}</span>
                  <span className="field-copy">
                    <span className="field-name">{field.label}</span>
                    {field.multiplier > 1 && <span className="multiplier">× {field.multiplier}</span>}
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    value={stats[field.key]}
                    onChange={(event) => handleChange(field.key, event.target.value)}
                    placeholder="0"
                    aria-label={`${field.label} 입력`}
                  />
                </label>
              ))}
            </div>
          </section>

          <aside className="result-panel" aria-live="polite">
            <p className="result-kicker">TOTAL SCORE</p>
            <p className="result-label">최종 계산 결과</p>
            <div className="result-number">{formatNumber(total)}</div>
            <div className="result-rule" />

            <div className="breakdown">
              {contributions.map((item) => (
                <div className="breakdown-row" key={item.key}>
                  <span><i className={`dot ${item.accent}`} />{item.label}</span>
                  <strong>{formatNumber(item.value)}</strong>
                </div>
              ))}
            </div>

            <div className="equation-result">
              <span>{'{(힘+덱+럭)+(공격력*6)+(올스탯*20)}'}</span>
              <span>이 계산식 사용함</span>
              <span className="check" aria-hidden="true">✓</span>
            </div>
            <div className="equation-result">
              <div>저자본용 추옵</div>
              <div>140제 220급</div>
              <div>150제 230급</div>
              <div>160제 240급</div>
              <div>200제 280급</div>
              <div>250제 330급</div>
            </div>
          </aside>
        </div>
      </section>

      <footer>
        <span className="footer-divider" aria-hidden="true">·</span>
        <a href="https://github.com/hwan129/xenon" target="_blank" rel="noreferrer">
          github: hwan129/xenon
        </a>
        <span className="footer-divider" aria-hidden="true">·</span>
        Mail: hoanshim0123@gmail.com
      </footer>
    </main>
  );
}

export default App;
