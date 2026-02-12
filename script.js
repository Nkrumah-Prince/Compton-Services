// === SERVICE SELECTION ===
function selectService(service){
  document.getElementById('serviceSelect').value = service;
  setPaymentLink();
  document.getElementById('payBtn').scrollIntoView({behavior:'smooth'});
}

// === SET PAYMENT LINK BASED ON SERVICE ===
function setPaymentLink() {
  const service = document.getElementById('serviceSelect').value;
  const payBtn = document.getElementById('payBtn');
  const links = {
    normal:'https://mtnmomo.com/pay/NORMAL123',
    practical:'https://mtnmomo.com/pay/PRACTICAL456',
    project:'https://mtnmomo.com/pay/PROJECT789',
    cv:'https://mtnmomo.com/pay/CV123',
    linkedin:'https://mtnmomo.com/pay/LINKEDIN123',
    windows:'https://mtnmomo.com/pay/WINDOWS123'
  };
  payBtn.href = links[service] || '#';
}

// === PAYMENT BUTTON CLICK ===
function markPaid(e){
  if(document.getElementById('payBtn').href === '#'){
    e.preventDefault();
    alert('Please select a service first.');
    return;
  }
  localStorage.setItem('paidClicked','yes');
  setTimeout(()=>{
    document.getElementById('confirmBtn').disabled = false;
  },500);
}

// === SEND BOOKING TO WHATSAPP ===
function sendToWhatsApp(e){
  e.preventDefault();

  if(localStorage.getItem('paidClicked') !== 'yes'){
    alert('Please complete payment first.');
    return;
  }

  const name = document.getElementById('name').value;
  const contact = document.getElementById('contact').value;
  const course = document.getElementById('course').value;
  const type = document.getElementById('type').value;
  const date = document.getElementById('date').value;
  const ref = document.getElementById('reference').value;
  const details = document.getElementById('details').value;

  const phoneNumber = '233550520858'; // Your WhatsApp number

  const msg = `Hello, I have PAID and want to confirm a booking.%0A%0A` +
              `Name: ${name}%0AContact: ${contact}%0ACourse/Service: ${course}%0A` +
              `Service Type: ${type}%0APreferred Date: ${date}%0A` +
              `Payment Reference: ${ref}%0A%0ADetails: ${details}`;

  window.open(`https://wa.me/${phoneNumber}?text=${msg}`, '_blank');
}
