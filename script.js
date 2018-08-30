function getAverageColour(img, startPoint = 0.0, endPoint = 1.0) {
    const startTime = Date.now();
    if (startPoint > endPoint) {
        console.error('startPoint must be greater than endPoint');
        if (startPoint < 0) {
            console.error('startPoint must be 0.0 or greater');
        }
        if (endPoint > 1) {
            console.error('endPoint must be 1.0 or lesser');
        }
        return;
    }

    const canvas = document.createElement('canvas');
    const context = canvas.getContext && canvas.getContext('2d');

    if (!context) {
        console.error('Sorry, canvas isn’t supported in this browser.');
        return;
    }

    canvas.width  = img.naturalWidth;
    canvas.height = img.naturalHeight;
    context.drawImage(img, 0, 0);

    const data = context.getImageData(0, 0, img.width, img.height).data;
    let rgb = {r:0, g:0, b:0};

    // calculate start and end points
    let start = data.length * startPoint;
    const end = (data.length * endPoint) - 4; // last R point is 4 from end
    const samplePoints = 4;
    let pointsSampled = 0;

    while (start <= end) {
        // if it's transparent register as white and skip.
        if (data[start+3] === 0) {
            whiteCount += 1;
            rgb.r += 255;
            rgb.g += 255;
            rgb.b += 255;
            start += samplePoints;
            pointsSampled++;
            continue;
        }

        rgb.r += data[start];
        rgb.g += data[start+1];
        rgb.b += data[start+2];

        start += samplePoints;
        pointsSampled++;
    }

    rgb.r = Math.floor(rgb.r / pointsSampled);
    rgb.g = Math.floor(rgb.g / pointsSampled);
    rgb.b = Math.floor(rgb.b / pointsSampled);

    console.log(img.id, 'colour:', [rgb.r, rgb.g, rgb.b].join(','), 'sampled:', pointsSampled);
    console.log(img.id + " took " + (Date.now() - startTime) / 1000 + " seconds to be calculated");

    return [rgb.r, rgb.g, rgb.b].join(',');
}

function addBorder(element, colour) {
    element.style.border = '10px solid rgb(' + colour + ')';
}

addBorder(
    document.getElementById('image0'),
    getAverageColour(image0, 0, 0.5)
);

addBorder(
    document.getElementById('image1'),
    getAverageColour(image1)
);

addBorder(
    document.getElementById('image2'),
    getAverageColour(image2, 0.4, 0.6)
);

addBorder(
    document.getElementById('image3'),
    getAverageColour(image3)
);

addBorder(
    document.getElementById('image4'),
    getAverageColour(image4, 0.8, 0.9)
);

addBorder(
    document.getElementById('image5'),
    getAverageColour(image5, 0.3, 0.4)
);
