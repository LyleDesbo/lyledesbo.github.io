// ── Intersection Observer for progress bar animations ──────────────────────────
const inViewport = (entries, observer) => {
	entries.forEach((entry) => {
		entry.target.classList.toggle("is-inViewport", entry.isIntersecting);
	});
};

const Obs = new IntersectionObserver(inViewport);
const obsOptions = {}; //See: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options

// Attach observer to every [data-inviewport] element:
document.querySelectorAll("[data-inviewport]").forEach((el) => {
	Obs.observe(el, obsOptions);
});

// ── Dynamic star field ─────────────────────────────────────────────────────────
// Replaces the hardcoded box-shadow star list in the HTML, which was capped at
// ~1980px wide and caused a visible blank strip on screens wider than 1080p.
// Stars are regenerated on resize so they always fill the full viewport.

function generateStars(count) {
	const w = window.innerWidth;
	const h = 2000; // match the animation height used in CSS
	const shadows = [];
	for (let i = 0; i < count; i++) {
		const x = Math.floor(Math.random() * w);
		const y = Math.floor(Math.random() * h);
		shadows.push(`${x}px ${y}px #fff`);
	}
	return shadows.join(", ");
}

function applyStars() {
	const starsEl = document.getElementById("stars");
	const stars2El = document.getElementById("stars2");
	const stars3El = document.getElementById("stars3");

	if (starsEl) {
		const shadow = generateStars(700);
		starsEl.style.boxShadow = shadow;
		// The ::after pseudo-element that continues the seamless scroll loop
		// can't be set via JS, so we inject a <style> tag to override it.
		let styleTag = document.getElementById("stars-dynamic-style");
		if (!styleTag) {
			styleTag = document.createElement("style");
			styleTag.id = "stars-dynamic-style";
			document.head.appendChild(styleTag);
		}
		styleTag.textContent = `
			#stars::after { box-shadow: ${shadow}; }
			${stars2El ? `#stars2 { box-shadow: ${generateStars(200)}; } #stars2::after { box-shadow: ${generateStars(200)}; }` : ""}
			${stars3El ? `#stars3 { box-shadow: ${generateStars(100)}; } #stars3::after { box-shadow: ${generateStars(100)}; }` : ""}
		`;
	}
}

// Run on load and re-run on resize (debounced)
applyStars();

let resizeTimer;
window.addEventListener("resize", () => {
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(applyStars, 250);
});
