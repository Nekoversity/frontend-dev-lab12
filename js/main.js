const cards_easy_template = [
    { status: null, original: 'computer', translations: ["ком'ютер"], img: 'img/computer.jpg' },
    { status: null, original: 'car', translations: ['авто', 'автомобіль', 'машина'], img: 'img/car.jpg' },
    { status: null, original: 'cube', translations: ['куб'], img: 'img/cube.jpg' },
    { status: null, original: 'boy', translations: ['хлопець', 'хлопчик', 'хлоп'], img: 'img/boy.jpg' },
    { status: null, original: 'language', translations: ['мова'], img: 'img/language.jpg' },
    { status: null, original: 'translate', translations: ['переклади', 'перекласти'], img: 'img/translate.jpg' },
    { status: null, original: 'net', translations: ['мережа', 'сітка'], img: 'img/net.jpg' },
    { status: null, original: 'spider', translations: ['павук'], img: 'img/spider.jpg' },
    { status: null, original: 'light', translations: ['світло'], img: 'img/light.jpg' },
    { status: null, original: 'bottle', translations: ['пляшка'], img: 'img/bottle.jpg' },
];

const cards_intermediate_template = [
    { status: null, original: 'perfect', translations: ['ідеально', 'ідеальний', 'ідеальна'], img: 'img/perfect.jpg' },
    { status: null, original: 'young', translations: ['молодь', 'молодий', 'молода'], img: 'img/young.jpg' },
    { status: null, original: 'suddenly', translations: ['раптово', 'враз'], img: 'img/suddenly.jpg' },
    { status: null, original: 'married', translations: ['одружений', 'одружена', 'одружені'], img: 'img/married.jpg' },
    { status: null, original: 'gather', translations: ['збирати'], img: 'img/gather.jpg' },
    { status: null, original: 'redhead', translations: ['руда', 'рудий', 'руді'], img: 'img/redhead.jpg' },
    { status: null, original: 'skull', translations: ['череп'], img: 'img/skull.jpg' },
    { status: null, original: 'reduce', translations: ['скорочувати', 'зменшувати'], img: 'img/reduce.jpg' },
    { status: null, original: 'refract', translations: ['заломлювати'], img: 'img/refract.jpg' },
    { status: null, original: 'redolent', translations: ['ароматний'], img: 'img/redolent.jpg' },
];

const cards_advanced_template = [
    { status: null, original: 'wicked', translations: ['злий', 'недобрий'], img: 'img/wicked.jpg' },
    { status: null, original: 'whole', translations: ['ціле', 'цілий', 'ціла'], img: 'img/whole.jpg' },
    { status: null, original: 'avail', translations: ['користь', 'вигода'], img: 'img/avail.jpg' },
    { status: null, original: 'coast', translations: ['узбережжя', 'берег'], img: 'img/coast.jpg' },
    { status: null, original: 'fret', translations: ['роздратування', 'мука'], img: 'img/fret.jpg' },
    { status: null, original: 'fuzzy', translations: ['пухнастий', 'розлітатися', 'розпушений'], img: 'img/fuzzy.jpg' },
    { status: null, original: 'grade', translations: ['ступінь', 'клас'], img: 'img/grade.jpg' },
    { status: null, original: 'hostage', translations: ['заручник', 'застава'], img: 'img/hostage.jpg' },
    { status: null, original: 'inoperative', translations: ['невпливовий', 'неефективний'], img: 'img/inoperative.jpg' },
    { status: null, original: 'lancet', translations: ['ланцет'], img: 'img/lancet.jpg' },
];

let cards = [];

let data = {
    correct: 0,
    incorrect: 0,
    pos: 0,
    difficulty: 'easy',
}

function shuffleCards() {
    if (data.difficulty === 'easy') cards = [...cards_easy_template];
    else if (data.difficulty === 'intermediate') cards = [...cards_intermediate_template];
    else if (data.difficulty === 'advanced') cards = [...cards_advanced_template];

    let currIdx = cards.length, rndIdx;
    while (currIdx !== 0) {
        rndIdx = Math.floor(Math.random() * currIdx);
        currIdx--;
        [cards[currIdx], cards[rndIdx]] = [cards[rndIdx], cards[currIdx]];
    }
}

function nextCard() {
    data.pos++;
    loadContents();
}

function prevCard() {
    data.pos--;
    loadContents();
}

function isAllCardsNotNull() {
    let cnt = 0;
    cards.forEach(e => {
        if (e.status !== null) ++cnt;
    });

    return cnt === 10;
}

function check() {
    let answer = $('#enter input').val().toLowerCase().trim();
    $('#enter input').val(null);
    if (cards[data.pos].translations.includes(answer)) {
        data.correct++;
        cards[data.pos].status = true;
    } else {
        data.incorrect++;
        cards[data.pos].status = false;
    }

    if (isAllCardsNotNull()) {
        $('#again-modal .text').text(`Ви вгадали ${data.correct}/10!\nВаш рівень - ${getGrade(data.correct, data.difficulty)}`);
        $('#again-modal').show();
        return;
    }

    data.pos++;
    loadContents();
}

function getGrade(correct, difficulty) {
    if (difficulty === 'easy') {
        if (correct < 3) return 'A0';
        else if (correct < 8) return 'A1';
        else return 'A2';
    } else if (difficulty === 'intermediate') {
        if (correct < 3) return 'A2';
        else if (correct < 8) return 'B1';
        else return 'B2';
    } else if (difficulty === 'advanced') {
        if (correct < 3) return 'B2';
        else if (correct < 8) return 'C1';
        else return 'C2';
    }

    return '??';
}

function disableEnter() {
    $('#enter button').prop('disabled', true);
    $('#enter input').prop('disabled', true);
}

function enableEnter() {
    $('#enter button').prop('disabled', false);
    $('#enter input').prop('disabled', false);
}

function loadContents(idx = null) {
    $('#stat > .correct').text(`Вірно ${data.correct}/10`);
    $('#stat > .incorrect').text(`Невірно ${data.incorrect}/10`);

    if (idx === null) idx = data.pos;

    $('#guess-block img').attr('src', cards[idx].img);
    $('#guess-block img').attr('alt', cards[idx].original);
    $('#guess-block .word').text(cards[idx].original);

    if (cards[idx].status === true) {
        $('#guess-block').addClass('correct');
        disableEnter();
    } else if (cards[idx].status === false) {
        $('#guess-block').addClass('incorrect');
        disableEnter();
    } else {
        enableEnter();
        $('#guess-block').removeClass('correct');
        $('#guess-block').removeClass('incorrect');
    }

    $('#card-nav .left').off('click');
    $('#card-nav .right').off('click');
    if (idx === 0) {
        $('#card-nav .left').addClass('blocked');
        $('#card-nav .left').off('click');
        $('#card-nav .right').click(nextCard);
    } else if (idx === 9) {
        $('#card-nav .right').addClass('blocked');
        $('#card-nav .right').off('click');
        $('#card-nav .left').click(prevCard);
    } else {
        $('#card-nav .left').removeClass('blocked');
        $('#card-nav .right').removeClass('blocked');
        $('#card-nav .left').off('click');
        $('#card-nav .right').off('click');
        $('#card-nav .right').click(nextCard);
        $('#card-nav .left').click(prevCard);
    }

    $('#card-nav .card-pos').text(`${idx+1}/10`);
}

$('#again-modal').hide();
$('#again-modal button').click(() => window.location.reload());
$('#difficulty-modal button').click(() => {
    $('#difficulty-modal').hide();
    data.difficulty = $('#difficulty-modal select').val();
    shuffleCards();
    $('#submit').click(check);
    $(document).on('keypress', (ev) => {
        if (ev.defaultPrevented) return;
        if (ev.key === 'Enter') check();
    });
    loadContents();
});

