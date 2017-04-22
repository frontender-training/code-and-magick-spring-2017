'use strict';

window.renderStatistics = function (ctx, names, times) {
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 10;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.fillStyle = 'white';
  ctx.strokeRect(100, 10, 420, 270);
  ctx.fillRect(100, 10, 420, 270);

  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';

  ctx.fillText('Ура вы победили!', 120, 40);

  function getMaxValue(array) {
    var max = -1;
    for (var i = 0; i < array.length; i++) {
      var value = array[i];
      if (value > max) {
        max = value;
      }
    }
    return max;
  }

  var histogramHeight = 150;
  var step = histogramHeight / getMaxValue(times);

  ctx.fillText('Список результатов:', 120, 60);

  var barHeigth = 40; // px;
  var indent = 90;    // px;
  var initialX = 140; // px;
  var initialY = 250;  // px;
  var indentName = 5;  // px;
  var indentTime = 25; // px;

  ctx.textBaseline = 'top'; // положение надписи от левого верхнего угла

  // Задаем цвета гистограмм для игроков
  function fillBarColor(namePlayer) {
    var randomOpacity = Math.random().toFixed(2); // Переменная, задающая прозрачность колоники гистограмма
    if (namePlayer === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + randomOpacity + ')';
    }
  }

  for (var i = 0; i < times.length; i++) {
    var barWidth = times[i] * step;

    ctx.fillStyle = fillBarColor(names[i]); // Вызываем функцию заливки гистограммы
    ctx.fillRect(initialX + indent * i, initialY - barWidth, barHeigth, barWidth);
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillText(names[i], initialX + indent * i, initialY + indentName);
    ctx.fillText(times[i].toFixed(0), initialX + indent * i, initialY - barWidth - indentTime);
  }
};
