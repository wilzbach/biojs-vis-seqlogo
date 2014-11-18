module.exports = function($el,logo, logo_graphic){

  $el.find('.logo_settings_switch, .logo_settings .close').bind('click', function (e) {
    e.preventDefault();
    $('.logo_settings').toggle();
  });

  $el.find('.logo_reset').bind('click', function (e) {
    e.preventDefault();
    logo.changeZoom({'target': logo.default_zoom});
  });

  $el.find('.logo_change').bind('click', function (e) {
    e.preventDefault();
  });

  $el.find('.logo_zoomin').bind('click', function (e) {
    e.preventDefault();
    logo.changeZoom({'distance': 0.1, 'direction': '+'});
  });

  $el.find('.logo_zoomout').bind('click', function (e) {
    e.preventDefault();
    logo.changeZoom({'distance': 0.1, 'direction': '-'});
  });

  $el.find('.logo_scale').bind('change', function (e) {
    logo.toggleScale(this.value);
  });

  $el.find('.logo_color').bind('change', function (e) {
    logo.toggleColorscheme(this.value);
  });

  $el.find('.logo_ali_map').bind('change', function (e) {
    logo.toggleAliMap(this.value);
  });

  $el.find('.logo_position').bind('change', function () {
    if (!this.value.match(/^\d+$/m)) {
      return;
    }
    logo.scrollToColumn(this.value, 1);
  });

  logo_graphic.bind('dblclick', function (e) {
    // need to get coordinates of mouse click
    offset = logo.logo_graphic.offset(),
    x = parseInt((e.pageX - offset.left), 10),

    // get mouse position in the window
    window_position = e.pageX - $el.parent().offset().left,

    // get column number
    col = logo.columnFromCoordinates(x),

    console.log("col", col);

    // choose new zoom level and zoom in.
    current = logo.zoom;

    if (current < 1) {
      logo.changeZoom({'target': 1, offset: window_position, column: col});
    } else {
      logo.changeZoom({'target': 0.3, offset: window_position, column: col});
    }

    return;
  });

  $(document).bind($el.attr('id') + ".scrolledTo", function (e, left, top, zoom) {
    logo.render({target: left});
  });

  $(document).keydown(function (e) {
    if (!e.ctrlKey) {
      if (e.which === 61 || e.which === 107) {
        zoom += 0.1;
        logo.changeZoom({'distance': 0.1, 'direction': '+'});
      }
      if (e.which === 109 || e.which === 0) {
        zoom = zoom - 0.1;
        logo.changeZoom({'distance': 0.1, 'direction': '-'});
      }
    }
  });
}
