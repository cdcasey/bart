document.getElementById("scream").onload = function () {
    const desaturateButton = document.getElementById('desaturate');
    const redSlider = document.getElementById('red');
    const redDisplay = document.getElementById('red-val');
    redDisplay.innerText = redSlider.value;

    desaturateButton.addEventListener('click', desaturate);
    let c = document.getElementById("myCanvas");
    let img = document.getElementById("scream");
    c.width = img.width / 2;
    c.height = img.height / 2;
    let ctx = c.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height,
        0, 0, c.width, c.height);

    let imgData = ctx.getImageData(0, 0, c.width, c.height);
    let reds = [];
    let greens = [];
    let blues = [];
    for (let i = 0; i < imgData.data.length; i += 4) {
        let red = imgData.data[i];
        let green = imgData.data[i + 1];
        let blue = imgData.data[i + 2];
        if (red > green && red > blue) {
            reds.push(i)
        } else if (green > red && green > blue) {
            greens.push(i + 1)
        } else if (blue > red && blue > green) {
            blues.push(i + 2)
        }
    }
    redSlider.oninput = function () {
        redDisplay.innerHTML = this.value;

        for (let i = 0; i < reds.length; i++) {
            const red = reds[i];
            if (this.value > 0) {
                imgData.data[red] += (255 - imgData.data[red]) * (this.value / 100);
            } else {
                imgData.data[red] -= imgData.data[red] * Math.abs(this.value / 100);
            }
        }
        ctx.putImageData(imgData, 0, 0);
        // desaturate();
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
    }
    function removeColor(data) {
        for (let i = 0; i < data.length; i += 4) {
            // console.log(imgData);
            let red = data[i];
            let green = data[i + 1];
            let blue = data[i + 2];
            let alpha = data[i + 3];
            const avg = (red + green + blue) / 3;
            // const avg = red * .2125 + green * .7154 + blue * .0721;
            data[i] = data[i + 1] = data[i + 2] = avg;
            // data[i] = red * .2125 + green * .7154 + blue * .0721;
            // data[i + 1] = red * .2125 + green * .7154 + blue * .0721;
            // data[i + 2] = red * .2125 + green * .7154 + blue * .0721;
        }
        return data;
    }

    for (let i = 0; i < imgData.data.length; i += 4) {
        const element = imgData.data[i];
        // imgData.data[i + 3] = element * 2;
    }
    console.log(imgData);

    ctx.putImageData(imgData, 0, 0);
};

