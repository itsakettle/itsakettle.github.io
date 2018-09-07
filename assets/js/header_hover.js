
window.onload = function() {

  var iconDetail = document.getElementById('icon_detail');

  $('#about').hover(function () {
        iconDetail.innerHTML = 'About';
      }, function () {
        iconDetail.innerHTML = '';
  });

  $('#github').hover(function () {
    iconDetail.innerHTML = 'Github';
  }, function () {
    iconDetail.innerHTML = '';
  });

  $('#twitter').hover(function () {
    iconDetail.innerHTML = 'Twitter';
  }, function () {
    iconDetail.innerHTML = '';
  });

  $('#email').hover(function () {
    iconDetail.innerHTML = 'Email';
  }, function () {
    iconDetail.innerHTML = '';
  });

  $('#privacy').hover(function () {
    iconDetail.innerHTML = 'Privacy';
  }, function () {
    iconDetail.innerHTML = '';
  });
}
