const questions = [
	{ title: "Een zeldzaam scenario.", text: "Je hebt morgen helemaal niets te doen. Geen werk, geen studie, geen verplichtingen. Waar vinden we je?", options: ["In de tuin", "Aan tafel", "In de zetel", "Ik vind wel iets om te doen"] },
	{ title: "We moeten uw prioriteiten vastleggen.", text: "U mag er slechts één behouden. Welke?", options: ["Studeren", "Werken", "Tuinieren", "Lekker eten", "Zetelhangen"], note: "Kies zorgvuldig. Uw antwoord wordt aan het dossier toegevoegd." },
	{ title: "Wetenschappelijk onderzoek.", text: "Hoe lang kun jij in de zetel liggen zonder te denken: ‘Ik zou eigenlijk iets moeten doen…’", options: ["10 minuten", "Een uur", "Een hele avond", "Dit werd nog nooit vastgesteld"] },
	{ title: "Na een lange werkdag hebt u recht op één vergoeding.", text: "Welke kiest u?", options: ["Goed eten", "Een pintje", "De zetel", "Vrienden", "Rust", "Blijkbaar nog wat werk"] },
	{ title: "Verklaring onder ede.", text: "De ploeg komt naar je toe en zegt: ‘Vertrouw ons.’ Uw reactie?", options: ["Ik stel geen verdere vragen", "Ik eis meer informatie", "Bezwaar!", "Ik beroep mij op mijn zwijgrecht"] },
	{ title: "Een volledig hypothetische situatie.", text: "De ploeg zegt: ‘Trek dit aan en stel geen vragen.’ Wat doet u?", options: ["Prima", "Eerst zien wat ‘dit’ is", "Ik weiger beleefd", "Ik wens juridische bijstand"], note: "Uw antwoord heeft vanzelfsprekend nergens betrekking op." },
	{ title: "Rechten van de verdachte.", text: "Tijdens uw vrijgezellenfeest mag u één recht behouden. Welke kiest u?", options: ["Recht op eten", "Vetorecht", "Recht op één eerlijk antwoord", "Recht op de zetel", "Recht op juridische bijstand"], note: "Alle overige rechten kunnen zonder voorafgaande kennisgeving worden ingetrokken." },
	{ title: "Slotpleidooi.", text: "Joachim wordt ervan beschuldigd dringend eens te moeten stoppen met werken en studeren. Hoe pleit u?", options: ["Schuldig", "Onschuldig", "Geen commentaar", "Ik ga in beroep"] }
];

const landingScreen = document.querySelector("#landing-screen");
const dossierApp = document.querySelector("#dossier-app");
const dossierIntro = document.querySelector("#dossier-intro");
const dossierQuiz = document.querySelector("#dossier-quiz");
const dossierComplete = document.querySelector("#dossier-complete");
const questionForm = document.querySelector("#question-form");
const questionTitle = document.querySelector("#question-title");
const questionCount = document.querySelector("#question-count");
const progressPercent = document.querySelector("#progress-percent");
const progressBar = document.querySelector("#progress-bar");
const evidenceCount = document.querySelector("#evidence-count");
const questionText = document.querySelector("#question-text");
const questionNote = document.querySelector(".question-note");
const nextButton = document.querySelector(".next-button");
const submitError = document.querySelector("#submit-error");
const submissionEndpoint = "https://formsubmit.co/ajax/sterre330@gmail.com";
const crewApp = document.querySelector("#crew-app");
const crewGate = document.querySelector("#crew-gate");
const crewDashboard = document.querySelector("#crew-dashboard");
const accessError = document.querySelector("#access-error");
const crewMembers = document.querySelector("#crew-members");
const crewSummary = document.querySelector("#crew-summary");
const crewCount = document.querySelector("#crew-count");
const memeForm = document.querySelector("#meme-form");
const memeFile = document.querySelector("#meme-file");
const memeCaption = document.querySelector("#meme-caption");
const memeGallery = document.querySelector("#meme-gallery");
const memeError = document.querySelector("#meme-error");
let currentQuestion = 0;
const answers = [];
const storedMemes = JSON.parse(localStorage.getItem("joachim-memes") || "[]");
const ideaForm = document.querySelector("#idea-form");
const ideaItems = document.querySelector("#idea-items");
const ideaMessage = document.querySelector("#idea-message");
const storedIdeas = JSON.parse(localStorage.getItem("joachim-ideas") || "[]");
const organizerAccess = document.querySelector("#organizer-access");
const organizerForm = document.querySelector("#organizer-form");
const organizerContent = document.querySelector("#organizer-content");
const organizerError = document.querySelector("#organizer-error");
const organizerApp = document.querySelector("#organizer-app");
const settingsForm = document.querySelector("#settings-form");
const settingsMessage = document.querySelector("#settings-message");
const operationSettings = {
	status: "Voorbereiding loopt",
	date: "Nog te bepalen",
	destination: "Gent",
	preparation: "Leer het lied ‘Mag ik dan bij jou’ van Claudia de Breij om het uit volle borst mee te kunnen zingen",
	plans: ["Karaoke", "Bowlen", "(Zelfgemaakte) FC De Kampioenenquiz"]
};

function getOperationSettings() {
	return { ...operationSettings, ...JSON.parse(localStorage.getItem("joachim-operation-settings") || "{}") };
}

function renderOperationSettings() {
	const settings = getOperationSettings();
	const operationStatus = document.querySelector("#operation-status");
	const operationDate = document.querySelector("#operation-date");
	const operationDestination = document.querySelector("#operation-destination");
	const operationPreparation = document.querySelector("#operation-preparation");
	const plansList = document.querySelector("#plans-list");

	if (operationStatus) operationStatus.textContent = settings.status;
	if (operationDate) operationDate.textContent = settings.date;
	if (operationDestination) operationDestination.textContent = settings.destination;
	if (operationPreparation) operationPreparation.firstChild.textContent = `${settings.preparation} `;
	if (plansList) {
		plansList.innerHTML = "";
		settings.plans.forEach((plan) => {
			const item = document.createElement("li");
			item.textContent = plan;
			plansList.append(item);
		});
	}

	const organizerStatus = document.querySelector("#organizer-status");
	const organizerDate = document.querySelector("#organizer-date");
	const organizerDestination = document.querySelector("#organizer-destination");
	const organizerPlans = document.querySelector("#organizer-plans");
	const organizerPreparation = document.querySelector("#organizer-preparation");
	if (organizerStatus) organizerStatus.textContent = settings.status;
	if (organizerDate) organizerDate.textContent = settings.date;
	if (organizerDestination) organizerDestination.textContent = settings.destination;
	if (organizerPlans) organizerPlans.textContent = settings.plans.join(" · ");
	if (organizerPreparation) organizerPreparation.textContent = settings.preparation;
	if (settingsForm) {
		settingsForm.status.value = settings.status;
		settingsForm.date.value = settings.date;
		settingsForm.destination.value = settings.destination;
		settingsForm.preparation.value = settings.preparation;
		settingsForm.plans.value = settings.plans.join("\n");
	}
}

renderOperationSettings();

function renderQuestion() {
	const question = questions[currentQuestion];
	const questionNumber = String(currentQuestion + 1).padStart(2, "0");
	const progress = Math.round(((currentQuestion + 1) / questions.length) * 100);

	questionCount.textContent = `Vraag ${questionNumber}`;
	progressPercent.textContent = `${progress}%`;
	progressBar.style.width = `${progress}%`;
	evidenceCount.textContent = `${questionNumber}/${String(questions.length).padStart(2, "0")}`;
	questionTitle.textContent = question.title;
	questionText.textContent = question.text;
	questionNote.textContent = question.note || "Je antwoord wordt toegevoegd aan het dossier.";
	questionForm.innerHTML = "";

	if (question.freeText) {
		const textarea = document.createElement("textarea");
		textarea.className = "answer-text";
		textarea.name = "answer";
		textarea.placeholder = "Typ je antwoord hier...";
		textarea.required = true;
		questionForm.append(textarea);
	} else {
		question.options.forEach((option, index) => {
			const wrapper = document.createElement("div");
			const inputId = `answer-${currentQuestion}-${index}`;
			wrapper.className = "answer-option";
			wrapper.innerHTML = `<input id="${inputId}" type="radio" name="answer" value="${option}" required><label for="${inputId}">${option}</label>`;
			questionForm.append(wrapper);
		});
	}

	nextButton.querySelector(".next-label").textContent = currentQuestion === questions.length - 1 ? "Verzenden" : "Volgende";
}

document.querySelector("#joachim-button").addEventListener("click", () => {
	landingScreen.hidden = true;
	dossierApp.hidden = false;
});

document.querySelector("#crew-button").addEventListener("click", () => {
	landingScreen.hidden = true;
	crewApp.hidden = false;
});

document.querySelector("#crew-back").addEventListener("click", () => {
	crewApp.hidden = true;
	landingScreen.hidden = false;
	crewGate.hidden = false;
	crewDashboard.hidden = true;
	accessError.hidden = true;
});

document.querySelector("#crew-login-form").addEventListener("submit", (event) => {
	event.preventDefault();
	const password = document.querySelector("#crew-password").value.trim().toLowerCase();

	if (password !== "operatie") {
		accessError.hidden = false;
		return;
	}

	crewGate.hidden = true;
	crewDashboard.hidden = false;
	drawCrewMembers();
});

function drawCrewMembers() {
	const members = JSON.parse(localStorage.getItem("joachim-crew") || "[]");
	const counts = { erbij: 0, twijfel: 0, afwezig: 0 };
	crewMembers.innerHTML = "";

	members.forEach((member) => {
		counts[member.status] += 1;
		const statusLabel = { erbij: "erbij", twijfel: "weet het nog niet", afwezig: "afwezig" }[member.status];
		const symbol = { erbij: "✓", twijfel: "?", afwezig: "✕" }[member.status];
		const item = document.createElement("li");
		item.className = `member-${member.status}`;
		item.textContent = `${symbol} ${member.name} — ${statusLabel}`;
		crewMembers.append(item);
	});

	crewSummary.textContent = `${counts.erbij} bevestigd · ${counts.twijfel} twijfelaars · ${counts.afwezig} afwezig`;
	crewCount.textContent = members.length ? `${counts.erbij} bevestigd` : "Nog niemand bevestigd";
}

function drawMemes() {
	memeGallery.innerHTML = "";
	storedMemes.forEach((meme) => {
		const card = document.createElement("article");
		card.className = "meme-card";
		const image = document.createElement("img");
		const caption = document.createElement("p");
		image.src = meme.image;
		image.alt = meme.caption;
		caption.textContent = meme.caption;
		card.append(image, caption);
		memeGallery.append(card);
	});
}

function drawIdeas() {
	ideaItems.innerHTML = "";
	storedIdeas.forEach((item) => {
		const entry = document.createElement("li");
		const author = document.createElement("strong");
		const idea = document.createElement("span");
		author.textContent = item.name;
		idea.textContent = item.idea;
		entry.append(author, idea);
		ideaItems.append(entry);
	});
}

drawIdeas();

ideaForm.addEventListener("submit", (event) => {
	event.preventDefault();
	const form = new FormData(event.currentTarget);
	storedIdeas.unshift({ name: form.get("name"), idea: form.get("idea") });
	localStorage.setItem("joachim-ideas", JSON.stringify(storedIdeas));
	event.currentTarget.reset();
	ideaMessage.textContent = "Idee geregistreerd. De ploeg zal zich hierover beraden.";
	ideaMessage.hidden = false;
	drawIdeas();
});

organizerAccess.addEventListener("click", () => {
	organizerForm.hidden = !organizerForm.hidden;
	organizerError.hidden = true;
});

organizerForm.addEventListener("submit", (event) => {
	event.preventDefault();
	const password = document.querySelector("#organizer-password").value.trim().toLowerCase();
	if (password !== "organisatie") {
		organizerError.hidden = false;
		return;
	}
	window.open(`${window.location.href.split("#")[0]}#organizer`, "_blank");
});

document.querySelector("#organizer-back").addEventListener("click", () => {
	organizerApp.hidden = true;
	crewApp.hidden = false;
});

settingsForm.addEventListener("submit", (event) => {
	event.preventDefault();
	const form = new FormData(settingsForm);
	const settings = {
		status: form.get("status").trim(),
		date: form.get("date").trim(),
		destination: form.get("destination").trim(),
		preparation: form.get("preparation").trim(),
		plans: form.get("plans").split("\n").map((plan) => plan.trim()).filter(Boolean)
	};
	localStorage.setItem("joachim-operation-settings", JSON.stringify(settings));
	renderOperationSettings();
	settingsMessage.textContent = "Wijzigingen opgeslagen en doorgegeven aan de ploeg.";
	settingsMessage.hidden = false;
});

window.addEventListener("storage", (event) => {
	if (event.key === "joachim-operation-settings") renderOperationSettings();
});

if (window.location.hash === "#organizer") {
	landingScreen.hidden = true;
	crewApp.hidden = true;
	dossierApp.hidden = true;
	organizerApp.hidden = false;
}

drawMemes();

memeForm.addEventListener("submit", (event) => {
	event.preventDefault();
	const file = memeFile.files[0];
	const caption = memeCaption.value.trim() || "Joachim had één taak...";
	memeError.hidden = true;

	if (!file) {
		memeError.textContent = "Kies eerst een afbeelding.";
		memeError.hidden = false;
		return;
	}
	if (file.size > 5 * 1024 * 1024) {
		memeError.textContent = "Deze afbeelding is groter dan 5 MB.";
		memeError.hidden = false;
		return;
	}

	const reader = new FileReader();
	reader.addEventListener("load", () => {
		storedMemes.unshift({ image: reader.result, caption });
		localStorage.setItem("joachim-memes", JSON.stringify(storedMemes));
		memeForm.reset();
		drawMemes();
	});
	reader.readAsDataURL(file);
});

document.querySelector("#crew-register-form").addEventListener("submit", (event) => {
	event.preventDefault();
	const form = new FormData(event.currentTarget);
	const members = JSON.parse(localStorage.getItem("joachim-crew") || "[]");
	members.push({ name: form.get("name"), status: form.get("attendance") });
	localStorage.setItem("joachim-crew", JSON.stringify(members));
	document.querySelector("#registration-message").textContent = `Welkom bij de ploeg, ${form.get("name")}. Je antwoord is geregistreerd. Vanaf nu ben je officieel medeplichtig.`;
	document.querySelector("#registration-message").hidden = false;
	event.currentTarget.reset();
	drawCrewMembers();
});

document.querySelector("#open-dossier").addEventListener("click", () => {
	dossierIntro.hidden = true;
	dossierQuiz.hidden = false;
	renderQuestion();
});

async function sendAnswers() {
	const formData = new FormData();
	formData.append("_subject", "Dossier Joachim - antwoorden");
	formData.append("_captcha", "false");
	answers.forEach((answer, index) => formData.append(`Vraag ${String(index + 1).padStart(2, "0")}`, answer));

	const response = await fetch(submissionEndpoint, {
		method: "POST",
		body: formData,
		headers: { Accept: "application/json" }
	});

	if (!response.ok) throw new Error("Verzenden mislukt");
}

questionForm.addEventListener("submit", async (event) => {
	event.preventDefault();
	if (!questionForm.reportValidity()) return;
	answers[currentQuestion] = new FormData(questionForm).get("answer");

	if (currentQuestion === questions.length - 1) {
		nextButton.disabled = true;
		nextButton.querySelector(".next-label").textContent = "Verzenden...";
		submitError.hidden = true;
		try {
			await sendAnswers();
			dossierQuiz.hidden = true;
			dossierComplete.hidden = false;
		} catch (error) {
			nextButton.disabled = false;
			nextButton.querySelector(".next-label").textContent = "Opnieuw proberen";
			submitError.hidden = false;
		}
		return;
	}

	currentQuestion += 1;
	renderQuestion();
});
