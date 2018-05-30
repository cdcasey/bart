document.getElementById("scream").onload = function () {
    const desaturateButton = document.getElementById('desaturate');
    desaturateButton.addEventListener('click', desaturate);

    let c = document.getElementById("myCanvas");
    let img = document.getElementById("scream");
    c.width = img.width / 2;
    c.height = img.height / 2;
    let ctx = c.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height,
        0, 0, c.width, c.height);

    let imgData = ctx.getImageData(0, 0, c.width, c.height);
    console.log(imgData.width, imgData.height);
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
    ctx.putImageData(imgData, 0, 0);
    function removeColor(data) {
        for (let i = 0; i < data.length; i += 4) {
            // console.log(imgData);
            let red = data[i];
            let green = data[i + 1];
            let blue = data[i + 2];
            let alpha = data[i + 3];
            data[i] = red * .2125 + green * .7154 + blue * .0721;
            data[i + 1] = red * .2125 + green * .7154 + blue * .0721;
            data[i + 2] = red * .2125 + green * .7154 + blue * .0721;
        }
        return data;
    }
};

