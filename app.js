document.getElementById("scream").onload = function () {
    let c = document.getElementById("myCanvas");
    let ctx = c.getContext("2d");
    let img = document.getElementById("scream");
    ctx.drawImage(img, 0, 0);
    let imgData = ctx.getImageData(0, 0, c.width, c.height);
    // invert colors
    let i;
    for (i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i] = 255 - imgData.data[i];
        imgData.data[i + 1] = 255 - imgData.data[i + 1];
        imgData.data[i + 2] = 255 - imgData.data[i + 2];
        imgData.data[i + 3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);
};
