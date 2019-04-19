// app start 

let puzzelGrid = []
const puzzelSize = { rows: 2, cols: 3 };

let buildGrid = (puzzelSize, element) => {
  let output = [];
  let h = element.height();
  let w = element.width();
  let pieceSize = { height: h / puzzelSize.rows, width: w / puzzelSize.cols }
  for (let row = 0; row < puzzelSize.rows; row++) {
    let thisRow = [];
    for (let col = 0; col < puzzelSize.cols; col++) {
      let element = {
        width: pieceSize.width,
        height: pieceSize.height,
        position: { top: row * pieceSize.height, left: col * pieceSize.width },
        gridPosition: { x: col, y: row }
      };
      thisRow.push(element);
    }
    output.push(thisRow);
  }
  return output;
}

let buildPieces = (puzzelGrid) => {
  let output = [];
  puzzelGrid.forEach(row => {
    row.forEach(item => {
      let piece = $('<div>').addClass('puzzel-piece').addClass('draggable');
      piece.css({
        width: item.width,
        height: item.height,
        top: item.position.top,
        left: item.position.left,
      })
      output.push(piece);
    })
  });
  return output;
}

$(document).ready(() => {
  let puzzelBox = $('.puzzel-box');
  puzzelGrid = buildGrid(puzzelSize, puzzelBox);
  let pieces = buildPieces(puzzelGrid);
  puzzelBox.append(pieces);

  console.log(interact);

  interact('.draggable')
    .draggable({
      // enable inertial throwing
      inertia: true,
      // keep the element within the area of it's parent
      modifiers: [
        interact.modifiers.restrict({
          restriction: ".main-box",
          endOnly: true,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        }),
      ],
      // enable autoScroll
      autoScroll: true,

      // call this function on every dragmove event
      onmove: dragMoveListener,
      // call this function on every dragend event
      onend: function (event) {
        var textEl = event.target.querySelector('p');

        textEl && (textEl.textContent =
          'moved a distance of '
          + (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
            Math.pow(event.pageY - event.y0, 2) | 0))
            .toFixed(2) + 'px');
      }
    });

})



function dragMoveListener(event) {
  var target = event.target,
    // keep the dragged position in the data-x/data-y attributes
    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform =
    target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';

  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}