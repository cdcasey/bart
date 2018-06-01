document.getElementById("scream").onload = function () {
    const desaturateButton = document.getElementById('desaturate');
    const undoButton = document.getElementById('undo');
    const redSlider = document.getElementById('red');
    const greenSlider = document.getElementById('green');
    const blueSlider = document.getElementById('blue');
    const contrastSlider = document.getElementById('contrast');
    const historyTarget = document.getElementById('history-target');
    // historyTarget.addEventListener('mouseup', addHistory);
    const history = [];
    let currentLife = -1;
    let isDesaturated = false;

    // const redDisplay = document.getElementById('red-val');
    // redDisplay.innerText = redSlider.value;
    // contrastSlider.addEventListener('oninput', adjustContrast);
    desaturateButton.addEventListener('click', desaturate);
    let c = document.getElementById("myCanvas");
    let img = document.getElementById("scream");
    c.width = img.width / 2;
    c.height = img.height / 2;
    let ctx = c.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height,
        0, 0, c.width, c.height);

    let imgData = ctx.getImageData(0, 0, c.width, c.height);
    addHistory(imgData.data);
    let reds = [];
    let greens = [];
    let blues = [];
    for (let i = 0; i < imgData.data.length; i += 4) {
        let red = imgData.data[i];
        let green = imgData.data[i + 1];
        let blue = imgData.data[i + 2];
        if (red - green > 25 && red - blue > 25) {
            reds.push(i)
        } else if (green - red > 25 && green - blue > 25) {
            greens.push(i + 1)
        } else if (blue - red > 25 && blue - green > 25) {
            blues.push(i + 2)
        }
    }
    redSlider.oninput = function () {
        // redDisplay.innerHTML = Number(this.value);
        const adjust = Math.floor(255 * (Number(this.value) / 100));
        // console.log(adjust);

        for (let i = 0; i < reds.length; i++) {
            const redIndex = reds[i];
            // imgData.data[redIndex] += adjust;
            // imgData.data[redIndex + 1] += adjust;
            // imgData.data[redIndex + 2] += adjust;
            if (Number(this.value) > 0) {
                imgData.data[redIndex] += (255 - imgData.data[redIndex]) * (Number(this.value) / 100);
            } else {
                imgData.data[redIndex] -= imgData.data[redIndex] * Math.abs(Number(this.value) / 100);
            }
        }
        ctx.putImageData(imgData, 0, 0);
        desaturate();

        this.onmouseup = () => {
            addHistory(imgData.data);
        }
    }
    greenSlider.oninput = function () {
        // greenDisplay.innerHTML = Number(this.value);

        for (let i = 0; i < greens.length; i++) {
            const green = greens[i];
            if (Number(this.value) > 0) {
                imgData.data[green] += (255 - imgData.data[green]) * (Number(this.value) / 100);
            } else {
                imgData.data[green] -= imgData.data[green] * Math.abs(Number(this.value) / 100);
            }
        }
        ctx.putImageData(imgData, 0, 0);
        desaturate();
        this.onmouseup = () => {
            addHistory(imgData.data);
        }
    }
    blueSlider.oninput = function () {
        // blueDisplay.innerHTML = Number(this.value);

        for (let i = 0; i < blues.length; i++) {
            const blue = blues[i];
            if (Number(this.value) > 0) {
                imgData.data[blue] += (255 - imgData.data[blue]) * (Number(this.value) / 100);
            } else {
                imgData.data[blue] -= imgData.data[blue] * Math.abs(Number(this.value) / 100);
            }
        }
        ctx.putImageData(imgData, 0, 0);
        desaturate();
        this.onmouseup = () => {
            addHistory(imgData.data);
        }
    }
    // desaturate();
    // imgData = desaturate(ctx);
    // invert colors
    // let i;
    // for (i = 0; i < imgData.data.length; i += 4) {
    //     imgData.data[i] = 255 - imgData.data[i];
    //     imgData.data[i + 1] = 255 - imgData.data[i + 1];
    //     imgData.data[i + 2] = 255 - imgData.data[i + 2];
    //     imgData.data[i + 3] = 255;
    // }

    // for (let i = 0; i < imgData.data.length; i += 4) {
    // imgData.data[i] = 255 - imgData.data[i];
    // imgData.data[i + 1] = 255 - imgData.data[i + 1];
    // imgData.data[i + 2] = 255 - imgData.data[i + 2];
    // imgData.data[i + 3] = 255;
    // }
    // for (let i = 0; i < imgData.data.length; i += 4) {
    //     // console.log(imgData);
    //     let red = imgData.data[i];
    //     let green = imgData.data[i + 1];
    //     let blue = imgData.data[i + 2];
    //     let alpha = imgData.data[i + 3];
    //     imgData.data[i] = red * .2125 + green * .7154 + blue * .0721;
    //     imgData.data[i + 1] = red * .2125 + green * .7154 + blue * .0721;
    //     imgData.data[i + 2] = red * .2125 + green * .7154 + blue * .0721;
    // }
    //     ctx.putImageData(imgData, 0, 0);
    // }

    function desaturate(event) {
        imgData.data = removeColor(imgData.data);
        ctx.putImageData(imgData, 0, 0);
        if (!isDesaturated) {
            addHistory(imgData.data);
            isDesaturated = true;
        }
    }
    function removeColor(data) {
        for (let i = 0; i < data.length; i += 4) {
            // console.log(imgData);
            let red = data[i];
            let green = data[i + 1];
            let blue = data[i + 2];
            let alpha = data[i + 3];
            // const avg = (red + green + blue) / 3;
            const avg = red * .2125 + green * .7154 + blue * .0721;
            data[i] = data[i + 1] = data[i + 2] = avg;
            // data[i] = red * .2125 + green * .7154 + blue * .0721;
            // data[i + 1] = red * .2125 + green * .7154 + blue * .0721;
            // data[i + 2] = red * .2125 + green * .7154 + blue * .0721;
        }
        return data;
    }
    undoButton.addEventListener('click', () => {
        if (currentLife === 0) {
            alert('Already at earliest state');
        } else {
            redSlider.value = greenSlider.value = blueSlider.value = contrastSlider.value = 0;
            history.pop();
            for (let i = 0; i < history[history.length - 1].length; i++) {
                const element = history[history.length - 1][i];
                imgData.data[i] = element;
            }
            ctx.putImageData(imgData, 0, 0);
            currentLife--;
        }
    });
    contrastSlider.oninput = function adjustContrast() {
        const adjust = Math.pow((Number(this.value) + 100) / 100, 2);
        for (let i = 0; i < imgData.data.length; i += 4) {
            let red = imgData.data[i];
            let green = imgData.data[i + 1];
            let blue = imgData.data[i + 2];
            red /= 255;
            red -= 0.5;
            red *= adjust;
            red += 0.5;
            red *= 255;
            imgData.data[i] = red;
            green /= 255;
            green -= 0.5;
            green *= adjust;
            green += 0.5;
            green *= 255;
            imgData.data[i + 1] = green;
            blue /= 255;
            blue -= 0.5;
            blue *= adjust;
            blue += 0.5;
            blue *= 255;
            imgData.data[i + 2] = blue;
        }
        ctx.putImageData(imgData, 0, 0);
        this.onmouseup = () => {
            addHistory(imgData.data);
        }
    }
    function addHistory(data) {
        history.push(data.slice());
        currentLife++;
    }

    ctx.putImageData(imgData, 0, 0);
};