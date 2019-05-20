
let pesition = {
  left: 10,
  top: 50
}

let pointsPosition = {
  1: { top: 140, left: 360 },
  2: { top: 0, left: 0 },
  3: { top: 0, left: 0 },
}

let map = null;
let main = $('#stage3');

main.on('classChange', () => {
  map = $('#map-box');
  calcPositions();
  renderPosition(1);

});

calcPositions = () => {
  let mapImg = $('#map');
  let xoffset = parseInt(mapImg.css("margin-left"));
  let left = (mapImg.width() * pointsPosition[1].left) / 1200
  let top = (mapImg.height() * pointsPosition[1].top) / 900

  pointsPosition[1].left = left + xoffset;
  pointsPosition[1].left = top;

 }

renderPosition = (posNumber) => {
  

  let point = $('<div class="point">')
    .text(posNumber)
    .css(pointsPosition[posNumber])
  // .top(pointsPosition[posNumber].top)
  // .left(pointsPosition[posNumber].left)
  map.append(point);
}

renderMap = () => {

}

detectColision = (bike, points) => {

}


