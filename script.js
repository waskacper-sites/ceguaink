/* ==========================================================================
   0. CUSTOM ALERTS & CONFIRMS
   ========================================================================== */
function showCustomModal(options) {
    const modal = document.getElementById('custom-alert-modal');
    if (!modal) {
        if (options.type === 'confirm') {
            if (window.confirm(options.message)) {
                if (options.onConfirm) options.onConfirm();
            }
        } else {
            console.log("ALERT:", options.message);
        }
        return;
    }

    const titleEl = document.getElementById('custom-alert-title');
    const msgEl = document.getElementById('custom-alert-message');
    const iconEl = document.getElementById('custom-alert-icon');
    const btnContainer = document.getElementById('custom-alert-buttons');

    if (titleEl) titleEl.innerText = options.title || 'Komunikat';
    if (msgEl) msgEl.innerText = options.message || '';
    
    if (iconEl) {
        let iconName = options.icon || 'bell';
        if (options.type === 'confirm') iconName = 'help-circle';
        if (options.type === 'error') iconName = 'alert-triangle';
        if (options.type === 'success') iconName = 'check-circle';
        
        iconEl.innerHTML = `<i data-lucide="${iconName}" class="w-8 h-8 alert-icon-lucide"></i>`;
        
        iconEl.className = 'w-16 h-16 rounded-full flex items-center justify-center mb-4 border mx-auto ';
        if (options.type === 'error') {
            iconEl.className += 'bg-rose-50 text-rose-500 border-rose-100';
        } else if (options.type === 'success') {
            iconEl.className += 'bg-emerald-50 text-emerald-500 border-emerald-100';
        } else if (options.type === 'confirm') {
            iconEl.className += 'bg-amber-50 text-amber-500 border-amber-100';
        } else {
            iconEl.className += 'bg-[#FAF8F5] text-[#BAAA98] border-[#E8E2DA]';
        }
        
        if (typeof lucide !== 'undefined' && lucide.createIcons) {
            setTimeout(() => lucide.createIcons({ attrs: { class: 'w-8 h-8 alert-icon-lucide' } }), 10);
        }
    }

    btnContainer.innerHTML = '';

    const hideModal = () => {
        modal.classList.remove('opacity-100');
        modal.classList.add('opacity-0');
        const box = modal.querySelector('.alert-box');
        if (box) {
            box.classList.remove('scale-100');
            box.classList.add('scale-95');
        }
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }, 300);
    };

    if (options.type === 'confirm') {
        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'px-5 py-2.5 rounded-xl text-sm font-bold border border-[#E8E2DA] text-neutral-600 hover:bg-neutral-50 transition flex-1';
        cancelBtn.innerText = options.cancelText || 'Anuluj';
        cancelBtn.onclick = hideModal;

        const confirmBtn = document.createElement('button');
        confirmBtn.className = 'px-5 py-2.5 rounded-xl text-sm font-bold bg-[#0F0F12] text-white hover:bg-neutral-800 transition flex-1 shadow-md';
        confirmBtn.innerText = options.confirmText || 'Potwierdź';
        confirmBtn.onclick = () => {
            hideModal();
            if (options.onConfirm) options.onConfirm();
        };

        btnContainer.appendChild(cancelBtn);
        btnContainer.appendChild(confirmBtn);
    } else {
        const okBtn = document.createElement('button');
        okBtn.className = 'px-8 py-2.5 rounded-xl text-sm font-bold bg-[#0F0F12] text-white hover:bg-neutral-800 transition shadow-md w-full sm:w-auto min-w-[120px] mx-auto';
        okBtn.innerText = 'OK';
        okBtn.onclick = hideModal;
        btnContainer.appendChild(okBtn);
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    // trigger reflow
    void modal.offsetWidth;
    
    modal.classList.remove('opacity-0');
    modal.classList.add('opacity-100');
    const box = modal.querySelector('.alert-box');
    if (box) {
        box.classList.remove('scale-95');
        box.classList.add('scale-100');
    }
}

window.customAlert = function(msg, title, type) {
    showCustomModal({
        type: type || 'alert',
        title: title || 'Uwaga',
        message: msg
    });
};

window.customConfirm = function(msg, title, onConfirm) {
    showCustomModal({
        type: 'confirm',
        title: title || 'Potwierdzenie',
        message: msg,
        onConfirm: onConfirm
    });
};

// Override native alert
window.alert = function(msg) {
    let type = 'alert';
    let title = 'Komunikat';
    if (msg.toLowerCase().includes('dziękujemy') || msg.toLowerCase().includes('sukces') || msg.toLowerCase().includes('zapisana')) {
        type = 'success';
        title = 'Sukces!';
    } else if (msg.toLowerCase().includes('błąd') || msg.toLowerCase().includes('przekracza') || msg.toLowerCase().includes('limit')) {
        type = 'error';
        title = 'Wystąpił problem';
    }
    customAlert(msg, title, type);
};

/**
 * ==========================================================================
 * CEGUA INK TATTOO STUDIO - GŁÓWNY SKRYPT INTERAKTYWNY
 * Styl: Jasny, minimalistyczny luksus, subtelna mgła w tle
 * Tarnów, ul. Klikowska 186 | Tel: 881 400 555
 * Oficjalny Cennik: 1-4cm od 300zł, 5-8cm od 400zł, 9-12cm od 600zł,
 * 13-15cm od 900zł, 16-18cm od 1000zł, Sesja całodzienna od 1400zł.
 * Konsultacja: DARMOWA | Zadatek: 100-200zł
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initSmokeMistCanvas();
    initScrollReveal();
    initNavigation();
    initBookingSystem();
    initAdminSystem();
    initPortfolioLightbox();
    initFaqAccordion();
    initContactModal();
    checkAdminRoute();
});

/* ==========================================================================
   1. SUBTELNA ANIMACJA MGŁY / DYMU W TLE (CANVAS)
   ========================================================================== */
function initSmokeMistCanvas() {
    const canvas = document.getElementById('smoke-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particleCount = 18;
    const particles = [];

    const colors = [
        { r: 215, g: 202, b: 188 },
        { r: 232, g: 224, b: 214 },
        { r: 198, g: 183, b: 167 },
        { r: 240, g: 235, b: 228 }
    ];

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: 120 + Math.random() * 220,
            vx: (Math.random() - 0.45) * 0.35,
            vy: (Math.random() - 0.5) * 0.25,
            alpha: 0.04 + Math.random() * 0.065,
            color: colors[Math.floor(Math.random() * colors.length)],
            phase: Math.random() * Math.PI * 2,
            pulseSpeed: 0.005 + Math.random() * 0.008
        });
    }

    function render() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            p.x += p.vx;
            p.y += p.vy;
            p.phase += p.pulseSpeed;

            const margin = p.radius * 1.2;
            if (p.x < -margin) p.x = width + margin;
            if (p.x > width + margin) p.x = -margin;
            if (p.y < -margin) p.y = height + margin;
            if (p.y > height + margin) p.y = -margin;

            const currentAlpha = p.alpha * (0.8 + 0.2 * Math.sin(p.phase));
            const currentRadius = p.radius * (0.92 + 0.08 * Math.cos(p.phase));

            const grad = ctx.createRadialGradient(
                p.x, p.y, currentRadius * 0.05,
                p.x, p.y, currentRadius
            );

            grad.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${currentAlpha})`);
            grad.addColorStop(0.55, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${currentAlpha * 0.45})`);
            grad.addColorStop(1, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0)`);

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
            ctx.fill();
        }

        requestAnimationFrame(render);
    }

    render();
}

/* ==========================================================================
   2. PŁYNNE WYŁANIANIE ELEMENTÓW PODCZAS SCROLLOWANIA (SCROLL REVEAL)
   ========================================================================== */
function initScrollReveal() {
    const targets = document.querySelectorAll('.reveal-on-scroll, .reveal-scale');
    if (!targets.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    targets.forEach(el => observer.observe(el));
}

/* ==========================================================================
   3. NAWIGACJA MOBILNA I PŁYNNE PRZEWIJANIE
   ========================================================================== */
function initNavigation() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('flex');
            } else {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
            }
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
            });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '' || targetId === '#admin') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ==========================================================================
   4. SYSTEM REZERWACJI I KALENDARZ (WIZARD KROK PO KROKU)
   ZINTEGROWANY Z OFICJALNYM CENNIKIEM STUDIA
   ========================================================================== */
let bookingState = {
    step: 1,
    size: '1-4 cm [Cena startowa]',
    price: 'od 300 PLN',
    deposit: '100 - 200 PLN',
    placement: '',
    description: '',
    photos: [],
    selectedDate: null,
    selectedTime: null,
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    clientNotes: ''
};

function ensureInitialBookings() {
    let bookings = JSON.parse(localStorage.getItem('cegua_ink_bookings') || '[]');

    let hadSunday = false;
    bookings = bookings.filter(b => {
        if (!b.date) return false;
        const d = new Date(b.date);
        if (d.getDay() === 0) {
            hadSunday = true;
            return false;
        }
        return true;
    });

    if (bookings.length === 0) {
        bookings = [
            {
                id: 'CEG-DEMO1',
                createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
                size: '5-8 cm',
                price: 'od 400 PLN',
                placement: 'Wewnętrzna strona przedramienia',
                description: 'Delikatna linia, motyw botaniczny z małym napisem',
                date: '2026-10-15', // Czwartek (godziny pracy 10:00 - 17:00)
                time: '11:30',
                clientName: 'Patrycja Kowalska',
                clientPhone: '+48 600 123 456',
                clientEmail: 'patrycja@przyklad.pl',
                clientNotes: 'Konsultacja telefoniczna przeprowadzona, zadatek opłacony.',
                photos: [],
                status: 'Oczekująca'
            },
            {
                id: 'CEG-DEMO2',
                createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
                size: 'Sesja całodzienna',
                price: 'od 1400 PLN',
                placement: 'Ramię / bark',
                description: 'Autorski projekt geometryczny, cały dzień zarezerwowany',
                date: '2026-10-17', // Sobota (godziny pracy 10:00 - 15:00)
                time: '11:00',
                clientName: 'Tomasz Nowak',
                clientPhone: '+48 501 987 654',
                clientEmail: 'tomasz.n@poczta.pl',
                clientNotes: 'Zadatek 200 PLN zaksięgowany. Całodzienna sesja.',
                photos: [],
                status: 'Zaakceptowana'
            }
        ];
        localStorage.setItem('cegua_ink_bookings', JSON.stringify(bookings));
    } else if (hadSunday) {
        localStorage.setItem('cegua_ink_bookings', JSON.stringify(bookings));
    }

    return bookings;
}

function initBookingSystem() {
    ensureInitialBookings();
    setupStep1SizeSelection();
    setupStep2Placement();
    setupStep3Calendar();
    setupStep4FormSubmission();
    setupCennikQuickBookings();
    updateStepUI();
}

function updateStepUI() {
    for (let i = 1; i <= 4; i++) {
        const stepView = document.getElementById(`booking-step-${i}`);
        const stepIndicator = document.getElementById(`step-badge-${i}`);

        if (stepView) {
            if (i === bookingState.step) {
                stepView.classList.remove('hidden');
                stepView.classList.add('step-slide-in');
            } else {
                stepView.classList.add('hidden');
                stepView.classList.remove('step-slide-in');
            }
        }

        if (stepIndicator) {
            if (i === bookingState.step) {
                stepIndicator.className = 'w-9 h-9 rounded-full bg-[#0f0f12] text-white flex items-center justify-center font-bold text-sm shadow-md transition-all';
                stepIndicator.innerHTML = i;
            } else if (i < bookingState.step) {
                stepIndicator.className = 'w-9 h-9 rounded-full bg-[#baaa98] text-white flex items-center justify-center font-bold text-sm transition-all';
                stepIndicator.innerHTML = '✔';
            } else {
                stepIndicator.className = 'w-9 h-9 rounded-full bg-neutral-100 text-neutral-400 border border-neutral-200 flex items-center justify-center font-bold text-sm transition-all';
                stepIndicator.innerHTML = i;
            }
        }
    }

    if (bookingState.step > 1) {
        const container = document.getElementById('rezerwacja');
        if (container) {
            const rect = container.getBoundingClientRect();
            if (rect.top < 0 || rect.top > 250) {
                window.scrollTo({
                    top: window.pageYOffset + rect.top - 80,
                    behavior: 'smooth'
                });
            }
        }
    }
}

function goToStep(stepNumber) {
    if (stepNumber < 1 || stepNumber > 4) return;
    bookingState.step = stepNumber;
    updateStepUI();
}

// Funkcja wybierająca rozmiar z sekcji Cennika i przewijająca do formularza
function setupCennikQuickBookings() {
    document.querySelectorAll('.cennik-select-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSize = btn.dataset.size;
            const targetPrice = btn.dataset.price;

            if (targetSize) {
                bookingState.size = targetSize;
                bookingState.price = targetPrice || '';

                // Zaznacz kartę rozmiaru w formularzu
                document.querySelectorAll('.booking-size-btn').forEach(b => {
                    const check = b.querySelector('.card-check');
                    const subPrice = b.querySelector('.size-btn-price');
                    if (b.dataset.size === targetSize) {
                        b.classList.add('bg-[#0f0f12]', 'text-white', 'border-[#0f0f12]');
                        b.classList.remove('bg-white', 'text-neutral-800', 'border-neutral-200');
                        if (check) check.classList.remove('hidden');
                        if (subPrice) {
                            subPrice.classList.remove('text-[#0f0f12]');
                            subPrice.classList.add('text-[#baaa98]');
                        }
                    } else {
                        b.classList.remove('bg-[#0f0f12]', 'text-white', 'border-[#0f0f12]');
                        b.classList.add('bg-white', 'text-neutral-800', 'border-neutral-200');
                        if (check) check.classList.add('hidden');
                        if (subPrice) {
                            subPrice.classList.remove('text-[#baaa98]');
                            subPrice.classList.add('text-[#0f0f12]');
                        }
                    }
                });
            }

            goToStep(1);
            const container = document.getElementById('rezerwacja');
            if (container) {
                const offset = 80;
                const elementPosition = container.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });
}

function setupStep1SizeSelection() {
    const sizeBtns = document.querySelectorAll('.booking-size-btn');
    sizeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sizeBtns.forEach(b => {
                b.classList.remove('bg-[#0f0f12]', 'text-white', 'border-[#0f0f12]');
                b.classList.add('bg-white', 'text-neutral-800', 'border-neutral-200');
                const subPrice = b.querySelector('.size-btn-price');
                if (subPrice) {
                    subPrice.classList.remove('text-[#baaa98]');
                    subPrice.classList.add('text-[#0f0f12]');
                }
                const check = b.querySelector('.card-check');
                if (check) check.classList.add('hidden');
            });

            btn.classList.add('bg-[#0f0f12]', 'text-white', 'border-[#0f0f12]');
            btn.classList.remove('bg-white', 'text-neutral-800', 'border-neutral-200');
            const activePrice = btn.querySelector('.size-btn-price');
            if (activePrice) {
                activePrice.classList.remove('text-[#0f0f12]');
                activePrice.classList.add('text-[#baaa98]');
            }
            const activeCheck = btn.querySelector('.card-check');
            if (activeCheck) activeCheck.classList.remove('hidden');

            bookingState.size = btn.dataset.size || '1-4 cm [Cena startowa]';
            bookingState.price = btn.dataset.price || 'od 300 PLN';
        });
    });

    const nextBtn = document.getElementById('step-1-next');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => goToStep(2));
    }
}

function setupStep2Placement() {
    const placementInput = document.getElementById('tattoo-placement');
    const descInput = document.getElementById('tattoo-description');
    const dropzone = document.getElementById('inspiration-dropzone');
    const fileInput = document.getElementById('inspiration-file-input');

    const backBtn = document.getElementById('step-2-back');
    const nextBtn = document.getElementById('step-2-next');

    if (dropzone && fileInput) {
        dropzone.addEventListener('click', (e) => {
            if (e.target.tagName !== 'BUTTON' && !e.target.closest('button')) {
                fileInput.click();
            }
        });

        fileInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files.length > 0) {
                handlePhotoFiles(e.target.files);
                fileInput.value = '';
            }
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            dropzone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropzone.classList.add('border-[#BAAA98]', 'bg-[#F5EFE9]/70');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropzone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropzone.classList.remove('border-[#BAAA98]', 'bg-[#F5EFE9]/70');
            }, false);
        });

        dropzone.addEventListener('drop', (e) => {
            if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                handlePhotoFiles(e.dataTransfer.files);
            }
        }, false);
    }

    if (backBtn) backBtn.addEventListener('click', () => goToStep(1));

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (placementInput) bookingState.placement = placementInput.value.trim();
            if (descInput) bookingState.description = descInput.value.trim();

            if (!bookingState.placement) {
                alert('Prosimy podać preferowane miejsce na ciele (np. przedramię, żebra, nadgarstek).');
                placementInput.focus();
                return;
            }
            goToStep(3);
        });
    }
}

function handlePhotoFiles(fileList) {
    if (!bookingState.photos) bookingState.photos = [];
    const remainingSlots = 3 - bookingState.photos.length;

    if (remainingSlots <= 0) {
        alert('Osiągnięto limit 3 załączonych zdjęć.');
        return;
    }

    const filesToAdd = Array.from(fileList).slice(0, remainingSlots);

    filesToAdd.forEach(file => {
        if (!file.type.startsWith('image/')) {
            alert(`Plik "${file.name}" nie jest prawidłowym obrazem (dozwolone są pliki graficzne JPG, PNG, WEBP).`);
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert(`Plik "${file.name}" przekracza maksymalny rozmiar 5 MB.`);
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 800;
                const MAX_HEIGHT = 800;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                
                const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
                const approxSizeKb = Math.round((dataUrl.length * (3/4)) / 1024);

                bookingState.photos.push({
                    name: file.name,
                    size: approxSizeKb + ' KB (kompresja)',
                    dataUrl: dataUrl
                });
                renderUploadedPhotos();
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
}

function renderUploadedPhotos() {
    const previewContainer = document.getElementById('uploaded-files-preview');
    if (!previewContainer) return;

    previewContainer.innerHTML = '';

    if (!bookingState.photos || bookingState.photos.length === 0) {
        return;
    }

    bookingState.photos.forEach((photo, idx) => {
        const item = document.createElement('div');
        item.className = 'relative flex items-center p-2 rounded-xl bg-white border border-[#E8E2DA] shadow-sm gap-2.5';
        item.innerHTML = `
            <img src="${photo.dataUrl}" alt="${photo.name}" class="w-12 h-12 rounded-lg object-cover border border-neutral-100 flex-shrink-0">
            <div class="flex-1 min-w-0 pr-6">
                <p class="text-xs font-bold text-neutral-800 truncate">${photo.name}</p>
                <p class="text-[11px] text-[#8C827A]">${photo.size}</p>
            </div>
            <button type="button" class="absolute top-2 right-2 w-6 h-6 rounded-full bg-neutral-100 hover:bg-rose-100 text-neutral-400 hover:text-rose-600 flex items-center justify-center transition" title="Usuń plik">
                ✕
            </button>
        `;

        item.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation();
            removeUploadedPhoto(idx);
        });

        previewContainer.appendChild(item);
    });
}

function removeUploadedPhoto(index) {
    if (bookingState.photos && bookingState.photos[index]) {
        bookingState.photos.splice(index, 1);
        renderUploadedPhotos();
    }
}

let currentCalMonth = new Date().getMonth();
let currentCalYear = new Date().getFullYear();

function setupStep3Calendar() {
    renderCalendar();

    const prevBtn = document.getElementById('cal-prev-month');
    const nextBtn = document.getElementById('cal-next-month');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentCalMonth--;
            if (currentCalMonth < 0) {
                currentCalMonth = 11;
                currentCalYear--;
            }
            renderCalendar();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentCalMonth++;
            if (currentCalMonth > 11) {
                currentCalMonth = 0;
                currentCalYear++;
            }
            renderCalendar();
        });
    }

    const backBtn = document.getElementById('step-3-back');
    const nextBtnStep = document.getElementById('step-3-next');

    if (backBtn) backBtn.addEventListener('click', () => goToStep(2));

    if (nextBtnStep) {
        nextBtnStep.addEventListener('click', () => {
            if (!bookingState.selectedDate) {
                alert('Prosimy wybrać dzień z kalendarza.');
                return;
            }
            const avail = getDayAvailability(bookingState.selectedDate);
            if (avail === 'full') {
                alert('Wszystkie godziny w wybranym dniu są już zajęte. Prosimy wybrać termin oznaczony na zielono lub żółto.');
                return;
            }
            if (!bookingState.selectedTime) {
                alert('Prosimy wybrać dostępną godzinę wizyty.');
                return;
            }
            const booked = getBookedSlotsForDate(bookingState.selectedDate);
            if (booked.includes(bookingState.selectedTime)) {
                alert('Wybrana godzina została już zajęta. Prosimy wybrać inną wolną godzinę.');
                return;
            }
            updateSummaryView();
            goToStep(4);
        });
    }
}

const MONTH_NAMES_PL = [
    'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
    'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
];

function getTimeSlotsForDate(dateStr) {
    if (!dateStr) return [];
    const parts = dateStr.split('-');
    const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    const dayOfWeek = d.getDay();
    if (dayOfWeek === 0) return []; // Niedziela: zamknięte
    if (dayOfWeek === 6) {
        // Sobota: 10:00 - 15:00
        return ['10:00', '11:30', '13:00', '14:00'];
    }
    // Pon-Pt: 10:00 - 17:00
    return ['10:00', '11:30', '13:00', '14:30', '16:00'];
}

function getBookedSlotsForDate(dateStr) {
    const bookings = JSON.parse(localStorage.getItem('cegua_ink_bookings') || '[]');
    const booked = [];
    const allSlots = getTimeSlotsForDate(dateStr);

    bookings.forEach(b => {
        if (b.date === dateStr && b.status !== 'Odrzucona') {
            if (b.size && b.size.toLowerCase().includes('całodzienna')) {
                allSlots.forEach(s => {
                    if (!booked.includes(s)) booked.push(s);
                });
            } else if (b.time) {
                if (!booked.includes(b.time)) booked.push(b.time);
            }
        }
    });

    return booked;
}

function getDayAvailability(dateStr) {
    const allSlots = getTimeSlotsForDate(dateStr);
    if (!allSlots || allSlots.length === 0) return 'closed';
    const bookedSlots = getBookedSlotsForDate(dateStr);
    if (bookedSlots.length >= allSlots.length) return 'full';    // Wszystkie zajęte -> Czerwony przekreślony
    if (bookedSlots.length > 0) return 'partial';              // Ostatnie godziny -> Żółty
    return 'free';                                             // Wolny dzień -> Zielony
}

function renderCalendar() {
    const monthTitle = document.getElementById('cal-month-title');
    const daysContainer = document.getElementById('cal-days-grid');
    if (!monthTitle || !daysContainer) return;

    monthTitle.innerText = `${MONTH_NAMES_PL[currentCalMonth]} ${currentCalYear}`;
    daysContainer.innerHTML = '';

    const firstDayIndex = (new Date(currentCalYear, currentCalMonth, 1).getDay() + 6) % 7;
    const totalDaysInMonth = new Date(currentCalYear, currentCalMonth + 1, 0).getDate();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < firstDayIndex; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'h-10 sm:h-12';
        daysContainer.appendChild(emptyCell);
    }

    for (let day = 1; day <= totalDaysInMonth; day++) {
        const cellDate = new Date(currentCalYear, currentCalMonth, day);
        const dayOfWeek = cellDate.getDay();

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.innerText = day;
        btn.className = 'calendar-day-btn h-10 sm:h-12 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center border transition-all ';

        const isPast = cellDate < today;
        const isSunday = (dayOfWeek === 0);

        if (isPast || isSunday) {
            btn.disabled = true;
            btn.className += 'text-neutral-300 border-transparent bg-transparent cursor-not-allowed';
            if (isSunday) {
                btn.title = 'Niedziela: Zamknięte';
            }
        } else {
            const dateStr = `${currentCalYear}-${String(currentCalMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const avail = getDayAvailability(dateStr);
            const isSelected = (bookingState.selectedDate === dateStr);

            if (isSelected) {
                btn.className += 'selected selected-day border-[#0f0f12] bg-[#0f0f12] text-white shadow-md ';
            } else if (avail === 'full') {
                // Zajęty dzień: przekreślony na czerwono, zablokowany przed kliknięciem!
                btn.disabled = true;
                btn.className += 'cal-day-full cursor-not-allowed ';
                btn.title = 'Wszystkie godziny w tym dniu są już zajęte';
            } else if (avail === 'partial') {
                // Ostatnie godziny: zaznaczony na żółto!
                btn.className += 'cal-day-partial ';
                btn.title = 'Ostatnie wolne godziny na ten dzień';
            } else {
                // Wolny dzień: zielony
                btn.className += 'cal-day-free ';
                btn.title = 'Dostępne wolne terminy';
            }

            if (cellDate.getTime() === today.getTime() && !isSelected) {
                btn.classList.add('today-indicator');
            }

            if (avail !== 'full') {
                btn.addEventListener('click', () => {
                    bookingState.selectedDate = dateStr;
                    bookingState.selectedTime = null;
                    renderCalendar();
                    renderTimeSlots(dayOfWeek);
                });
            }
        }

        daysContainer.appendChild(btn);
    }
}

function renderTimeSlots(dayOfWeek) {
    const slotsContainer = document.getElementById('cal-time-slots-container');
    const slotsGrid = document.getElementById('cal-time-slots-grid');
    const selectedDateDisplay = document.getElementById('selected-date-display');

    if (!slotsContainer || !slotsGrid) return;

    slotsContainer.classList.remove('hidden');
    if (selectedDateDisplay) {
        selectedDateDisplay.innerText = bookingState.selectedDate;
    }

    slotsGrid.innerHTML = '';

    if (dayOfWeek === 0) {
        slotsGrid.innerHTML = '<div class="col-span-full p-4 rounded-xl bg-neutral-100 text-neutral-600 text-center text-xs font-semibold">Niedziela: Studio CEGUA ink jest zamknięte. Prosimy wybrać termin w dniach roboczych (Poniedziałek – Sobota).</div>';
        return;
    }

    const allSlots = getTimeSlotsForDate(bookingState.selectedDate);
    const bookedSlots = getBookedSlotsForDate(bookingState.selectedDate);
    const isAllBooked = (allSlots.length > 0 && bookedSlots.length >= allSlots.length);

    if (isAllBooked) {
        slotsGrid.innerHTML = `
            <div class="col-span-full p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-center text-xs font-bold">
                Wszystkie godziny na dzień <strong>${bookingState.selectedDate}</strong> są już zajęte. Prosimy wybrać inny termin oznaczony na zielono lub żółto.
            </div>
        `;
        return;
    }

    if (bookedSlots.length > 0) {
        const remainingCount = allSlots.length - bookedSlots.length;
        const alertBox = document.createElement('div');
        alertBox.className = 'col-span-full mb-1 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold flex items-center justify-between';
        alertBox.innerHTML = `
            <span class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                <span>Ostatnie wolne godziny na ten dzień (wolnych: <strong>${remainingCount}</strong>)!</span>
            </span>
            <span class="text-[11px] text-amber-700 hidden sm:inline">Wybierz godzinę poniżej:</span>
        `;
        slotsGrid.appendChild(alertBox);
    }

    allSlots.forEach(time => {
        const isBooked = bookedSlots.includes(time);
        const isSelected = (bookingState.selectedTime === time);

        const btn = document.createElement('button');
        btn.type = 'button';

        if (isBooked) {
            btn.disabled = true;
            btn.className = 'time-slot-btn py-3 px-3 rounded-xl text-xs font-bold border border-rose-200 bg-rose-50 text-rose-400 cursor-not-allowed line-through flex items-center justify-between opacity-60';
            btn.innerHTML = `<span>${time}</span><span class="text-[9px] uppercase font-bold no-underline text-rose-600 bg-rose-100 px-1.5 py-0.5 rounded">Zajęty</span>`;
        } else {
            let cls = 'time-slot-btn py-3 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-between ';
            if (isSelected) {
                cls += 'selected bg-[#0f0f12] text-white border-[#0f0f12] shadow-md';
                btn.innerHTML = `<span>${time}</span><span class="text-[9px] uppercase font-extrabold text-[#baaa98]">Wybrana</span>`;
            } else {
                cls += 'border-emerald-200 bg-emerald-50/70 text-emerald-900 hover:border-emerald-500 hover:bg-emerald-100';
                btn.innerHTML = `<span>${time}</span><span class="text-[9px] font-semibold text-emerald-700">Wolna</span>`;
            }
            btn.className = cls;

            btn.addEventListener('click', () => {
                bookingState.selectedTime = time;
                renderTimeSlots(dayOfWeek);
            });
        }

        slotsGrid.appendChild(btn);
    });
}

function updateSummaryView() {
    const sumSize = document.getElementById('sum-size');
    const sumPrice = document.getElementById('sum-price');
    const sumPlacement = document.getElementById('sum-placement');
    const sumDateTime = document.getElementById('sum-datetime');
    const sumPhotos = document.getElementById('sum-photos');

    if (sumSize) sumSize.innerText = bookingState.size;
    if (sumPrice) sumPrice.innerText = bookingState.price || 'od 300 PLN';
    if (sumPlacement) sumPlacement.innerText = bookingState.placement || 'Brak danych';
    if (sumDateTime) sumDateTime.innerText = `${bookingState.selectedDate} o godz. ${bookingState.selectedTime}`;

    if (sumPhotos) {
        const count = bookingState.photos ? bookingState.photos.length : 0;
        sumPhotos.innerText = count > 0 ? `${count} ${count === 1 ? 'plik (inspiracja)' : 'pliki (inspiracje)'}` : 'Brak (opcjonalnie)';
    }
}

function setupStep4FormSubmission() {
    const backBtn = document.getElementById('step-4-back');
    const submitBtn = document.getElementById('step-4-submit');

    if (backBtn) backBtn.addEventListener('click', () => goToStep(3));

    if (submitBtn) {
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('client-name');
            const phoneInput = document.getElementById('client-phone');
            const emailInput = document.getElementById('client-email');
            const notesInput = document.getElementById('client-notes');

            const name = nameInput ? nameInput.value.trim() : '';
            const phone = phoneInput ? phoneInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const notes = notesInput ? notesInput.value.trim() : '';

            if (!name) {
                alert('Prosimy podać imię i nazwisko.');
                nameInput.focus();
                return;
            }

            if (!phone || phone.length < 7) {
                alert('Prosimy podać poprawny numer telefonu do kontaktu.');
                phoneInput.focus();
                return;
            }

            bookingState.clientName = name;
            bookingState.clientPhone = phone;
            bookingState.clientEmail = email;
            bookingState.clientNotes = notes;

            saveBookingToLocalStorage(bookingState);
            showBookingConfirmationModal(bookingState);

            if (typeof renderAdminDashboardRows === 'function') {
                renderAdminDashboardRows();
            }
        });
    }
}

function saveBookingToLocalStorage(data) {
    const bookings = JSON.parse(localStorage.getItem('cegua_ink_bookings') || '[]');
    const newEntry = {
        id: 'CEG-' + Date.now().toString(36).toUpperCase(),
        createdAt: new Date().toISOString(),
        size: data.size,
        price: data.price,
        placement: data.placement,
        description: data.description,
        photos: data.photos || [],
        date: data.selectedDate,
        time: data.selectedTime,
        clientName: data.clientName,
        clientPhone: data.clientPhone,
        clientEmail: data.clientEmail,
        clientNotes: data.clientNotes,
        status: 'Oczekująca'
    };

    bookings.unshift(newEntry);
    localStorage.setItem('cegua_ink_bookings', JSON.stringify(bookings));
    renderCalendar();
    return newEntry;
}

function showBookingConfirmationModal(data) {
    const modal = document.getElementById('confirmation-modal');
    if (!modal) {
        alert(`Dziękujemy ${data.clientName}! Twoja prośba o termin (${data.selectedDate} o ${data.selectedTime}) została zapisana.`);
        return;
    }

    const confName = document.getElementById('conf-name');
    const confDate = document.getElementById('conf-datetime');
    const confSize = document.getElementById('conf-size');
    const confStyle = document.getElementById('conf-style');
    const confPrice = document.getElementById('conf-price');
    const confPhotos = document.getElementById('conf-photos');

    if (confName) confName.innerText = data.clientName;
    if (confDate) confDate.innerText = `${data.selectedDate} o godz. ${data.selectedTime}`;
    if (confSize) confSize.innerText = data.size;
    if (confStyle) confStyle.innerText = data.size;
    if (confPrice) confPrice.innerText = `${data.price} (Zadatek: 100-200 zł)`;
    if (confPhotos) {
        const count = data.photos ? data.photos.length : 0;
        confPhotos.innerText = count > 0 ? `${count} ${count === 1 ? 'załączone zdjęcie' : 'załączonych zdjęć'}` : 'Brak załączników';
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');

    const closeBtn = document.getElementById('conf-close-btn');
    if (closeBtn) {
        closeBtn.onclick = () => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            bookingState.step = 1;
            bookingState.selectedDate = null;
            bookingState.selectedTime = null;
            bookingState.photos = [];
            const placementInput = document.getElementById('tattoo-placement');
            const descInput = document.getElementById('tattoo-description');
            if (placementInput) placementInput.value = '';
            if (descInput) descInput.value = '';
            renderUploadedPhotos();
            updateStepUI();
        };
    }
}

/* ==========================================================================
   5. OSOBNY WIDOK PANELU ADMINA (NAWIGACJA Z HASHA #admin I STOPKI)
   ========================================================================== */
function checkAdminRoute() {
    const isAdmin = window.location.hash === '#admin';
    const mainView = document.getElementById('main-content-view');
    const adminView = document.getElementById('admin-view-container');

    if (isAdmin) {
        if (mainView) mainView.classList.add('hidden');
        if (adminView) {
            adminView.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });

            if (sessionStorage.getItem('cegua_admin_logged') === 'true') {
                document.getElementById('admin-login-box')?.classList.add('hidden');
                document.getElementById('admin-dashboard-content')?.classList.remove('hidden');
            } else {
                document.getElementById('admin-login-box')?.classList.remove('hidden');
                document.getElementById('admin-dashboard-content')?.classList.add('hidden');
            }
            renderAdminDashboardRows();
        }
    } else {
        if (mainView) mainView.classList.remove('hidden');
        if (adminView) adminView.classList.add('hidden');
    }
}

function navigateToAdmin() {
    window.location.hash = '#admin';
    checkAdminRoute();
}

function navigateToSite() {
    window.location.hash = '';
    checkAdminRoute();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('hashchange', checkAdminRoute);

function initAdminSystem() {
    const loginBtn = document.getElementById('admin-login-btn');
    const logoutBtn = document.getElementById('admin-logout-btn');
    const passInput = document.getElementById('admin-password');
    const errorMsg = document.getElementById('admin-login-error');

    if (loginBtn) {
        loginBtn.addEventListener('click', handleAdminLogin);
    }

    if (passInput) {
        passInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') handleAdminLogin();
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem('cegua_admin_logged');
            document.getElementById('admin-login-box')?.classList.remove('hidden');
            document.getElementById('admin-dashboard-content')?.classList.add('hidden');
        });
    }

    function handleAdminLogin() {
        const pass = passInput ? passInput.value.trim() : '';
        if (pass === 'admin123' || pass === 'cegua' || pass === 'ceguaink') {
            sessionStorage.setItem('cegua_admin_logged', 'true');
            if (errorMsg) errorMsg.classList.add('hidden');
            if (passInput) passInput.value = '';
            document.getElementById('admin-login-box')?.classList.add('hidden');
            document.getElementById('admin-dashboard-content')?.classList.remove('hidden');
            renderAdminDashboardRows();
        } else {
            if (errorMsg) {
                errorMsg.classList.remove('hidden');
                errorMsg.innerText = 'Nieprawidłowe hasło dostępu (spróbuj: admin123)';
            }
        }
    }

    const filterTabs = document.querySelectorAll('.admin-filter-tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => {
                t.classList.remove('bg-[#0f0f12]', 'text-white');
                t.classList.add('bg-white', 'text-neutral-700', 'border-neutral-200');
            });
            tab.classList.add('bg-[#0f0f12]', 'text-white');
            tab.classList.remove('bg-white', 'text-neutral-700');

            const filterVal = tab.dataset.filter || 'all';
            renderAdminDashboardRows(filterVal);
        });
    });

    const exportBtn = document.getElementById('admin-export-csv');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportBookingsToCSV);
    }
}

function renderAdminDashboardRows(filter = 'all') {
    const tableBody = document.getElementById('admin-table-body');
    const emptyState = document.getElementById('admin-empty-state');
    const totalCountBadge = document.getElementById('admin-total-count');
    const pendingCountBadge = document.getElementById('admin-pending-count');

    if (!tableBody) return;

    let bookings = ensureInitialBookings();

    if (totalCountBadge) totalCountBadge.innerText = bookings.length;
    if (pendingCountBadge) {
        const pendingNum = bookings.filter(b => b.status === 'Oczekująca').length;
        pendingNum > 0 ? pendingCountBadge.innerText = `${pendingNum} oczekujących` : pendingCountBadge.innerText = 'Brak oczekujących';
    }

    let filtered = bookings;
    if (filter === 'pending') {
        filtered = bookings.filter(b => b.status === 'Oczekująca');
    } else if (filter === 'accepted') {
        filtered = bookings.filter(b => b.status === 'Zaakceptowana');
    }

    tableBody.innerHTML = '';

    if (filtered.length === 0) {
        if (emptyState) emptyState.classList.remove('hidden');
        return;
    } else {
        if (emptyState) emptyState.classList.add('hidden');
    }

    filtered.forEach(item => {
        const tr = document.createElement('tr');
        tr.className = 'border-b border-neutral-100 hover:bg-neutral-50/70 transition-colors';

        let badgeClass = 'bg-amber-50 text-amber-800 border-amber-200';
        if (item.status === 'Zaakceptowana') badgeClass = 'bg-emerald-50 text-emerald-800 border-emerald-200';
        if (item.status === 'Odrzucona') badgeClass = 'bg-rose-50 text-rose-800 border-rose-200';

        tr.innerHTML = `
            <td class="p-4 font-mono text-xs text-neutral-500 font-semibold">${item.id}</td>
            <td class="p-4">
                <div class="font-bold text-neutral-900">${item.clientName}</div>
                <div class="text-xs text-neutral-500 font-mono mt-0.5">${item.clientPhone}</div>
                ${item.clientEmail ? `<div class="text-xs text-neutral-400">${item.clientEmail}</div>` : ''}
            </td>
            <td class="p-4">
                <div class="flex items-center gap-2 mb-1">
                    <span class="text-xs font-bold text-neutral-900 bg-neutral-100 px-2.5 py-0.5 rounded">
                        ${item.price || 'Wycena'}
                    </span>
                    <span class="text-xs font-extrabold text-[#6E5E4E]">
                        ${item.size || 'Format'}
                    </span>
                </div>
                <div class="text-xs text-neutral-600 font-medium">${item.placement || 'Brak miejsca'}</div>
                ${item.description ? `<div class="text-xs text-neutral-500 mt-1"><span class="font-medium text-neutral-700">Opis:</span> ${item.description}</div>` : ''}
                ${item.clientNotes ? `<div class="text-xs text-neutral-400 italic mt-1 max-w-xs truncate" title="${item.clientNotes}">"${item.clientNotes}"</div>` : ''}
                ${item.photos && item.photos.length > 0 ? `
                    <div class="mt-2 flex items-center gap-1.5 flex-wrap">
                        <span class="text-[10px] font-bold text-neutral-600 bg-neutral-100 border border-neutral-200 px-1.5 py-0.5 rounded">
                            📷 ${item.photos.length} ${item.photos.length === 1 ? 'zdjęcie' : 'zdjęcia'}
                        </span>
                        ${item.photos.map(p => `
                            <a href="${p.dataUrl}" target="_blank" title="${p.name} (${p.size})" class="inline-block w-8 h-8 rounded-lg border border-neutral-200 overflow-hidden hover:opacity-80 transition shadow-xs">
                                <img src="${p.dataUrl}" alt="${p.name}" class="w-full h-full object-cover">
                            </a>
                        `).join('')}
                    </div>
                ` : ''}
            </td>
            <td class="p-4 whitespace-nowrap">
                <div class="font-bold text-neutral-800">${item.date}</div>
                <div class="text-xs text-neutral-500 font-medium">godz. ${item.time}</div>
            </td>
            <td class="p-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeClass}">
                    ${item.status}
                </span>
            </td>
            <td class="p-4 text-right whitespace-nowrap">
                <div class="flex items-center justify-end space-x-2">
                    <button class="status-btn-accept p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition" title="Zaakceptuj">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    </button>
                    <button class="status-btn-reject p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition" title="Odrzuć">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                    <button class="status-btn-delete p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition" title="Usuń z bazy">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </div>
            </td>
        `;

        tr.querySelector('.status-btn-accept').onclick = () => updateBookingStatus(item.id, 'Zaakceptowana');
        tr.querySelector('.status-btn-reject').onclick = () => updateBookingStatus(item.id, 'Odrzucona');
        tr.querySelector('.status-btn-delete').onclick = () => deleteBooking(item.id);

        tableBody.appendChild(tr);
    });
}

function updateBookingStatus(id, newStatus) {
    const bookings = JSON.parse(localStorage.getItem('cegua_ink_bookings') || '[]');
    const target = bookings.find(b => b.id === id);
    if (target) {
        target.status = newStatus;
        localStorage.setItem('cegua_ink_bookings', JSON.stringify(bookings));
        renderAdminDashboardRows();
        renderCalendar();
    }
}

function deleteBooking(id) {
    customConfirm('Czy na pewno chcesz usunąć tę rezerwację z bazy?', 'Usuwanie rezerwacji', () => {
        let bookings = JSON.parse(localStorage.getItem('cegua_ink_bookings') || '[]');
        bookings = bookings.filter(b => b.id !== id);
        localStorage.setItem('cegua_ink_bookings', JSON.stringify(bookings));
        renderAdminDashboardRows();
        renderCalendar();
    });
}

function exportBookingsToCSV() {
    const bookings = JSON.parse(localStorage.getItem('cegua_ink_bookings') || '[]');
    if (bookings.length === 0) {
        alert('Brak rezerwacji do wyeksportowania.');
        return;
    }

    const headers = ['ID', 'Data_Zgloszenia', 'Imie_Nazwisko', 'Telefon', 'Email', 'Styl', 'Rozmiar', 'Cena_Szacunkowa', 'Miejsce', 'Data_Wizyty', 'Godzina', 'Status', 'Notatki'];
    const rows = bookings.map(b => [
        `"${b.id}"`,
        `"${b.createdAt}"`,
        `"${b.clientName.replace(/"/g, '""')}"`,
        `"${b.clientPhone}"`,
        `"${b.clientEmail || ''}"`,
        `"${b.style}"`,
        `"${b.size}"`,
        `"${b.price || ''}"`,
        `"${(b.placement || '').replace(/"/g, '""')}"`,
        `"${b.date}"`,
        `"${b.time}"`,
        `"${b.status}"`,
        `"${(b.clientNotes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `rezerwacje_cegua_ink_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/* ==========================================================================
   6. LIGHTBOX DLA GALERII PORTFOLIO
   ========================================================================== */
function initPortfolioLightbox() {
    const modal = document.getElementById('portfolio-lightbox');
    const modalImg = document.getElementById('lightbox-image');
    const modalTitle = document.getElementById('lightbox-title');
    const modalTag = document.getElementById('lightbox-tag');
    const closeBtn = document.getElementById('lightbox-close');

    if (!modal || !modalImg) return;

    document.querySelectorAll('.portfolio-card-wrap').forEach(card => {
        card.addEventListener('click', () => {
            const img = card.querySelector('img');
            const title = card.dataset.title || 'Tatuaż CEGUA ink';
            const tag = card.dataset.tag || 'Fineline';

            if (img) {
                modalImg.src = img.src;
                if (modalTitle) modalTitle.innerText = title;
                if (modalTag) modalTag.innerText = tag;
                modal.classList.remove('hidden');
                modal.classList.add('flex');
            }
        });
    });

    const closeModal = () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    };

    if (closeBtn) closeBtn.onclick = closeModal;

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('lightbox-backdrop')) {
            closeModal();
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
}

/* ==========================================================================
   7. AKORDEON FAQ (ZAMYKA INNE PRZY OTWARCIU)
   ========================================================================== */
function initFaqAccordion() {
    const allDetails = document.querySelectorAll('#faq details');
    allDetails.forEach(targetDetail => {
        targetDetail.addEventListener('toggle', () => {
            if (targetDetail.open) {
                allDetails.forEach(otherDetail => {
                    if (otherDetail !== targetDetail && otherDetail.open) {
                        otherDetail.open = false;
                    }
                });
            }
        });
    });
}

/* ==========================================================================
   8. SZYBKI POPUP KONTAKTOWY
   ========================================================================== */
function initContactModal() {
    const openBtns = document.querySelectorAll('.open-contact-modal-btn');
    const modal = document.getElementById('contact-info-modal');
    const closeBtn = document.getElementById('contact-modal-close');

    if (!modal) return;

    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        });
    });

    const closeModal = () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    };

    if (closeBtn) closeBtn.onclick = closeModal;

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('contact-backdrop')) {
            closeModal();
        }
    });
}

/* ==========================================================================
   9. UNIWERSALNY SYSTEM MODALI I KONTAKT W SPRAWIE STRONY (NETJES / WŁAŚCICIEL)
   ========================================================================== */
function showCustomModal({ title, message, type = 'info', confirmText = 'OK', cancelText = null, onConfirm = null, onCancel = null }) {
    const backdrop = document.getElementById('custom-modal-backdrop');
    const card = document.getElementById('custom-modal-card');
    const iconContainer = document.getElementById('custom-modal-icon-container');
    const titleEl = document.getElementById('custom-modal-title');
    const bodyEl = document.getElementById('custom-modal-body');
    const confirmBtn = document.getElementById('custom-modal-confirm-btn');
    const cancelBtn = document.getElementById('custom-modal-cancel-btn');

    if (!backdrop || !card) return;

    if (titleEl) titleEl.innerHTML = title;
    if (bodyEl) bodyEl.innerHTML = message;
    if (confirmBtn) confirmBtn.innerHTML = confirmText;

    if (iconContainer) {
        if (type === 'success') {
            iconContainer.className = 'w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-xl shadow-md bg-emerald-50 text-emerald-600 border border-emerald-200';
            iconContainer.innerHTML = '<i class="fa-solid fa-check"></i>';
        } else if (type === 'error') {
            iconContainer.className = 'w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-xl shadow-md bg-rose-50 text-rose-600 border border-rose-200';
            iconContainer.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>';
        } else {
            iconContainer.className = 'w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-xl shadow-md bg-[#FAF8F5] text-[#BAAA98] border border-[#E8E2DA]';
            iconContainer.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i>';
        }
    }

    if (cancelBtn) {
        if (cancelText) {
            cancelBtn.innerText = cancelText;
            cancelBtn.classList.remove('hidden');
        } else {
            cancelBtn.classList.add('hidden');
        }
    }

    const closeModal = () => {
        card.classList.remove('scale-100', 'opacity-100');
        card.classList.add('scale-95', 'opacity-0');
        backdrop.classList.remove('opacity-100');
        backdrop.classList.add('opacity-0');
        setTimeout(() => {
            backdrop.classList.remove('flex');
            backdrop.classList.add('hidden');
        }, 300);
    };

    if (confirmBtn) {
        confirmBtn.onclick = () => {
            closeModal();
            if (onConfirm) onConfirm();
        };
    }
    if (cancelBtn) {
        cancelBtn.onclick = () => {
            closeModal();
            if (onCancel) onCancel();
        };
    }

    const closeBtn = document.getElementById('custom-modal-close-btn');
    if (closeBtn) closeBtn.onclick = closeModal;

    backdrop.classList.remove('hidden');
    backdrop.classList.add('flex');
    setTimeout(() => {
        backdrop.classList.remove('opacity-0');
        backdrop.classList.add('opacity-100');
        card.classList.remove('scale-95', 'opacity-0');
        card.classList.add('scale-100', 'opacity-100');
    }, 10);
}

function copyContactEmail(btn) {
    const email = 'kacperekwas1@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        if (btn) {
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-check text-emerald-600"></i> <span class="text-emerald-600">Skopiowano!</span>';
            setTimeout(() => {
                btn.innerHTML = originalHTML;
            }, 2000);
        }
    }).catch(() => {
        window.prompt('Skopiuj adres e-mail:', email);
    });
}

function openContactOwnerModal() {
    const content = `
        <div class="space-y-4">
            <p class="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                Chcesz wdrożyć nowoczesną stronę internetową z systemem rezerwacji online dla swojego salonu lub firmy? Skontaktuj się ze mną bezpośrednio:
            </p>
            <div class="p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#E8E2DA] flex items-center justify-center text-[#BAAA98] text-lg flex-shrink-0">
                        <i class="fa-solid fa-envelope"></i>
                    </div>
                    <div>
                        <div class="text-[11px] uppercase tracking-wider text-neutral-400 font-bold">Adres E-mail</div>
                        <a href="mailto:kacperekwas1@gmail.com" class="text-base sm:text-lg text-neutral-900 font-mono font-bold hover:text-[#BAAA98] transition select-all">kacperekwas1@gmail.com</a>
                    </div>
                </div>
                <div class="flex items-center gap-2 w-full sm:w-auto">
                    <button type="button" onclick="copyContactEmail(this)" class="flex-1 sm:flex-none px-3.5 py-2 rounded-lg bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-800 text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5 shadow-sm">
                        <i class="fa-regular fa-copy"></i> <span>Kopiuj</span>
                    </button>
                    <a href="mailto:kacperekwas1@gmail.com" class="flex-1 sm:flex-none px-3.5 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-1.5 shadow-sm">
                        <i class="fa-solid fa-paper-plane"></i> <span>Napisz</span>
                    </a>
                </div>
            </div>
            <p class="text-xs text-neutral-500 font-normal">
                Odpowiadam na wiadomości najczęściej w ciągu kilkunastu godzin. Chętnie omówię szczegóły i przygotuję indywidualną wycenę.
            </p>
        </div>
    `;

    showCustomModal({
        title: 'Skontaktuj Się w Sprawie Strony',
        message: content,
        type: 'info',
        confirmText: 'Zamknij'
    });
}

function openPrivacyModal() {
    const m = document.getElementById('privacy-modal');
    if (m) m.classList.remove('hidden');
}

function closePrivacyModal() {
    const m = document.getElementById('privacy-modal');
    if (m) m.classList.add('hidden');
}



