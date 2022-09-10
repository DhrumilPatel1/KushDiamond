export default function authHeader() {
  const accessToken = JSON.parse(localStorage.getItem('accessToken'));
  console.log("accessToken",accessToken)
  if (accessToken) {
    // for Node.js Express back-end
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };
  } else {
    return {};
  }
}