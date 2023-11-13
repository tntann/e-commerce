import icons from "./icons";

const { AiFillStar, AiOutlineStar } = icons;

export const createSlug = (string) =>
  string
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("-"); // convert sang chuwx TA ko dau

export const formatMoney = (number) =>
  Number(number?.toFixed(1))?.toLocaleString();

// 4 => [1,1,1,1,0]
// 2 => [1,1,0,0,0]
export const renderStartFromNumber = (number, size) => {
  if (!Number(number)) return;
  const stars = [];
  for (let i = 0; i < +number; i++)
    stars.push(<AiFillStar color="#ffce3d" size={size || 16} />);
  for (let i = 5; i > +number; i--)
    stars.push(<AiOutlineStar color="#ffce3d" size={size || 16} />);
  return stars;
};

export function secondsToHms(d) {
  d = Number(d) / 1000;
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);
  return { h, m, s };
}

// validate form
export const validate = (payload, setInvalidFields) => {
  let invalids = 0;
  const formatPayload = Object.entries(payload);
  for (let arr of formatPayload) {
    if (arr[1].trim() === "") {
      invalids++;
      setInvalidFields((prev) => [
        ...(Array.isArray(prev) ? prev : []), // Ensure prev is an array
        { name: arr[0], mess: "Please fill out this field." },
      ]);
    }
  }
  for (let arr of formatPayload) {
    switch (arr[0]) {
      case "email":
        // eslint-disable-next-line no-useless-escape
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!arr[1].match(regex)) {
          invalids++;
          setInvalidFields((prev) => [
            ...(Array.isArray(prev) ? prev : []), // Ensure prev is an array
            { name: arr[0], mess: "Invalid email." },
          ]);
        }
        break;
      case "password":
        if (arr[1].length < 8) {
          invalids++;
          setInvalidFields((prev) => [
            ...(Array.isArray(prev) ? prev : []), // Ensure prev is an array
            { name: arr[0], mess: "Must have a minimum of 8 characters." },
          ]);
        }
        break;
      default:
        break;
    }
  }

  return invalids;
};

// format price
export const formatPrice = (number) => Math.round(number / 1000) * 1000;
