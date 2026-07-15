/*==================== SHOW MENU ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 100 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 100) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SWIPER DISCOVER ====================*/
let swiper = new Swiper(".discover__container", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    spaceBetween: 32,
    coverflowEffect: {
        rotate: 0,
    },
})

/*==================== VIDEO ====================*/
const videoFile = document.getElementById('video-file'),
      videoButton = document.getElementById('video-button'),
      videoIcon = document.getElementById('video-icon')

function playPause(){ 
    if (videoFile.paused){
        // Play video
        videoFile.play()
        // We change the icon
        videoIcon.classList.add('ri-pause-line')
        videoIcon.classList.remove('ri-play-line')
    }
    else {
        // Pause video
        videoFile.pause(); 
        // We change the icon
        videoIcon.classList.remove('ri-pause-line')
        videoIcon.classList.add('ri-play-line')

    }
}
videoButton.addEventListener('click', playPause)

function finalVideo(){
    // Video ends, icon change
    videoIcon.classList.remove('ri-pause-line')
    videoIcon.classList.add('ri-play-line')
}
// ended, when the video ends
videoFile.addEventListener('ended', finalVideo)


/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 200 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 200) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== SCROLL REVEAL ANIMATION ====================*/
const sr = ScrollReveal({
    distance: '60px',
    duration: 2800,
    // reset: true,
})


sr.reveal(`.home__data, .home__social-link, .home__info,
           .discover__container,
           .experience__data, .experience__overlay,
           .place__card,
           .sponsor__content,
           .footer__data, .footer__rights`,{
    origin: 'top',
    interval: 100,
})

sr.reveal(`.about__data, 
           .video__description,
           .subscribe__description`,{
    origin: 'left',
})

sr.reveal(`.about__img-overlay, 
           .video__content,
           .subscribe__form`,{
    origin: 'right',
    interval: 100,
})

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== GLOBE.GL 3D MAP ===============*/
const mapContainer = document.getElementById('places-map');
if (mapContainer && window.Globe) {
    const destinations = [
        {
            name: "Bali",
            lat: -8.409518, lng: 115.188919,
            img: "assets/img/discover1.jpg",
            desc: "24 tours available"
        },
        {
            name: "Hawaii",
            lat: 19.896766, lng: -155.582782,
            img: "assets/img/discover2.jpg",
            desc: "15 tours available"
        },
        {
            name: "Hvar",
            lat: 43.1729, lng: 16.4412,
            img: "assets/img/discover3.jpg",
            desc: "18 tours available"
        },
        {
            name: "Whitehaven",
            lat: -20.2825, lng: 149.0394,
            img: "assets/img/discover4.jpg",
            desc: "32 tours available"
        },
        {
            name: "Bora Bora",
            lat: -16.5004, lng: -151.7415,
            img: "assets/img/place2.jpg",
            desc: "12 tours available"
        }
    ];

    const world = Globe()
        (mapContainer)
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
        .backgroundColor('rgba(0,0,0,0)')
        .htmlElementsData(destinations)
        .htmlElement(d => {
            const el = document.createElement('div');
            el.innerHTML = `
                <div class="globe-marker">
                    <div class="globe-tooltip">
                        <img src="${d.img}" alt="${d.name}">
                        <h3>${d.name}</h3>
                        <span>${d.desc}</span>
                    </div>
                </div>
            `;
            el.style.pointerEvents = 'auto';
            el.onclick = () => {
                world.pointOfView({ lat: d.lat, lng: d.lng, altitude: 0.5 }, 1500);
            };
            return el;
        });

    // Auto-rotate
    world.controls().autoRotate = true;
    world.controls().autoRotateSpeed = 1.0;
    world.controls().enableDamping = true;
    
    // Set initial view
    world.pointOfView({ lat: 20, lng: 0, altitude: 2 });
}

/*==================== SWIPER TESTIMONIAL ====================*/
let swiperTestimonial = new Swiper(".testimonial__container", {
    grabCursor: true,
    spaceBetween: 24,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        568: {
            slidesPerView: 2,
        },
        968: {
            slidesPerView: 3,
        },
    },
})

/*==================== LIVE WEATHER & BEST TIME ====================*/
const weatherData = {
    bali: { lat: -8.4095, lon: 115.1889, bestTime: "May to September for dry, sunny weather." },
    borabora: { lat: -16.5004, lon: -151.7415, bestTime: "May to October when the weather is dry and pleasant." },
    hawaii: { lat: 19.8968, lon: -155.5828, bestTime: "March to September for the least rain and warmest waters." },
    whitehaven: { lat: -20.2825, lon: 149.0394, bestTime: "September to November for perfect sailing weather." },
    hvar: { lat: 43.1729, lon: 16.4412, bestTime: "June to September for hot beach days and vibrant nightlife." }
};

// Weather code to Remix Icon mapping (Open-Meteo WMO codes)
function getWeatherIcon(code) {
    if (code === 0) return { icon: 'ri-sun-fill', desc: 'Clear sky' };
    if (code === 1 || code === 2 || code === 3) return { icon: 'ri-sun-cloudy-fill', desc: 'Partly cloudy' };
    if (code >= 45 && code <= 48) return { icon: 'ri-mist-fill', desc: 'Fog' };
    if (code >= 51 && code <= 67) return { icon: 'ri-drizzle-fill', desc: 'Rain' };
    if (code >= 71 && code <= 77) return { icon: 'ri-snowy-fill', desc: 'Snow' };
    if (code >= 80 && code <= 82) return { icon: 'ri-showers-fill', desc: 'Showers' };
    if (code >= 95) return { icon: 'ri-thunderstorms-fill', desc: 'Thunderstorm' };
    return { icon: 'ri-sun-fill', desc: 'Clear' };
}

async function fetchWeather(lat, lon) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`);
        const data = await response.json();
        return {
            temp: Math.round(data.current.temperature_2m),
            code: data.current.weather_code
        };
    } catch (error) {
        console.error("Error fetching weather:", error);
        return null;
    }
}

// 1. Handle Dashboard updates
const weatherSelect = document.getElementById('weather-destination');
const weatherTemp = document.getElementById('weather-temp');
const weatherDesc = document.getElementById('weather-desc');
const weatherIcon = document.getElementById('weather-icon');
const weatherBestTime = document.getElementById('weather-best-time');

if (weatherSelect) {
    const updateDashboard = async (destinationId) => {
        const location = weatherData[destinationId];
        
        // Show loading state
        weatherTemp.textContent = '--°C';
        weatherDesc.textContent = 'Fetching...';
        weatherIcon.className = 'ri-loader-4-line ri-spin weather__icon';
        
        const weather = await fetchWeather(location.lat, location.lon);
        
        if (weather) {
            const condition = getWeatherIcon(weather.code);
            weatherTemp.textContent = `${weather.temp}°C`;
            weatherDesc.textContent = condition.desc;
            weatherIcon.className = `${condition.icon} weather__icon`;
            weatherBestTime.textContent = location.bestTime;
        } else {
            weatherDesc.textContent = 'Failed to load weather';
            weatherIcon.className = 'ri-error-warning-line weather__icon';
        }
    };

    // Initial load
    updateDashboard(weatherSelect.value);

    // On change
    weatherSelect.addEventListener('change', (e) => {
        updateDashboard(e.target.value);
    });
}

// 2. Handle Place Cards updates
const placeWeatherBadges = document.querySelectorAll('.place__weather');
placeWeatherBadges.forEach(async (badge) => {
    const destinationId = badge.getAttribute('data-weather');
    const location = weatherData[destinationId];
    
    if (location) {
        const weather = await fetchWeather(location.lat, location.lon);
        if (weather) {
            const condition = getWeatherIcon(weather.code);
            badge.innerHTML = `<i class="${condition.icon}"></i> ${weather.temp}°C`;
        } else {
            badge.style.display = 'none'; // Hide if failed
        }
    }
});

/*==================== VIRTUAL TOUR (PANOLENS) ====================*/
const panoramaContainer = document.getElementById('panorama-container');
if (panoramaContainer && window.PANOLENS) {
    const viewer = new PANOLENS.Viewer({
        container: panoramaContainer,
        autoRotate: true,
        autoRotateSpeed: 0.5,
        controlBar: false, // Hide controls for a cleaner cinematic look
    });

    // Use the locally downloaded equirectangular image to avoid CORS issues
    const panorama = new PANOLENS.ImagePanorama('assets/img/360-placeholder.jpg');
    
    viewer.add(panorama);

    // Optional: add a tiny delay to hide the "Drag to explore" overlay on first interaction
    panoramaContainer.addEventListener('mousedown', () => {
        const overlay = document.querySelector('.virtual-tour__overlay');
        if (overlay) {
            overlay.style.opacity = '0';
        }
    }, { once: true });
}