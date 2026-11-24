(() => {
  "use strict";

  const QUESTIONS = window.QUESTIONS;
  const CATS = window.CATEGORIES;
  const TOTAL = QUESTIONS.length;

  const CHOICES = [
    { v: 5, label: "強くそう思う" },
    { v: 4, label: "ややそう思う" },
    { v: 3, label: "どちらともいえない" },
    { v: 2, label: "あまりそう思わない" },
    { v: 1, label: "全くそう思わない" },
  ];

  // ランク（全6段階）
  const RANKS = [
    { min: 70, stars: 6, title: "恋愛マスター・無双級", desc: "会話・気遣い・行動力のすべてが高水準。狙った相手の心を自然と掴んでしまう、まさに恋愛の天才肌です。" },
    { min: 60, stars: 5, title: "モテ期常連のハイスペ恋愛力", desc: "相手を惹きつける力と安心感を両立した、周りが放っておかないタイプ。あなたとの恋は「楽しい」と思われがち。" },
    { min: 50, stars: 4, title: "平均以上の安定バランス型", desc: "大きな弱点がなく、長く付き合うほど良さが伝わる安定感の持ち主。ひとつ武器を磨けば一気に化けます。" },
    { min: 45, stars: 3, title: "伸びしろたっぷりの原石タイプ", desc: "素直さと優しさは十分。あと少しの自信と一歩を踏み出す勇気で、恋愛偏差値はグンと伸びるポテンシャル大。" },
    { min: 40, stars: 2, title: "慎重派のスロースターター", desc: "恋に対して慎重で、相手をじっくり見極めるタイプ。焦らず自分のペースを大切にすれば、深い関係を築けます。" },
    { min: 0, stars: 1, title: "恋愛リハビリ中の充電期間", desc: "今は自分を整えるタイミング。小さな成功体験を積み重ねれば、ここからの伸び率はどのタイプよりも大きいはず。" },
  ];

  // 軸ごとのテキスト
  const AXIS_TEXT = {
    c: {
      strength: "あなたの最大の武器は<b>会話力</b>。相手が話しやすい空気をつくり、LINEでも対面でも「この人と話すと楽しい」と思わせる力があります。初デートでも会話が途切れにくく、関係を一気に深められるタイプです。",
      type: "トークで惹きつける「ムードメーカー型」",
      advice: "LINEは「感想＋質問」のセットで返すのを意識してみて。例：「そのカフェ良さそう！どんなメニューが好き？」と一言添えるだけで、会話のラリーが自然と続きます。",
    },
    e: {
      strength: "あなたの最大の武器は<b>共感・気遣い力</b>。相手の小さな変化に気づき、言葉にされない気持ちまで汲み取れるやさしさがあります。「この人といると安心する」と思われる、癒し系の魅力の持ち主です。",
      type: "寄り添って安心させる「包容力型」",
      advice: "相手が落ち込んでいる時は、解決策より先に「それはしんどかったね」と気持ちを言葉で受け止めて。デートの店選びでは「和食と韓国料理ならどっちの気分？」と2択で聞くと、気遣いがスマートに伝わります。",
    },
    m: {
      strength: "あなたの最大の武器は<b>メンタルの安定感</b>。既読スルーや小さなすれ違いに振り回されず、自分軸で恋愛を楽しめる余裕があります。その落ち着きが「大人の魅力」として相手を惹きつけます。",
      type: "余裕で魅せる「自分軸の大人型」",
      advice: "不安になったら、相手に送る前に気持ちをメモに書き出す「10分ルール」を試してみて。また恋愛以外に夢中になれる時間を週1つ増やすと、自然と余裕のある雰囲気が出てきます。",
    },
    a: {
      strength: "あなたの最大の武器は<b>行動力</b>。チャンスを逃さず自分から距離を縮められる積極性があり、恋のスタートダッシュが得意です。具体的なデートの提案ができるので、相手も安心して身を任せられます。",
      type: "自分から動いて掴む「ハンター型」",
      advice: "誘うときは「今度ご飯でも」ではなく「来週の金曜、駅前の〇〇行かない？」と日時と場所をセットで提案してみて。デート後はその日のうちに「今日ありがとう、楽しかった！」と送るだけで次につながる確率が上がります。",
    },
    v: {
      strength: "あなたの最大の武器は<b>誠実さ</b>。約束を守り、一人の相手とまっすぐ向き合える信頼感があります。短期的な駆け引きより、長く深い関係を築くことで本領を発揮する「本命に選ばれる」タイプです。",
      type: "信頼で選ばれる「一途な本命型」",
      advice: "「ありがとう」「ごめんね」を、照れずに言葉で伝える習慣を。付き合いが長くなるほど感謝を言葉にする人は貴重なので、それだけで信頼度がグッと上がります。",
    },
  };

  const RANK_TIP = [
    "今の魅力を保つコツは「慣れ」に注意すること。初心を忘れず、相手への小さな感謝や新しい体験の共有を続けて。",
    "あと一歩で最上位。得意分野を武器にしつつ、一番低い軸を意識的に伸ばせば無双級も夢じゃありません。",
    "ひとつの軸をとがらせるのが近道。まずは一番得意な軸を「誰にも負けない武器」に育ててみて。",
    "完璧を目指さなくてOK。今週ひとつだけ「いつもと違う行動」をしてみるだけで、恋愛の流れは変わり始めます。",
    "まずは異性との会話を「練習」と割り切って楽しむところから。小さな成功体験が自信の土台になります。",
    "恋愛の前に、自分を大切にする時間を。好きなことに没頭している人は、それだけで魅力的に映ります。",
  ];

  // ===== 状態 =====
  const state = { index: 0, answers: new Array(TOTAL).fill(null), locked: false };

  // ===== DOM =====
  const $ = (id) => document.getElementById(id);
  const screens = { start: $("screen-start"), quiz: $("screen-quiz"), result: $("screen-result") };

  function show(name) {
    Object.values(screens).forEach((s) => s.classList.remove("active"));
    screens[name].classList.add("active");
    window.scrollTo(0, 0);
  }

  // ===== 質問画面 =====
  function buildAnswers() {
    const wrap = $("answers");
    wrap.innerHTML = "";
    CHOICES.forEach((c) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "ans";
      b.dataset.v = c.v;
      b.setAttribute("role", "radio");
      b.innerHTML = `<span class="dot"></span><span>${c.label}</span>`;
      b.addEventListener("click", () => answer(c.v, b));
      wrap.appendChild(b);
    });
  }

  function renderQuestion() {
    const q = QUESTIONS[state.index];
    const cat = CATS.find((c) => c.key === q.cat);
    $("q-num").textContent = state.index + 1;
    $("q-label-num").textContent = state.index + 1;
    $("q-text").textContent = q.text;
    $("q-cat").textContent = cat.name;
    $("progress-bar").style.width = `${(state.index / TOTAL) * 100}%`;
    $("btn-back").disabled = state.index === 0;
    document.querySelectorAll(".ans").forEach((b) => {
      const sel = Number(b.dataset.v) === state.answers[state.index];
      b.classList.toggle("selected", sel);
      b.setAttribute("aria-checked", sel);
    });
  }

  function transition(dir, update) {
    const w = $("q-wrap");
    state.locked = true;
    w.classList.add(dir === "next" ? "out-left" : "out-right");
    setTimeout(() => {
      update();
      w.classList.remove("out-left", "out-right");
      w.classList.add(dir === "next" ? "in-right" : "in-left");
      void w.offsetWidth; // reflow
      w.classList.remove("in-right", "in-left");
      state.locked = false;
    }, 260);
  }

  function answer(v, btn) {
    if (state.locked) return;
    state.answers[state.index] = v;
    document.querySelectorAll(".ans").forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");
    state.locked = true;

    setTimeout(() => {
      if (state.index >= TOTAL - 1) {
        $("progress-bar").style.width = "100%";
        setTimeout(showResult, 300);
        return;
      }
      transition("next", () => { state.index++; renderQuestion(); });
    }, 220);
  }

  function back() {
    if (state.locked || state.index === 0) return;
    transition("prev", () => { state.index--; renderQuestion(); });
  }

  // ===== 採点 =====
  function score(answers) {
    const axis = Object.fromEntries(CATS.map((c) => [c.key, 0]));
    let total = 0;
    answers.forEach((v, i) => {
      const q = QUESTIONS[i];
      const pt = q.r ? 6 - v : v;
      axis[q.cat] += pt;
      total += pt;
    });
    // 偏差値：平均180・標準偏差35、35.0〜78.0にクリップ
    let dev = 50 + (10 * (total - 180)) / 35;
    dev = Math.min(78, Math.max(35, dev));
    dev = Math.round(dev * 10) / 10;
    // 各軸 12〜60点 → 0〜100
    const axisPct = Object.fromEntries(
      Object.entries(axis).map(([k, s]) => [k, Math.round(((s - 12) / 48) * 100)])
    );
    return { total, dev, axis, axisPct };
  }

  // 標準正規分布の累積（上位%表示用）
  function normCdf(z) {
    const t = 1 / (1 + 0.2316419 * Math.abs(z));
    const d = 0.3989423 * Math.exp((-z * z) / 2);
    const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return z > 0 ? 1 - p : p;
  }

  // ===== 結果画面 =====
  function showResult() {
    const r = score(state.answers);
    const rankIdx = RANKS.findIndex((x) => r.dev >= x.min);
    const rank = RANKS[rankIdx];
    const sorted = [...CATS].sort((a, b) => r.axisPct[b.key] - r.axisPct[a.key]);
    const top = sorted[0], second = sorted[1];
    const low = sorted[4], low2 = sorted[3];
    const topPct = Math.max(0.1, (1 - normCdf((r.dev - 50) / 10)) * 100);
    const topPctStr = topPct < 1 ? topPct.toFixed(1) : Math.round(topPct);

    show("result");

    // ランク・解説
    const pill = $("rank-pill");
    pill.classList.remove("show");
    $("rank-stars").textContent = "★".repeat(rank.stars) + "☆".repeat(6 - rank.stars);
    $("rank-title").textContent = rank.title;
    $("rank-desc").textContent = rank.desc;
    $("percentile").textContent = `全国の診断者のうち 上位 約${topPctStr}%`;

    $("strength").innerHTML = AXIS_TEXT[top.key].strength;
    const gap = r.axisPct[top.key] - r.axisPct[low.key];
    $("tendency").innerHTML =
      `あなたは<b>${AXIS_TEXT[top.key].type}</b>。「${top.short}」と「${second.short}」を軸に恋を進めていくスタイルです。` +
      (gap >= 25
        ? `一方で「${low.short}」とは${gap}ポイントの差があり、得意・不得意がはっきりした個性派。苦手な場面では本来の魅力が伝わりにくいことも。`
        : `5つの軸の差が小さく、どんな相手・シーンにも合わせられる柔軟さがあります。`);

    $("advice").innerHTML = [
      { tag: `${low.name}を伸ばす`, text: AXIS_TEXT[low.key].advice },
      { tag: `${low2.name}を伸ばす`, text: AXIS_TEXT[low2.key].advice },
      { tag: "あなたのランクへのひとこと", text: RANK_TIP[rankIdx] },
    ].map((a) => `<div class="advice-item"><span class="tag">${a.tag}</span><div>${a.text}</div></div>`).join("");

    // 軸バー
    $("axis-list").innerHTML = CATS.map((c) =>
      `<li class="${c.key === top.key ? "top" : ""}"><span class="axis-name">${c.key === top.key ? "♛ " : ""}${c.short}</span><span class="axis-bar"><i data-w="${r.axisPct[c.key]}"></i></span><span class="axis-val">${r.axisPct[c.key]}</span></li>`
    ).join("");

    drawRadar(r.axisPct, top.key);

    // カウントアップ
    countUp($("score"), r.dev, 1500, () => {
      $("score").classList.add("pop");
      pill.classList.add("show");
    });
    requestAnimationFrame(() => {
      $("radar").classList.add("show");
      document.querySelectorAll(".axis-bar i").forEach((i) => (i.style.width = i.dataset.w + "%"));
    });

    // シェア
    const lines = [
      `私の恋愛偏差値は【${r.dev.toFixed(1)}】でした💘`,
      `称号：「${rank.title}」`,
      `一番の武器は「${top.short}」✨（上位 約${topPctStr}%）`,
      "",
      "あなたの恋愛偏差値は…？",
      "#恋愛偏差値診断 #60問で暴くリアルな恋愛力",
    ];
    const params = new URLSearchParams({ text: lines.join("\n") });
    const isPublic = /^https?:$/.test(location.protocol) && !/^(localhost|127\.|192\.168\.|\[::1\])/.test(location.hostname);
    if (isPublic) params.set("url", location.origin + location.pathname);
    $("btn-share").href = `https://twitter.com/intent/tweet?${params.toString()}`;
  }

  function countUp(el, target, dur, done) {
    el.classList.remove("pop");
    const start = performance.now();
    const from = 30;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - p, 4); // easeOutQuart
      el.textContent = (from + (target - from) * e).toFixed(1);
      if (p < 1) requestAnimationFrame(tick);
      else { el.textContent = target.toFixed(1); done && done(); }
    };
    requestAnimationFrame(tick);
  }

  // ===== レーダーチャート（SVG） =====
  function drawRadar(pct, topKey) {
    const svg = $("radar");
    const cx = 160, cy = 150, R = 100;
    const n = CATS.length;
    const pt = (i, ratio) => {
      const ang = -Math.PI / 2 + (i * 2 * Math.PI) / n;
      return [cx + Math.cos(ang) * R * ratio, cy + Math.sin(ang) * R * ratio];
    };
    const poly = (ratio) => CATS.map((_, i) => pt(i, ratio).join(",")).join(" ");

    let html = `<defs>
      <linearGradient id="rg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#f472b6" stop-opacity=".55"/>
        <stop offset="1" stop-color="#8b5cf6" stop-opacity=".55"/>
      </linearGradient>
      <linearGradient id="rs" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#ec4899"/><stop offset="1" stop-color="#7c3aed"/>
      </linearGradient>
    </defs>`;
    [0.2, 0.4, 0.6, 0.8, 1].forEach((r) => {
      html += `<polygon points="${poly(r)}" fill="${r === 1 ? "rgba(255,255,255,.55)" : "none"}" stroke="rgba(139,92,246,${r === 1 ? 0.28 : 0.13})" stroke-width="1"/>`;
    });
    CATS.forEach((_, i) => {
      const [x, y] = pt(i, 1);
      html += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="rgba(139,92,246,.13)"/>`;
    });
    const dataPts = CATS.map((c, i) => pt(i, Math.max(0.04, pct[c.key] / 100)));
    html += `<g class="poly"><polygon points="${dataPts.map((p) => p.join(",")).join(" ")}" fill="url(#rg)" stroke="url(#rs)" stroke-width="2.5" stroke-linejoin="round"/>`;
    dataPts.forEach(([x, y]) => {
      html += `<circle cx="${x}" cy="${y}" r="4" fill="#fff" stroke="#c026d3" stroke-width="2"/>`;
    });
    html += `</g>`;
    CATS.forEach((c, i) => {
      const [x, y] = pt(i, 1.3);
      const anchor = Math.abs(x - cx) < 4 ? "middle" : x > cx ? "start" : "end";
      const dx = anchor === "start" ? -8 : anchor === "end" ? 8 : 0;
      const isTop = c.key === topKey;
      html += `<text x="${x + dx}" y="${y - 2}" text-anchor="${anchor}" font-size="12" font-weight="700" fill="${isTop ? "#db2777" : "#5b4870"}">${c.short}</text>`;
      html += `<text x="${x + dx}" y="${y + 14}" text-anchor="${anchor}" font-size="13" font-weight="900" fill="${isTop ? "#db2777" : "#8b5cf6"}">${pct[c.key]}</text>`;
    });
    svg.classList.remove("show");
    svg.innerHTML = html;
    void svg.getBoundingClientRect(); // アニメーション用に初期状態を確定
  }

  // ===== イベント =====
  function start() {
    state.index = 0;
    state.answers.fill(null);
    state.locked = false;
    show("quiz");
    renderQuestion();
  }

  $("btn-start").addEventListener("click", start);
  $("btn-back").addEventListener("click", back);
  $("btn-retry").addEventListener("click", () => show("start"));
  $("btn-skip").addEventListener("click", () => {
    state.answers = state.answers.map(() => 1 + Math.floor(Math.random() * 5));
    showResult();
  });

  // キーボード操作（PC確認用：1〜5キー / ←キー）
  document.addEventListener("keydown", (e) => {
    if (!screens.quiz.classList.contains("active")) return;
    if (e.key >= "1" && e.key <= "5") {
      const v = 6 - Number(e.key);
      const b = document.querySelector(`.ans[data-v="${v}"]`);
      b && answer(v, b);
    } else if (e.key === "ArrowLeft" || e.key === "Backspace") back();
  });

  buildAnswers();
})();
