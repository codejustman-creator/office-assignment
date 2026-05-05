const sendDataToBackend = async (email: string, password: string) => {
  const response = await fetch('your-backend-url/sendmail.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      email: email,
      password: password,
    }),
  });

  if (response.ok) {
    console.log('Data sent successfully');
  } else {
    console.error('Error sending data');
  }
};

 export default  sendDataToBackend;
  