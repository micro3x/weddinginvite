// app start 

let puzzelGrid = []
const puzzelSize = { rows: 3, cols: 6 };
let dropZones = []

let buildGrid = (puzzelSize, element) => {
  let output = [];
  let h = element.height();
  let w = element.width();
  let pieceSize = { height: h / puzzelSize.rows, width: w / puzzelSize.cols }
  // let offSet = 0.2;
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
      let id = 'p' + item.gridPosition.x + '_' + item.gridPosition.y;
      let piece = $('<div id="' + id + '">').addClass('puzzel-piece').addClass('draggable');
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

let buildDropZones = (puzzelGrid) => {
  let output = [];
  puzzelGrid.forEach(row => {
    row.forEach(item => {
      let zone = $('<div>').addClass('drop-zone').addClass('drop-zone-' + item.gridPosition.x + '-' + item.gridPosition.y);
      zone.css({
        width: item.width,
        height: item.height,
        top: item.position.top,
        left: item.position.left,
      })
      output.push(zone);
    })
  })
  return output;
}


$(document).ready(() => {
  let puzzelBox = $('.puzzel-box');
  puzzelGrid = buildGrid(puzzelSize, puzzelBox);
  let pieces = buildPieces(puzzelGrid);
  puzzelBox.append(pieces);
  puzzelBox.append(buildDropZones(puzzelGrid));
  enableDrag();
  enableDropZones(puzzelGrid);
})

enableDropZones = (puzzelGrid) => {
  puzzelGrid.forEach(row => {
    row.forEach(item => {
      let pieceId = 'p' + item.gridPosition.x + '_' + item.gridPosition.y;
      interact('.drop-zone-' + item.gridPosition.x + '-' + item.gridPosition.y)
        .dropzone({
          // only accept elements matching this CSS selector
          accept: '#' + pieceId,
          // Require a 75% element overlap for a drop to be possible
          overlap: 0.95,

          // listen for drop related events:

          // ondropactivate: function (event) {
          //   // add active dropzone feedback
          //   // event.target.classList.add('drop-active')
          //   console.log('enter');
          // },
          // ondragenter: function (event) {
          //   var draggableElement = event.relatedTarget;
          //   var dropzoneElement = event.target;

          //   // feedback the possibility of a drop
          //   dropzoneElement.classList.add('drop-target')
          //   draggableElement.classList.add('can-drop')
          //   draggableElement.textContent = 'Dragged in'
          // },
          // ondragleave: function (event) {
          //   // remove the drop feedback style
          //   event.target.classList.remove('drop-target')
          //   event.relatedTarget.classList.remove('can-drop')
          //   event.relatedTarget.textContent = 'Dragged out'
          // },
          ondrop: function (event) {
            // event.relatedTarget.textContent = 'Dropped';
            let piece = $(event.relatedTarget);
            piece.removeClass('draggable');
            piece.removeAttr('data-x');
            piece.removeAttr('data-y');
            piece.css({
              width: item.width,
              height: item.height,
              top: item.position.top,
              left: item.position.left,
              transform: 'none',
            })
          },
          // ondropdeactivate: function (event) {
          //   // remove active dropzone feedback
          //   event.target.classList.remove('drop-active')
          //   event.target.classList.remove('drop-target')
          // }
        });
    })
  })
}

let enableDrag = () => {
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

}

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

window.dragMoveListener = dragMoveListener;
