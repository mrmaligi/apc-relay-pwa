document.addEventListener('DOMContentLoaded', function () {
    const passwordInput = document.getElementById('password');
     const phoneNumberInput = document.getElementById('phone-number')
    const savePasswordButton = document.getElementById('savePassword');
    const savePhoneButton = document.getElementById('savePhone')
    const relayToggleButton = document.getElementById('relay-toggle');
     const serialNumberInput = document.getElementById('serial-number');
     const newUserNumberInput = document.getElementById('new-number')
    const addUserButton = document.getElementById('add-user');
       const deleteSerialNumberInput = document.getElementById('delete-serial-number');
        const deleteUserButton = document.getElementById('delete-user');
     const relayModeToggle = document.getElementById('relay-mode')
     const confirmSmsToggle = document.getElementById('confirm-sms')
        const getStatusButton = document.getElementById('get-status')
         const getImeiButton = document.getElementById('get-imei')
    const messagesDiv = document.getElementById('messages');



    // Function to store password securely
function storePassword(password) {
  localStorage.setItem('relayPassword', password);
}

function storePhoneNumber(phoneNumber) {
     localStorage.setItem('relayPhoneNumber', phoneNumber);
}

function getPassword() {
     return localStorage.getItem('relayPassword');
}

function getPhoneNumber(){
    return localStorage.getItem('relayPhoneNumber');
}
  function getRelayMode() {
      return localStorage.getItem('relayMode') == "true";
    }

   function getConfirmSmsMode() {
      return localStorage.getItem('confirmSmsMode') == "true";
    }

function storeRelayMode(relayMode){
 localStorage.setItem('relayMode', relayMode);
}

function storeConfirmSmsMode(confirmSmsMode){
 localStorage.setItem('confirmSmsMode', confirmSmsMode);
}
  
    savePasswordButton.addEventListener('click', function () {
      const password = passwordInput.value;
      storePassword(password)
      displayMessage("Password Saved");
   });
    savePhoneButton.addEventListener('click', function(){
         const phoneNumber = phoneNumberInput.value;
          storePhoneNumber(phoneNumber);
         displayMessage("Phone Number Saved");
    });

      relayModeToggle.checked = getRelayMode();
      confirmSmsToggle.checked = getConfirmSmsMode();
   relayModeToggle.addEventListener('change', function(){
         storeRelayMode(this.checked);
       sendSms(this.checked ? "pwdALL#" : "pwdAUT#") 
    });
    confirmSmsToggle.addEventListener('change', function(){
        storeConfirmSmsMode(this.checked);
         sendSms(this.checked ? "pwdGON##" : "pwdGOFF##");
    });
    relayToggleButton.addEventListener('click', function () {
        sendSms("pwdCC"); //send turn on command.
    });

    addUserButton.addEventListener('click', function () {
        const serialNumber = serialNumberInput.value;
        const newNumber = newUserNumberInput.value;
           sendSms(`pwdA${serialNumber}#${newNumber}#`);
    });
   deleteUserButton.addEventListener('click', function(){
        const serialNumber = deleteSerialNumberInput.value;
           sendSms(`pwdA${serialNumber}##`);
   });
   getStatusButton.addEventListener('click', function(){
     sendSms("pwdEE");
   });
   getImeiButton.addEventListener('click', function(){
       sendSms("pwdIMEI#");
    });
    function sendSms(command) {
      const storedPassword = getPassword();
       const storedPhoneNumber = getPhoneNumber();
      if(!storedPassword || !storedPhoneNumber){
          displayMessage("Please save password and phone number in settings")
            return;
      }
      
      const smsCommand = `${storedPassword}${command}`;
         const smsUrl = `sms:${storedPhoneNumber}?body=${encodeURIComponent(smsCommand)}`;
        window.location.href = smsUrl;
    }
    function displayMessage(message) {
        messagesDiv.innerHTML = `<p>${message}</p>`;
    }
});
