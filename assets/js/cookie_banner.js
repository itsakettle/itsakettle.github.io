// Display the banner on page load
const bannerVisibility = () => {

  let bannerStatus = localStorage.bannerStatus;

  if (bannerStatus != 'dismissed') {
    $('#cookie-banner').css({visibility: 'visible'})
  }
  
}

const bannerDismiss = () => {
  $('#banner-dismiss').click(function () {
    localStorage.bannerStatus = 'dismissed';
    $('#cookie-banner').css({visibility: 'hidden'})
  });
}

window.addEventListener('load', bannerVisibility)
window.addEventListener('load', bannerDismiss)