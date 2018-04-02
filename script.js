function getAverageColour(img, startPoint = 0.0, endPoint = 1.0, samplePoints = 800) {
    if (startPoint > endPoint) {
        console.error('startPoint must be greater than endPoint');
        if (startPoint < 0) {
            console.error('startPoint must be 0 or greater');
        }
        if (endPoint > 1) {
            console.error('endPoint must be 1 or lesser');
        }
        return;
    }

    if (samplePoints % 4 !== 0) {
        console.error('Sample occurence must be divisible by 4.');
        return;
    }

    const canvas = document.createElement('canvas');
    const context = canvas.getContext && canvas.getContext('2d');

    if (!context) {
        console.error('Sorry, canvas isn’t supported.');
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
    return [rgb.r, rgb.g, rgb.b].join(',');
}

function addBorder(element, colour) {
    element.style.border = '10px solid rgb(' + colour + ')';
}

const image0 = document.getElementById('image0');
const image0colour = getAverageColour(image0);
addBorder(image0, image0colour);

const image1 = document.getElementById('image1');
const image1colour = getAverageColour(image1);
addBorder(image1, image1colour);

const image2 = document.getElementById('image2');
const image2colour = getAverageColour(image2);
addBorder(image2, image2colour);

const image3 = document.getElementById('image3');
const image3colour = getAverageColour(image3);
addBorder(image3, image3colour);

const image4 = document.getElementById('image4');
const image4colour = getAverageColour(image4);
addBorder(image4, image4colour);

const image5 = document.getElementById('image5');
const image5colour = getAverageColour(image5);
addBorder(image5, image5colour);
