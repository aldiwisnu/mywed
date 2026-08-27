document.addEventListener('DOMContentLoaded', () => {
    // 0. Guest Greeting from URL Parameter
    const urlParams = new URLSearchParams(window.location.search);
    const guestNameParam = urlParams.get('to');
    
    if (guestNameParam) {
        document.getElementById('guest-name').innerText = guestNameParam;
        document.getElementById('guest-greeting').style.display = 'inline-block';
        
        // Pre-fill RSVP form name if it exists
        const rsvpNameInput = document.getElementById('name');
        if (rsvpNameInput) {
            rsvpNameInput.value = guestNameParam;
        }
    }

    // 1. Countdown Timer
    const targetDate = new Date("September 27, 2026 09:00:00").getTime();
    
    const countdown = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(countdown);
            document.getElementById("days").innerText = "00";
            document.getElementById("hours").innerText = "00";
            document.getElementById("minutes").innerText = "00";
            document.getElementById("seconds").innerText = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days < 10 ? "0" + days : days;
        document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
        document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
    }, 1000);

    // 2. RSVP Form Submission
    const rsvpForm = document.getElementById('rsvpForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');

    // Ganti URL ini dengan URL Google Apps Script Web App Anda nanti
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz_DUMMY_URL_UBAH_NANTI/exec';

    // WISHES (Ucapan & Doa) Logic
    const wishesContainer = document.getElementById('wishesContainer');
    const WISHES_STORAGE_KEY = 'wedding_wishes';
    
    // Dummy wishes in case it's empty
    const dummyWishes = [
        { name: "Budi & Keluarga", message: "Selamat menempuh hidup baru Mas Aldi & Mbak Faradila. Samawa ya!", date: "27 Aug 2026" },
        { name: "Siti Rahma", message: "Semoga lancar sampai hari H! Bahagia selalu untuk kalian berdua.", date: "26 Aug 2026" }
    ];

    function getWishes() {
        const stored = localStorage.getItem(WISHES_STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
        return dummyWishes;
    }

    function saveWishes(wishes) {
        localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(wishes));
    }

    function renderWishes() {
        if (!wishesContainer) return;
        const wishes = getWishes();
        wishesContainer.innerHTML = '';
        
        if (wishes.length === 0) {
            wishesContainer.innerHTML = '<p style="text-align:center; color:#888;">Belum ada ucapan. Jadilah yang pertama!</p>';
            return;
        }

        wishes.forEach(wish => {
            const card = document.createElement('div');
            card.className = 'wish-card';
            card.innerHTML = `
                <div class="wish-name">${wish.name}</div>
                <div class="wish-message">"${wish.message}"</div>
                <div class="wish-date">${wish.date}</div>
            `;
            wishesContainer.appendChild(card);
        });
    }

    // Render initially
    renderWishes();

    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        submitBtn.innerText = 'Mengirim...';
        submitBtn.disabled = true;

        const formData = new FormData(rsvpForm);
        const userName = formData.get('name');
        const userMessage = formData.get('message');
        
        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: formData,
            mode: 'no-cors' // Penting untuk menghindari error CORS saat mengirim ke Google Scripts dari frontend
        })
        .then(() => {
            formMessage.innerText = 'Terima kasih, konfirmasi Anda telah terkirim!';
            formMessage.className = 'form-message success';
            
            // Save wish to local storage if message exists
            if (userMessage && userMessage.trim() !== '') {
                const newWish = {
                    name: userName || 'Tamu',
                    message: userMessage,
                    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
                };
                
                const currentWishes = getWishes();
                currentWishes.unshift(newWish); // Add to top
                // Keep max 10 wishes
                if (currentWishes.length > 10) {
                    currentWishes.pop();
                }
                saveWishes(currentWishes);
                renderWishes();
            }

            rsvpForm.reset();
        })
        .catch((error) => {
            console.error('Error!', error.message);
            formMessage.innerText = 'Terjadi kesalahan. Silakan coba lagi.';
            formMessage.className = 'form-message error';
        })
        .finally(() => {
            submitBtn.innerText = 'Kirim Konfirmasi';
            submitBtn.disabled = false;
        });
    });

    // 3. Add to Calendar Links
    const eventDetails = {
        title: "Pernikahan Faradila & Aldi",
        location: "Kediaman Mempelai Wanita, Klodran RT 4 RW 1 Colomadu, Karanganyar",
        details: "Mohon kehadiran dan doa restunya di hari bahagia kami.",
        startDate: "20260927T020000Z", // Format UTC (09.00 WIB = 02.00 UTC)
        endDate: "20260927T080000Z"   // Asumsi resepsi selesai jam 15.00 WIB (08.00 UTC)
    };

    // Google Calendar
    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&dates=${eventDetails.startDate}/${eventDetails.endDate}&details=${encodeURIComponent(eventDetails.details)}&location=${encodeURIComponent(eventDetails.location)}`;
    document.getElementById('google-calendar').href = googleUrl;

    // Outlook Calendar
    const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${encodeURIComponent(eventDetails.title)}&startdt=${eventDetails.startDate.substring(0,8)}T${eventDetails.startDate.substring(9,15)}&enddt=${eventDetails.endDate.substring(0,8)}T${eventDetails.endDate.substring(9,15)}&body=${encodeURIComponent(eventDetails.details)}&location=${encodeURIComponent(eventDetails.location)}`;
    document.getElementById('outlook-calendar').href = outlookUrl;
});
