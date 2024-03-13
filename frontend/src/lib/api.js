const PUBLIC_API_URL =
  "https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws";

export const getInventory = async () => {
  const response = await fetch(`${PUBLIC_API_URL}/inventory`);
  if (!response.ok) {
    throw new Error("Network response was not ok.");
  }
  return response.json();
};

export const submitOrder = async ({
  oil,
  egg,
  acid,
  mustard,
  emailAddress,
}) => {
  const buyUrl = `${PUBLIC_API_URL}/order`;
  const submitResponse = await fetch(buyUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      oil,
      egg,
      acid,
      mustard,
      email_address: emailAddress,
    }),
  });

  if (!submitResponse.ok) {
    throw new Error("Network response was not ok.");
  }

  return submitResponse.json();
};
