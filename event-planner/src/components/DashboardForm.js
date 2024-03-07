document.getElementById('dashboardForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const eventName = document.getElementById('eventName').value;
  const eventDate = document.getElementById('eventDate').value;
  const eventLocation = document.getElementById('eventLocation').value;

  const eventNameError = document.getElementById('eventNameError');
  const eventDateError = document.getElementById('eventDateError');
  const eventLocationError = document.getElementById('eventLocationError');

  let isValid = true;

  if (eventName === '') {
    eventNameError.textContent = 'Event name is required.';
    isValid = false;
  } else {
    eventNameError.textContent = '';
  }

  if (eventDate === '') {
    eventDateError.textContent = 'Event date is required.';
    isValid = false;
  } else {
    eventDateError.textContent = '';
  }

  if (eventLocation === '') {
    eventLocationError.textContent = 'Event location is required.';
    isValid = false;
  } else {
    eventLocationError.textContent = '';
  }

  if (isValid) {
    const output = document.getElementById('eventsTable');
    const row = output.insertRow(-1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);

    cell1.textContent = eventName;
    cell2.textContent = eventDate;
    cell3.textContent = eventLocation;
  }
});

document.getElementById('clearForm').addEventListener('click', function() {
  document.getElementById('eventName').value = '';
  document.getElementById('eventDate').value = '';
  document.getElementById('eventLocation').value = '';
});
