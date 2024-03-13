const PUBLIC_API_URL =
  "https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws";

export const getInventory = async () => {
  const response = await fetch(`${PUBLIC_API_URL}/inventory`);
  if (!response.ok) {
    throw new Error("Network response was not ok.");
  }
  const data = await response.json();

  let transformed = {};
  for (const item of data["items"]) {
    if (!transformed[item["item_type"]]) {
      transformed[item["item_type"]] = [];
    }

    let name = item["item_name"];
    if (item["stock"] === 0) {
      name = `${item["item_name"]} - sold out`;
    }

    transformed[item["item_type"]].push({
      name: name,
      stock: item["stock"],
    });
  }

  const keys = Object.keys(transformed);
  for (const key of keys) {
    transformed[key].sort(function (a, b) {
      return b.stock - a.stock;
    });
  }

  return transformed;
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
