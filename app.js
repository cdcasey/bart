document.getElementById("scream").onload = function () {
    const desaturateButton = document.getElementById('desaturate');
    const redSlider = document.getElementById('red');
    const greenSlider = document.getElementById('green');
    const blueSlider = document.getElementById('blue');
    const historyTarget = document.getElementById('history-target');
    // historyTarget.addEventListener('mouseup', addHistory);
    const history = [];
    let currentLife = 0;
    let isDesaturated = false;
    let mouseDown = false;
    document.body.onmousedown = function () {
        mouseDown = true;
    }
    document.body.onmouseup = function () {
        mouseDown = false;
    }
    // const redDisplay = document.getElementById('red-val');
    // redDisplay.innerText = redSlider.value;

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
        if (red - green > 50 && red - blue > 50) {
            reds.push(i)
        } else if (green - red > 50 && green - blue > 50) {
            greens.push(i + 1)
        } else if (blue - red > 50 && blue - green > 50) {
            blues.push(i + 2)
        }
    }
    redSlider.oninput = function () {
        // redDisplay.innerHTML = this.value;
        const adjust = Math.floor(255 * (this.value / 100));
        // console.log(adjust);

        for (let i = 0; i < reds.length; i++) {
            const redIndex = reds[i];
            // imgData.data[redIndex] += adjust;
            // imgData.data[redIndex + 1] += adjust;
            // imgData.data[redIndex + 2] += adjust;
            if (this.value > 0) {
                imgData.data[redIndex] += (255 - imgData.data[redIndex]) * (this.value / 100);
            } else {
                imgData.data[redIndex] -= imgData.data[redIndex] * Math.abs(this.value / 100);
            }
        }

        ctx.putImageData(imgData, 0, 0);
        desaturate();
        this.onmouseup = () => {
            addHistory(imgData.data);
        }
    }
    greenSlider.oninput = function () {
        // greenDisplay.innerHTML = this.value;

        for (let i = 0; i < greens.length; i++) {
            const green = greens[i];
            if (this.value > 0) {
                imgData.data[green] += (255 - imgData.data[green]) * (this.value / 100);
            } else {
                imgData.data[green] -= imgData.data[green] * Math.abs(this.value / 100);
            }
        }
        ctx.putImageData(imgData, 0, 0);
        desaturate();
        this.onmouseup = () => {
            addHistory(imgData.data);
        }
    }
    blueSlider.oninput = function () {
        // blueDisplay.innerHTML = this.value;

        for (let i = 0; i < blues.length; i++) {
            const blue = blues[i];
            if (this.value > 0) {
                imgData.data[blue] += (255 - imgData.data[blue]) * (this.value / 100);
            } else {
                imgData.data[blue] -= imgData.data[blue] * Math.abs(this.value / 100);
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

    function addHistory(data) {
        history.push(data.slice());
        console.log(history);

        currentLife++;
    }

    ctx.putImageData(imgData, 0, 0);
};

