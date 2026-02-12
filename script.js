// Select a service from dropdown or cards
function selectService(service) {
    const serviceSelect = document.getElementById('serviceSelect');
    if(serviceSelect) {
        serviceSelect.value = service;
        setPaymentLink();
        document.getElementById('payBtn').scrollIntoView({behavior:'smooth'});
    }
}

// Set payment link according to service
function setPaymentLink() {
    const serviceSelect = document.getElementById('serviceSelect');
    if(!serviceSelect) return;

    const service = serviceSelect.value;
    const payBtn = document.getElementById('payBtn');
    const links = {
        normal: 'https://mtnmomo.com/pay/NORMAL123',
        practical: 'https://mtnmomo.com/pay/PRACTICAL456',
        project: 'https://mtnmomo.com/pay/PROJECT789',
        cv: 'https://mtnmomo.com/pay/CV123',
        linkedin: 'https://mtnmomo.com/pay/LINKEDIN123',
        windows: 'https://mtnmomo.com/pay/WINDOWS123'
    };
    if(payBtn) payBtn.href = links[service] || '#';
}

// Unlock confirm button after payment click
function markPaid(e) {
    const payBtn = document.getElementById('payBtn');
    if(!payBtn || payBtn.href === '#') {
        e.preventDefault();
        alert('Please select a service first.');
        return;
    }
    localStorage.setItem('paidClicked', 'yes');
    setTimeout(() => {
        const confirmBtn = document.getElementById('confirmBtn');
        if(confirmBtn) confirmBtn.disabled = false;
    }, 500);
}

// Send booking details via WhatsApp
function sendToWhatsApp(e) {
    e.preventDefault();
    if(localStorage.getItem('paidClicked') !== 'yes') {
        alert('Please complete payment first.');
        return;
    }

    const name = document.getElementById('name')?.value || '';
    const contact = document.getElementById('contact')?.value || '';
    const course = document.getElementById('course')?.value || '';
    const type = document.getElementById('type')?.value || '';
    const date = document.getElementById('date')?.value || '';
    const ref = document.getElementById('reference')?.value || '';
    const details = document.getElementById('details')?.value || '';

    const phoneNumber = '233550520858'; // Replace with your WhatsApp number

    const msg = `Hello, I have PAID and want to confirm a booking.%0A%0A` +
                `Name: ${name}%0AContact: ${contact}%0ACourse: ${course}%0A` +
                `Service Type: ${type}%0APreferred Date: ${date}%0A` +
                `Payment Reference: ${ref}%0A%0ADetails: ${details}`;

    window.open(`https://wa.me/${phoneNumber}?text=${msg}`, '_blank');
}
