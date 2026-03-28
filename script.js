// ── Dynamic star field ─────────────────────────────────────────────────────────

function generateBoxShadow(count) {
	const w = window.innerWidth;
	const h = 2000;
	const shadows = [];
	for (let i = 0; i < count; i++) {
		const x = Math.floor(Math.random() * w);
		const y = Math.floor(Math.random() * h);
		shadows.push(`${x}px ${y}px #fff`);
	}
	return shadows.join(", ");
}

function applyStars() {
	const shadow = generateBoxShadow(700);
	const stars = document.getElementById("stars");
	const stars2 = document.getElementById("stars2");
	if (stars)  stars.style.boxShadow  = shadow;
	if (stars2) stars2.style.boxShadow = shadow;
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", applyStars);
} else {
	applyStars();
}

let resizeTimer;
window.addEventListener("resize", () => {
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(applyStars, 250);
});

// ── Intersection Observer for progress bar animations ──────────────────────────

const inViewport = (entries, observer) => {
	entries.forEach((entry) => {
		entry.target.classList.toggle("is-inViewport", entry.isIntersecting);
	});
};

const Obs = new IntersectionObserver(inViewport);

document.querySelectorAll("[data-inviewport]").forEach((el) => {
	Obs.observe(el);
});
