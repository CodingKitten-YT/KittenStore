// Detect Safari on iOS
// Detect Safari on iOS and check if app is already added to the home screen
function isSafariMobile() {
    const ua = navigator.userAgent.toLowerCase();
    const isSafari = ua.includes('safari') && !ua.includes('chrome') && (ua.includes('iphone') || ua.includes('ipad'));
    const isStandalone = window.navigator.standalone === true;

    return isSafari && !isStandalone; // Only show popup if NOT in standalone mode
}

// Show the popup if Safari mobile but NOT added to the home screen
function checkSafariMobile() {
    if (isSafariMobile()) {
        document.getElementById('add-to-homescreen-popup1').classList.remove('d-none');
    }
}

window.onload = checkSafariMobile;


// Popups

function ShowPopup2(){
    document.getElementById('add-to-homescreen-popup1').classList.add('d-none');
    document.getElementById('add-to-homescreen-popup2').classList.remove('d-none');
}

function ShowPopup3(){
    document.getElementById('add-to-homescreen-popup2').classList.add('d-none');
    document.getElementById('add-to-homescreen-popup3').classList.remove('d-none');
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('the-site-uri').textContent = window.location.href;
}
);