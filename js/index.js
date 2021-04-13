const prepare = () => {
    const copy = document.getElementById('copy-btn');
    const next = document.getElementById('next-btn');
    const prev = document.getElementById('prev-btn');
    const tooltip = document.getElementById('tooltip');

    const history = ['#FF8787'];
    let current = 0;

    const generateNextColor = () => {
        return `#` + String(Math.floor(Math.random() * 16777215).toString(16)).toUpperCase();
    }

    const renderColor = (color) => {
        const color_view = document.getElementById('color-view');
        const color_hex = document.getElementById('color-hex');

        color_view.style.backgroundColor = color;
        color_hex.innerText = color;
    }

    copy.addEventListener('click', () => {
        const textToClipboard = document.getElementById('color-hex');

        window.getSelection().removeAllRanges();

        const e = document.createRange();

        e.selectNode(textToClipboard),
            window.getSelection().addRange(e),
            document.execCommand("copy"),
            window.getSelection().removeAllRanges();

        tooltip.style.display = 'block';

        setTimeout(() => {
            tooltip.style.display = 'none';
        }, 1500);
    });

    next.addEventListener('click', () => {
        if (current < history.length - 1)
            return renderColor(history[++current]);

        const color = generateNextColor();

        history.push(color);
        current++;
        renderColor(color);
    });

    prev.addEventListener('click', () => {
        if (current == 0)
            return;

        renderColor(history[--current]);
    });
}

document.addEventListener('DOMContentLoaded', prepare);