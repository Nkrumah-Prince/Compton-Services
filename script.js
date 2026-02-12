// FLOATING WHATSAPP BUTTON
function openWhatsApp(){
  window.open('https://wa.me/233550520858?text=Hello! I have a question about your services.','_blank');
}

// AUTO SELECT SERVICE & PRICE
function selectService(service){
  document.getElementById('serviceSelect').value = service;
  setPaymentLink();
  document.getElementById('payBtn').scrollIntoView({behavior:'smooth'});
}

// SET PAYMENT LINK
function setPaymentLink(){
  const service = document.getElementById('serviceSelect').value;
  const payBtn = document.getElementById('payBtn');
  const links = {
    normal:'https://momo.com/pay/NORMAL123',
    practical:'https://momo.com/pay/PRACTICAL456',
    project:'https://momo.com/pay/PROJECT789',
    linkedin:'https://momo.com/pay/LINKEDIN101',
    cv:'https://momo.com/pay/CV102',
    windows:'https://momo.com/pay/WINDOWS103'
  };
  payBtn.href = links[service] || '#';
}

// MARK PAYMENT CLICKED
function markPaid(e){
  if(document.getElementById('payBtn').href === '#'){
    e.preventDefault();
    alert('Please select a service first.');
    return;
  }
  localStorage.setItem('paidClicked','yes');
  setTimeout(()=>{document.getElementById('confirmBtn').disabled=false;},500);
}

// SEND BOOKING TO WHATSAPP
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
  const phoneNumber = '233550520858';
  const msg = `Hello, I have PAID and want to confirm a booking.%0A%0A`+
              `Name: ${name}%0AContact: ${contact}%0ACourse: ${course}%0A`+
              `Assignment Type: ${type}%0APreferred Date: ${date}%0A`+
              `Payment Reference: ${ref}%0A%0ADetails: ${details}`;
  window.open(`https://wa.me/${phoneNumber}?text=${msg}`,'_blank');

  // SAVE TO DASHBOARD LOCAL STORAGE
  let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  bookings.push({name,contact,course,type,date,ref,details,status:'Pending'});
  localStorage.setItem('bookings', JSON.stringify(bookings));
}
